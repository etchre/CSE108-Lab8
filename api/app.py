import logging
import traceback
from flask import Flask, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError
from sqlalchemy.sql.functions import user
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity, verify_jwt_in_request
)
from flask_cors import CORS
from flask_admin import Admin, AdminIndexView
from flask_admin.contrib.sqla import ModelView
from wtforms_sqlalchemy.fields import QuerySelectField
from flask_admin.form import Select2Widget


app = Flask(__name__)

# Enable debug mode and propagate exceptions
app.config["DEBUG"] = True
app.config['PROPAGATE_EXCEPTIONS'] = True

# Flask-JWT-Extended configuration
app.config["SECRET_KEY"] = "dynamiteapple"
app.config["JWT_SECRET_KEY"] = "bananapudding"
app.config["JWT_TOKEN_LOCATION"] = ["headers", "cookies", "json", "query_string"]
app.config["JWT_COOKIE_SECURE"] = False

# SQLAlchemy configuration
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.sqlite"

# Create extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)
cors = CORS(app, origins="*")

# Error handler for debugging purposes
@app.errorhandler(Exception)
def handle_exception(e):
    logging.error("Unhandled Exception", exc_info=e)
    if app.config["DEBUG"]:
        return jsonify({
            "error": "Internal Server Error",
            "message": str(e),
            "trace": traceback.format_exc()
        }), 500
    return jsonify({"error": "Internal Server Error"}), 500

# Models

# Instead of a simple association table, we now define an Enrollment model 
# to allow storing a grade for each student's enrollment.
class Enrollment(db.Model):
    __tablename__ = 'enrollments'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    class_id = db.Column(db.Integer, db.ForeignKey('class.id'), primary_key=True)
    grade = db.Column(db.Integer, nullable=True, default=0)
    # Simple relationships with backrefs
    user = db.relationship("User", backref=db.backref("enrollments", cascade="all, delete-orphan"))
    course = db.relationship("Class", backref=db.backref("enrollments", cascade="all, delete-orphan"))

    def __init__(self, user_id: int, class_id: int, grade: int = 0):
        self.user_id = user_id
        self.class_id = class_id
        self.grade = grade

# Create the database model for the user
class User(db.Model): 
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    # here's the username object
    username = db.Column(db.String(100), unique=True, nullable=False)
    # password field
    password = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(100), nullable=False)
    # Clarified relationship with overlaps for clarity:
    # Establish a many-to-many relationship via Enrollment
    courses = db.relationship(
        'Class',
        secondary='enrollments',
        backref=db.backref('users', lazy=True, overlaps="course,enrollments"),
        overlaps="enrollments,user"
    )

    def __init__(self, username, password, role):
        self.username = username
        self.password = generate_password_hash(password)
        self.role = role

# Create the database model for the class
class Class(db.Model):
    __tablename__ = 'class'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    className = db.Column(db.String(100), unique=True, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    numStudents = db.Column(db.Integer, nullable=False, default=0)
    # Instead of storing teacher as a string, we now store a teacher ID
    # as requested. The teacher_id is a foreign key to the User model.
    teacher_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    teacher = db.relationship("User", backref="teacher_classes")
    time = db.Column(db.String(100), nullable=False)

    #our constructot
    # Note: The parameter "teacher" is now expected to be the teacher's ID.
    def __init__(self, className, capacity, teacher, time):
        self.className = className
        self.capacity = capacity
        self.numStudents = 0
        self.teacher= teacher  # Set teacher_id from the provided teacher value (should be an integer)
        self.time = time
    @property
    def teacher_username(self):
        """Return the teacher's username if assigned, else None."""
        return self.teacher.username if self.teacher else None

# Custom Admin Index View that secures the dashboard index page so only admin users can access it.
class SecureAdminIndexView(AdminIndexView):
    # This method determines if the current user is allowed to access the admin dashboard
    def is_accessible(self):
        try:
            # First, verify the JWT from the request (checks headers, cookies, etc.)
            verify_jwt_in_request()
            # Retrieve the user ID from the JWT token
            user_id = get_jwt_identity()
            # Query the database for the user using that ID (assumes User is defined in your models)
            user = User.query.get(user_id)
            # Allow access only if a user exists and has the 'admin' role
            return user is not None and user.role == "admin"
        except:
            # If verification fails or any exception occurs, do not allow access
            return False

    # This method is triggered if the user is not allowed access
    def inaccessible_callback(self, name, **kwargs):
        # Return a JSON error message with a 403 Forbidden status code
        return jsonify({'error': 'denied!'}), 403
    
    #create class model view because we want to query from id
    #so i had to make a teacher id, using a foreign key for user id
    #thus deleting the teacher from the original admin
    #so recreate the custom view
class ClassModelView(ModelView):
    column_list = (
        'className', 
        'teacher_username', 
        'capacity', 
        'numStudents', 
        'time'
    )
    form_excluded_columns = ['numStudents']  
    # We no longer exclude teacher_id,
    # but we rely on the relationship `teacher`.

    # create a teacher column, to replace the deleted one
    form_columns = ['className', 'teacher', 'capacity', 'time']
    #adjust column names, don't like the way they look
    
    column_labels = {
        'className': 'Class',
        'teacher_username': 'Teacher',
        'capacity': 'Capacity',
        'numStudents': 'Num Students',
        'time': 'Time'
    }

    
    #add an extra field, this will allow us to see drop dow menu of users with a teacher role
    form_extra_fields = {'teacher': QuerySelectField( 'Teacher',  query_factory=lambda: User.query.filter_by(role='teacher').all(),   get_label='username',  widget=Select2Widget())}
#create a user view to hash the passswords for user
class UserModelView(ModelView):
    def on_model_change(self, form, model, is_created):
        # If the password field in the form is provided, hash the new value.
        if form.password.data:
            model.password = generate_password_hash(form.password.data)
        return super().on_model_change(form, model, is_created)

# Custom Enrollment admin view to show relationships and grade
class EnrollmentAdminView(ModelView):
    column_list = ('user', 'course', 'grade')
    form_columns = ('user', 'course', 'grade')
    #add an extra vield, this will allow us to see drop dow menu of users with a student role
    #and available classes
    form_extra_fields = {'user': QuerySelectField('Student',query_factory=lambda: User.query.filter_by(role='student'), get_label='username',widget=Select2Widget()  ), 'course': QuerySelectField('Class',   query_factory=lambda: Class.query.all(),  get_label='className',widget=Select2Widget())}
    #format the column to show us the exact user and exact class
    column_formatters = {'user': lambda view, context, model, name: model.user.username if model.user else '','course': lambda view, context, model, name: model.course.className if model.course else ''
    }
#create the admin page
admin = Admin(app, name='MyApp Admin', template_mode='bootstrap3',index_view=SecureAdminIndexView())
#add the custom views to the admin page
admin.add_view(UserModelView(User, db.session))
admin.add_view(ClassModelView(Class, db.session))
admin.add_view(EnrollmentAdminView(Enrollment, db.session))

with app.app_context():
    db.create_all()

# Routes

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
        return jsonify({"Token": Token, "role": user.role}), 200
    else:
       return jsonify({'error': 'user not found'}), 404
       
#create a function so the student can create their account
@app.route('/student/createaccount', methods=['POST'])
def create_student_account():
    # Get the JSON data from the request
    data = request.get_json()
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'error': 'username and password are required'}), 400
    # Create a new student user
    new_user = User(username=data['username'], password=data['password'], role="student")
    try:
        db.session.add(new_user)
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'error': 'That student name already exists', 'detail': str(e)}), 400
    return jsonify({'id': new_user.id, 'username': new_user.username, 'role': new_user.role}), 201

@app.route('/student/classes', methods=['GET'])
@jwt_required()
def get_student_classes():
    # Get the current user's identity from the JWT
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'Student not found'}), 404
    # Build a list of classes the student is enrolled in
    classes_list = [{
        "id": c.id,
        "className": c.className,
        "capacity": c.capacity,
        "numStudents": c.numStudents,
        "teacher_id": c.teacher_id,  # Updated to show teacher_id instead of teacher username
        "teacher": User.query.get(c.teacher_id).username,
        "time": c.time
    } for c in user.courses]
    return jsonify({"id": user.id, "username": user.username, "classes": classes_list}), 200

@app.route('/student/enroll', methods=['POST'])
@jwt_required()
def enroll_in_class():
    # Get the JSON data from the request
    data = request.get_json()
    if not data or 'classId' not in data:
        return jsonify({'error': 'classId is required'}), 400
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    course = Class.query.get(data['classId'])

    #pretend that the student is enrolled
    course.numStudents += 1

    #we will decrement the counter if there is an issue
    # Check if the class is full
    if course.numStudents >= course.capacity:
        course.numStudents -= 1
        db.session.commit()
        return jsonify({'error': 'Class is full'}), 400
    # Validate that both user and class exist
    if not user or not course:
        course.numStudents -= 1
        db.session.commit()
        return jsonify({'error': 'User or class not found'}), 404
    # Check if the student is already enrolled
    if course in user.courses:
        course.numStudents -= 1
        db.session.commit()
        return jsonify({'error': 'Student is in the class already'}), 400

    # Enroll the student in the class
    user.courses.append(course)
    # Create an Enrollment record if one doesn't exist
    enrollment = Enrollment.query.filter_by(user_id=user.id, class_id=course.id).first()
    if not enrollment:
        enrollment = Enrollment(user_id=user.id, class_id=course.id, grade=0)
        db.session.add(enrollment)

    # match the number of enrolled students to the amount of actual enrollments
    course.numStudents = len(course.enrollments)
    db.session.commit()
    return jsonify({'message': 'you have enrolled in the class'}), 200

@app.route('/student/unenroll', methods=['POST'])
@jwt_required()
def unenroll_class():
    # Get the JSON data from the request
    data = request.get_json()
    if not data or 'classId' not in data:
        return jsonify({'error': 'classId is required'}), 400
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    course = Class.query.get(data['classId'])
    # Validate that both user and class exist
    if not user or not course:
        return jsonify({'error': 'User or class not found'}), 404
    # Check if the student is actually enrolled in the class
    if course not in user.courses:
        return jsonify({'error': 'Student is not enrolled in the class'}), 400
    # Remove the Enrollment record if it exists
    enrollment = Enrollment.query.filter_by(user_id=user.id, class_id=course.id).first()
    if enrollment:
        db.session.delete(enrollment)
    # Remove the class from the student's list and decrement enrollment count
    user.courses.remove(course)
    course.numStudents = len(course.enrollments)
    db.session.commit()
    return jsonify({'message': 'you have unenrolled from the class'}), 200

@app.route('/classes', methods=['GET'])
def get_all_classes():
    all_courses = Class.query.all()
    courses = [{
        "id": c.id,
        "className": c.className,
        "capacity": c.capacity,
        "numStudents": c.numStudents,
        "teacher_id": c.teacher_id,  # updated to show teacher_id
        "teacher": User.query.get(c.teacher_id).username,
        "time": c.time
    } for c in all_courses]
    return jsonify({'classes': courses})

@app.route('/teacher/createaccount', methods=['POST'])
def create_teacher_account():
    # Get the JSON data from the request
    data = request.get_json()
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'error': 'username and password are required'}), 400
    # Create a new teacher account
    new_user = User(username=data['username'], password=data['password'], role="teacher")
    try:
        db.session.add(new_user)
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'error': 'That teacher name already exists', 'detail': str(e)}), 400
    return jsonify({'id': new_user.id, 'username': new_user.username, 'role': new_user.role}), 201

#get all classes associated with the teacher
@app.route('/teacher/classes', methods=['GET'])
@jwt_required()
def get_teacher_classes():
    # Get the current teacher from the JWT
    user_id = get_jwt_identity()
    teacher = User.query.get(user_id)
    if not teacher or teacher.role != "teacher":
        return jsonify({'error': 'Teacher not found'}), 404
    # Get classes taught by the teacher (filter by teacher_id now)
    classes_list = [{
        "id": c.id,
        "className": c.className,
        "teacher_id": c.teacher_id,  # updated to show teacher_id instead of teacher username
        "teacher": User.query.get(c.teacher_id).username,
        "capacity": c.capacity,
        "time": c.time,
        "numStudents": c.numStudents
    } for c in Class.query.filter_by(teacher_id=teacher.id).all()]
    return jsonify({"id": teacher.id, "username": teacher.username, "classes": classes_list}), 200

@app.route('/teacher/class/<class_id>/students', methods=['GET'])
@jwt_required()
def get_teacher_class_info(class_id):
    # Get the teacher from the JWT
    user_id = get_jwt_identity()
    teacher = User.query.get(user_id)
    if not teacher or teacher.role != "teacher":
        return jsonify({'error': 'Teacher not found'}), 404
    course = Class.query.get(class_id)
    if not course:
        return jsonify({'error': 'Class not found'}), 404
    # Ensure that the teacher is assigned to this class by checking teacher_id
    if course.teacher_id != teacher.id:
        return jsonify({'error': 'Unauthorized'}), 403
    # Build the list of enrolled students with their grades
    teacher_class_info = []
    for enrollment in course.enrollments:
        print(enrollment)
        student = User.query.get(enrollment.user_id)
        if not student:
            continue
        teacher_class_info.append({
            "student_id": student.id,
            "username": student.username,
            "grade": enrollment.grade
        })
    return jsonify({"class_id": course.id, "className": course.className, "students": teacher_class_info}), 200

@app.route('/teacher/grade', methods=['PUT'])
@jwt_required()
def change_student_grade():
    # Get the teacher from the JWT
    user_id = get_jwt_identity()
    teacher = User.query.get(user_id)
    if not teacher or teacher.role != "teacher":
        return jsonify({'error': 'Teacher not found'}), 404
    data = request.get_json()
    # Require classId, studentId, and grade (changed from 'student' to 'studentId')
    if not data or 'classId' not in data or 'studentId' not in data or 'grade' not in data:
        return jsonify({'error': 'classId, studentId, and grade are required'}), 400
    course = Class.query.get(data['classId'])
    if not course:
        return jsonify({'error': 'Class not found'}), 404
    # Ensure the teacher is assigned to the class by checking teacher_id
    if course.teacher_id != teacher.id:
        return jsonify({'error': 'Unauthorized'}), 403
    # Query the student by their ID now
    student = User.query.get(data['studentId'])
    if not student or student.role != "student":
        return jsonify({'error': 'Student not found'}), 404
    enrollment = Enrollment.query.filter_by(user_id=student.id, class_id=course.id).first()
    if not enrollment:
        return jsonify({'error': 'Enrollment not found'}), 404
    enrollment.grade = data['grade']
    db.session.commit()
    return jsonify({
        'student_id': student.id,
        'username': student.username,
        'class_id': course.id,
        'grade': enrollment.grade
    }), 200

@app.route('/admin/createaccount', methods=['POST'])
def create_admin_account():
    # Get the JSON data from the request
    data = request.get_json()
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'error': 'username and password are required'}), 400
    new_user = User(username=data['username'], password=data['password'], role="admin")
    try:
        db.session.add(new_user)
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'error': 'That admin name already exists', 'detail': str(e)}), 400
    return jsonify({'id': new_user.id, 'username': new_user.username, 'role': new_user.role}), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
