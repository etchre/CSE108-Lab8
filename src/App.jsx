import {useEffect, useState} from 'react'
import {Routes, Route} from "react-router";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [response, setResponse] = useState({});
  const [token, setToken] = useState('');
  const [courses, setCourses] = useState({});

  useEffect(() => {
    //console.log(response)

    if(response['Token'] !== undefined) {
      setToken(response['Token'])
      setLoggedIn(true)
    }
    if(response['classes'] !== undefined) {
      setCourses(response['classes'])
    }
  }, [response]);

  useEffect(() => {
    if(!loggedIn) {
      setToken('')
    }
  }, [loggedIn])

  useEffect(() => {
    console.log(token)
  }, [token])

  return (
    <div>
      <Routes>
        <Route index element={
          <Login
            loggedIn={loggedIn}
            setResponse={setResponse}
          />
        } />
        <Route path="/dashboard" element={
          <Dashboard
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            setResponse={setResponse}
            token={token}
            courses={courses}
          />
        }/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
