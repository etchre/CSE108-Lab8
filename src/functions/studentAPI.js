import generalAPI from "./generalAPI.js";

const studentURI = 'http://127.0.0.1:5000/student'

function createAccount({username, password, setResponse}) {
  const promise = fetch(studentURI+'/createaccount',
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
  const promise = fetch(studentURI+'/classes',
    {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    }
  )

  generalAPI.promiseCallback({promise, setResponse})
}

function enroll({token, classId, setResponse}) {
  const promise = fetch(studentURI+'/enroll',
    {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          classId: classId,
        }
      )
    }
  )

  generalAPI.promiseCallback({promise, setResponse})
}

function unenroll({token, classId, setResponse}) {
  const promise = fetch(studentURI+'/unenroll',
    {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          classId: classId,
        }
      )
    }
  )

  generalAPI.promiseCallback({promise, setResponse})
}

export default {createAccount, getClasses, enroll, unenroll};
