const generalURI = 'http://127.0.0.1:5000/'

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

function seeAllCourses({setResponse}) {
  const promise = fetch(generalURI+'/classes',
    {
      method: 'GET',
    }
  )

  promiseCallback({promise, setResponse})
}

export default {seeAllCourses, promiseCallback}