import {useEffect, useState} from 'react'
import {Routes, Route} from "react-router";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [response, setResponse] = useState({});
  const [token, setToken] = useState(null);

  //user state
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    console.log(response)

    if(response['Token'] !== undefined) {
      setToken(response['Token'])
      setRole(response['role'])
    }
    if(response['classes'] !== undefined) {
      setCourses(response['classes'])
    }
    if(response['username'] !== undefined) {
      setUser(response['username'])
    }
  }, [response]);

  useEffect(() => {
    if(role !== null && token !== null) {
      setLoggedIn(true)
    }
  }, [role, token])

  useEffect(() => {
    if(!loggedIn) {
      setToken(null)
      setUser(null)
      setCourses([])
      setRole(null)
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
            role={role}
          />
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
