const studentURI = 'http://127.0.0.1:5000/student'

function promiseCallback({promise, setResponse}) {
  promise.then(response => {
    if (!response.ok) {
      console.log("Response status: " + response.status + " " + response.statusText);
    }
    return response.json();
  }).then(data => {
    setResponse(data)
  }).catch(err => {
    console.log(err);
  })
}

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

  promiseCallback({promise, setResponse})
}

function login({username, password, setResponse}) {
  const promise = fetch(studentURI+'/login',
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

  promiseCallback({promise, setResponse})
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

  promiseCallback({promise, setResponse})
}

function enroll({token, classId}) {
  const promise = fetch(studentURI+'/enroll',
    {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(
        {
          classId: classId,
        }
      )
    }
  )

  promiseCallback(promise)
}

function unenroll({token, classId}) {
  const promise = fetch(studentURI+'/unenroll',
    {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(
        {
          classId: classId,
        }
      )
    }
  )

  promiseCallback(promise)
}

export default {createAccount, login, getClasses, enroll, unenroll};
