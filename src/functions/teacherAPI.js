import generalAPI from "./generalAPI.js";

const teacherURI = 'http://127.0.0.1:5000/teacher'

function createAccount({username, password, setResponse}) {
  const promise = fetch(teacherURI+'/createaccount',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          username: username,
          password: password
        }
      )
    }
  )

  generalAPI.promiseCallback({promise, setResponse})
}

function getClasses({token, setResponse}) {
  const promise = fetch(teacherURI+'/classes',
    {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    }
  )

  generalAPI.promiseCallback({promise, setResponse})
}

function getClassInfo({token, classId, setResponse}) {
  const promise = fetch(teacherURI+'/class/'+classId+'/students',
    {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    }
  )

  generalAPI.promiseCallback({promise, setResponse})
}

function changeGrade({token, classId, student, grade, setResponse}) {
  const promise = fetch(teacherURI+'/grade',
    {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          classId: classId,
          student: student,
          grade: grade,
        }
      )
    }
  )

  generalAPI.promiseCallback({promise, setResponse})
}

export default {createAccount, getClasses, getClassInfo, changeGrade};