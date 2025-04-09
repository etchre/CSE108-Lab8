#import jsonify and json request
from flask import Flask, jsonify, request
#import templates so we can use the flask with html,css, and javascript
from flask.templating import render_template
#we're gonna use sql for database
from flask_sqlalchemy import SQLAlchemy
#this is for debugging sql
from sqlalchemy.exc import IntegrityError
#this is for hashing and storing passwords
from werkzeug.security import generate_password_hash, check_password_hash
#import toke and time
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS

app = Flask(__name__)

#change the app to work with jwt and create our totally
#tubular secret key
app.config["JWT_SECRET_KEY"] = "bananapudding"
# Here you can globally configure all the ways you want to allow JWTs to
# be sent to your web application. By default, this will be only headers.
app.config["JWT_TOKEN_LOCATION"] = ["headers", "cookies", "json", "query_string"]
# If true this will only allow the cookies that contain your JWTs to be sent
# over https. In production, this should always be set to True
app.config["JWT_COOKIE_SECURE"] = False
#configure the app to work as a database
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.sqlite"

#create the database
db = SQLAlchemy(app)
jwt = JWTManager(app)
cors = CORS(app, origins="*")

# Instead of a simple association table, we now define an Enrollment model 
# to allow storing a grade for each student's enrollment.
class Enrollment(db.Model):
    __tablename__ = 'enrollments'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    class_id = db.Column(db.Integer, db.ForeignKey('class.id'), primary_key=True)
    grade = db.Column(db.Integer, nullable=True, default=0)
    user = db.relationship("User", backref=db.backref("enrollment_assocs", cascade="all, delete-orphan"))
    class_ = db.relationship("Class", backref=db.backref("enrollment_assocs", cascade="all, delete-orphan"))

    def __init__(self, user_id: int, class_id: int, grade: int = 0):
       self.user_id = user_id
       self.class_id = class_id
       self.grade = grade

#create the database model
#create for the user
class User(db.Model): 
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    #here's the username object
    username = db.Column(db.String(100), unique=True, nullable=False)
    #[] 
    password = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(100), nullable=False)
    # Establish a many-to-many relationship via Enrollment
    classes = db.relationship( 'Class',secondary='enrollments',backref=db.backref('users', lazy=True, overlaps="class_,enrollment_assocs,user"),overlaps="class_,enrollment_assocs,user"
    )
    #our constructot
    def __init__(self, username, password, role):
         self.username = username
         self.password = generate_password_hash(password)
         self.role  = role

#create for the class
class Class(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    numStudents = db.Column(db.Integer, nullable=False, default=0)
    Grade = db.Column(db.Integer, nullable=False)
    teacher = db.Column(db.String(100), nullable=False)
    Time = db.Column(db.String(100), nullable=False)
#our constructot
    def __init__(self, name, capacity, teacher, Time, Grade = 0):
         self.name = name
         self.capacity = capacity
         self.numStudents = 0
         self.Grade = Grade
         self.teacher = teacher
         self.Time = Time

#I need a many to many relationship professor sa

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return ""

@app.route('/login', methods=['POST'])
def Login():
    #get the JSON data
    data = request.get_json()
    #if there is no data or no input  retturn 400 error
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'error': 'username and password are required'}), 400

    #get the user by username
    user = User.query.filter_by(username=data['username']).first()
    #check if the username and password is correct , if it is login
    if user and check_password_hash(user.password, data['password']):
        Token = create_access_token(identity=str(user.id))
        return jsonify({"Token": Token,"role":user.role}), 200
    else:
       return jsonify({'error': 'user not found'}), 404
#create a function so the student can create their account
@app.route('/student/createaccount', methods=['POST'])
def CreateStudentAccount():
    #set our data to our
    data = request.get_json()
     #If the user does not enter a username or password to create an account
    if not data or 'username' not in data or 'password' not in data:
            return jsonify({'error': 'username and password are required'}), 400

    new_user = User(username=data['username'], password=data['password'], role="student")

    try:
       db.session.add(new_user)
       db.session.commit()
    except IntegrityError:
       db.session.rollback()
       return jsonify({'error': 'That student name already exists'}), 400
    return jsonify({
                  'id': new_user.id,
                  'username': new_user.username,
                  'role': new_user.role
              }), 201

@app.route('/student/classes', methods=['GET'])
@jwt_required()
def getStudentClasses():
    userID = get_jwt_identity()
    user = User.query.get(userID)
    #throw an error if user not found
    if not user:
        return jsonify({'error': 'Student not found'}), 404

    #look for the student
    classesList = [{"id": c.id, "name": c.name, "capacity": c.capacity, "numStudents": c.numStudents, "teacher": c.teacher, "Time": c.Time} for c in user.classes]
    return jsonify({"id": user.id, "username": user.username, "classes": classesList}), 200

@app.route('/student/enroll', methods=['POST'])
@jwt_required()
def enrollInClass():
    data = request.get_json()
    #throw an error if class id is not provided (username not required because of token)
    if not data or 'classId' not in data:
        return jsonify({'error': 'classId is required'}), 400

    userID = get_jwt_identity()
    user = User.query.get(userID)
    classStatus = Class.query.get(data['classId'])

    #if the class or user doesn't exist throw an error
    if not user or not classStatus:
        return jsonify({'error': 'User or class not found'}), 404

    #throw an error if the student is in the class already
    if classStatus in user.classes:
        return jsonify({'error': 'Student is in the class already'}), 400

    #throw an errror if the class is full
    if classStatus.numStudents >= classStatus.capacity:
        return jsonify({'error': 'Class is full'}), 400

    #if not, enroll the student in the class
    user.classes.append(classStatus)
    #create an Enrollment record with no grade initially
    enrollment = Enrollment.query.filter_by(user_id=user.id, class_id=classStatus.id).first()
    if not enrollment:
        enrollment = Enrollment(user_id=user.id, class_id=classStatus.id, grade=0)
        db.session.add(enrollment)
    #and increment the enrollment count
    classStatus.numStudents += 1
    #commit to database
    db.session.commit()

    return jsonify({'message': 'you have enrolled in the class'}), 200

@app.route('/student/unenroll', methods=['POST'])
@jwt_required()
def unenrollClass():
    data = request.get_json()
    #throw an error if class id is not provided (username not required due to token)
    if not data or 'classId' not in data:
        return jsonify({'error': 'classId is required'}), 400

    userID = get_jwt_identity()
    user = User.query.get(userID)
    classStatus = Class.query.get(data['classId'])

    #throw an error if the student or class doesn't exist
    if not user or not classStatus:
        return jsonify({'error': 'User or class not found'}), 404

    #see if the student is in the class
    if classStatus not in user.classes:
        return jsonify({'error': 'Student is not enrolled in the class'}), 400

    #remove the enrollment record
    enrollment = Enrollment.query.filter_by(user_id=user.id, class_id=classStatus.id).first()
    if enrollment:
        db.session.delete(enrollment)
    #uneroll the student by removing it from the student's list and decrement the enrollment count
    user.classes.remove(classStatus)
    if classStatus.numStudents > 0:
        classStatus.numStudents -= 1
    db.session.commit()

    return jsonify({'message': 'you have unenrolled from the class'}), 200

#get all the classes

@app.route('/classes', methods=['GET'])
def seaAllClasses():
    allClasses = Class.query.all()
    classes = [{"id": c.id, "name": c.name, "capacity": c.capacity, "numStudents": c.numStudents, "teacher": c.teacher, "Time": c.Time} for c in allClasses]
    return jsonify({'classes': classes})

#This is where the teacher part of the api is/will go
#create a function so the teacher can create their account
@app.route('/teacher/createaccount', methods=['POST'])
def CreateTeacherAccount():
    #set our data to our
    data = request.get_json()
     #If the user does not enter a username or password to create an account
    if not data or 'username' not in data or 'password' not in data:
            return jsonify({'error': 'username and password are required'}), 400

    new_user = User(username=data['username'], password=data['password'], role="teacher")

    try:
       db.session.add(new_user)
       db.session.commit()
    except IntegrityError:
       db.session.rollback()
       return jsonify({'error': 'That teacher name already exists'}), 400
    return jsonify({
                  'id': new_user.id,
                  'username': new_user.username,
                  'role': new_user.role
              }), 201



#get all classes associated with the teacher
@app.route('/teacher/classes', methods=['GET'])
@jwt_required()
def getTeacherClasses():
    userID = get_jwt_identity()
    teacher = User.query.get(userID)
    #throw an error if user not found
    if not teacher or teacher.role != "teacher":
        return jsonify({'error': 'Teacher not found'}), 404

    #get classes where the teacher field matches the teacher's username
    classesList = [{"id": c.id, "name": c.name, "capacity": c.capacity, "numStudents": c.numStudents, "teacher": c.teacher, "Time": c.Time} for c in Class.query.filter_by(teacher=teacher.username).all()]
    return jsonify({"id": teacher.id, "username": teacher.username, "classes": classesList}), 200

#get all students and grades for a particular class
@app.route('/teacher/class/<class_id>/students', methods=['GET'])
@jwt_required()
def getTeacherClassInfo(class_id):
    userID = get_jwt_identity()
    teacher = User.query.get(userID)
    #throw an error if user not found
    if not teacher or teacher.role != "teacher":
        return jsonify({'error': 'Teacher not found'}), 404

    specificClass = Class.query.get(class_id)
    if not specificClass:
        return jsonify({'error': 'Class not found'}), 404

    # Ensure that the teacher is assigned to this class
    if specificClass.teacher != teacher.username:
        return jsonify({'error': 'Unauthorized'}), 403

    # Get enrolled students with their grades from the Enrollment model
    teacherClassInfo = []
    for enrollment in specificClass.enrollment_assocs:
            student = User.query.get(enrollment.user_id)
            if not student:
                continue

            teacherClassInfo.append({
                "student_id": student.id,
                "username": student.username,
                "grade": enrollment.grade
            })
    return jsonify({"class_id": specificClass.id, "class_name": specificClass.name, "students": teacherClassInfo}), 200

#now create a function that changes a student's grade
@app.route('/teacher/grade', methods=['PUT'])
@jwt_required()
def changeStudentGrade():
    userID = get_jwt_identity()
    teacher = User.query.get(userID)
    #throw an error if user not found
    if not teacher or teacher.role != "teacher":
        return jsonify({'error': 'Teacher not found'}), 404
    data = request.get_json()
    #if no grade entered return error; require classId, student (username), and grade
    if not data or 'classId' not in data or 'student' not in data or 'grade' not in data:
        return jsonify({'error': 'classId, student, and grade are required'}), 400

    class_obj = Class.query.get(data['classId'])
    if not class_obj:
        return jsonify({'error': 'Class not found'}), 404
    # ensure the teacher is assigned to the class
    if class_obj.teacher != teacher.username:
        return jsonify({'error': 'Unauthorized'}), 403

    student = User.query.filter_by(username=data['student'], role="student").first()
    if not student:
        return jsonify({'error': 'Student not found'}), 404

    enrollment = Enrollment.query.filter_by(user_id=student.id, class_id=class_obj.id).first()
    if not enrollment:
        return jsonify({'error': 'Enrollment not found'}), 404

    enrollment.grade = data['grade']
    db.session.commit()
    return jsonify({
          'student_id': student.id,
          'username': student.username,
          'class_id': class_obj.id,
          'grade': enrollment.grade
      }), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
