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

app = Flask(__name__, template_folder='template')
#configure the app to work as a database
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.sqlite"
#create the database
db = SQLAlchemy(app)
#change the app to work with jwt and create our totally
#tubular secret key
app.config["JWT_SECRET_KEY"] = "bananapudding" 
jwt = JWTManager(app)

enrollments = db.Table('enrollments',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('class_id', db.Integer, db.ForeignKey('class.id'), primary_key=True)
)

#create the database model
#create for the user
class User(db.Model): 
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    #here's the username object
    username = db.Column(db.String(100), unique=True, nullable=False)
    #[]
    password = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(100), nullable=False)
    classes = db.relationship('Class', secondary=enrollments, backref=db.backref('users', lazy=True))
    #our constructot
    def __init__(self, username, password, role):
         self.username = username
         self.password = generate_password_hash(password, method='sha256')
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
    return 'Hello from Flask!'

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

#
@app.route('/students/login', methods=['POST'])
def LoginStudent():
    #get the input if no input is requitrd throw and error
    data = request.get_json()
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'error': 'username and password are required'}), 400

    #get the user by username
    user = User.query.filter_by(username=data['username'], role="student").first()
    #check if the username and password is correct , if it is login
    if user and check_password_hash(user.password, data['password']):
        Token = create_access_token(identity=user.id)
        return jsonify({"Token": Token}), 200
        #if not thrown an error
    else:
    #else give error
       return jsonify({'error': 'Student not found'}), 404

@app.route('/students/classes', methods=['GET'])
@jwt_required()
def getStudentClasses():
    userID = get_jwt_identity()
    user = User.query.get(userID)
    #throw an error if user not found
    if not user:
        return jsonify({'error': 'Student not found'}), 404

    #look for the student
    if user:
        classesList = [{"id": c.id, "name": c.name, "capacity": c.capacity, "numStudents": c.numStudents, "teacher": c.teacher, "Time": c.Time} for c in user.classes]
        return jsonify({"id": user.id, "username": user.username, "classes": classesList}), 200
    else:
            #else give error
            return jsonify({'error': 'Student not found'}), 404

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

    #if not enroll the student in the class
    user.classes.append(classStatus)
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

    #uneroll the student by remving it from the student's list and decrement the enrollment count
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

    return jsonify(classes)

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000)
