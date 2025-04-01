const studentURI = 'http://127.0.0.1:5000/student'
const generalURI = 'http://127.0.0.1:5000/'

function createAccount({username, password}) {
  fetch(studentURI+'/createaccount',
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
  ).then(response => {
    if (!response.ok) {
      throw new Error("Response status: " + response.status + " " + response.statusText);
    }
    return response.json();
  }).then(data => {
    console.log(data);
  }).catch(err => {
    console.log(err);
  })
}

function login({username, password}) {
  fetch(studentURI+'/login',
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
  ).then(response => {
    if (!response.ok) {
      throw new Error("Response status: " + response.status + " " + response.statusText);
    }
    return response.json();
  }).then(data => {
    console.log(data);
  }).catch(err => {
    console.log(err);
  })
}

function getClasses({token}) {
  fetch(studentURI+'/classes',
    {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    }
  ).then(response => {
    if (!response.ok) {
      throw new Error("Response status: " + response.status + " " + response.statusText);
    }
    return response.json();
  }).then(data => {
    console.log(data);
  }).catch(err => {
    console.log(err);
  })
}

function enroll({token, classId}) {
  fetch(studentURI+'/enroll',
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
  ).then(response => {
    if (!response.ok) {
      throw new Error("Response status: " + response.status + " " + response.statusText);
    }
    return response.json();
  }).then(data => {
    console.log(data);
  }).catch(err => {
    console.log(err);
  })
}

function unenroll({token, classId}) {
  fetch(studentURI+'/unenroll',
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
  ).then(response => {
    if (!response.ok) {
      throw new Error("Response status: " + response.status + " " + response.statusText);
    }
    return response.json();
  }).then(data => {
    console.log(data);
  }).catch(err => {
    console.log(err);
  })
}

export default {createAccount, login, getClasses, enroll, unenroll};
