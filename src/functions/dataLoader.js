import studentAPI from "./studentAPI.js";
import generalAPI from "./generalAPI.js";
import teacherAPI from "./teacherAPI.js";
import * as fs from 'fs';
import * as child_process from "child_process";

const users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const printResponse = (data) => {
  console.log(data)
}

const handleLogin = (data) => {
  let token = data['Token']

  let ids = []

  for(let i = 0; i < getRandomInt(3)+2; i++) {
    let rand = getRandomInt(10)+1

    while(ids.includes(rand)){
      rand = getRandomInt(10)+1
    }

    ids.push(rand)
  }

  ids.forEach(id => {
    studentAPI.enroll({
      token,
      classId: id,
      setResponse: printResponse
    })})
}

let token;

const handleClassInfo = (data) => {
  let classId = data.class_id
  let students = data.students

  students.forEach((student_item) => {
    teacherAPI.changeGrade({
      token,
      classId,
      student: student_item['student_id'],
      grade: getRandomInt(61)+40,
      setResponse: printResponse
    })
  })
}

const handleClasses = (data) => {
  let classes = data['classes']

  // classes.forEach((class_item) => {
  //   teacherAPI.getClassInfo({
  //     token,
  //     classId: class_item['id'],
  //     setResponse: handleClassInfo
  //   })
  // })
  teacherAPI.getClassInfo({
    token,
    classId: 4,
    setResponse: handleClassInfo
  })
}

const handleTeacherLogin = (data) => {
  token = data['Token']

  teacherAPI.getClasses({
    token,
    setResponse: handleClasses
  })
}

//create an account for each user in the user json
// users.forEach(user => {
//   console.log(user)
//   studentAPI.createAccount({
//     username: user.name,
//     password: user.password,
//     setResponse: printResponse
//   })
// })

for(let i= 200; i < 300; i++) {
  generalAPI.login({
    username: users[i].name,
    password: users[i].password,
    setResponse: handleLogin
  })
}

// generalAPI.login({
//   username: 'Rosemarie Bongers',
//   password:'bo12',
//   setResponse: handleTeacherLogin
// })







