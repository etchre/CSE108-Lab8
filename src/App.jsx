import {useEffect, useState} from 'react'
import {Routes, Route} from "react-router";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [response, setResponse] = useState({});
  const [token, setToken] = useState('');

  //user state
  const [courses, setCourses] = useState({});
  const [user, setUser] = useState('');

  useEffect(() => {
    console.log(response)

    if(response['Token'] !== undefined) {
      setToken(response['Token'])
      setLoggedIn(true)
    }
    if(response['classes'] !== undefined) {
      setCourses(response['classes'])
    }
    if(response['username'] !== undefined) {
      setUser(response['username'])
    }
  }, [response]);

  useEffect(() => {
    if(!loggedIn) {
      setToken('')
      setUser('')
      setCourses({})
    }
  }, [loggedIn])

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
            user={user}
          />
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
