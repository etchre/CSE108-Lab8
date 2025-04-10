import {useEffect, useState} from 'react'
import {Routes, Route} from "react-router";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";
import Debug from "./pages/Debug.jsx";
import Admin from "./pages/admin.jsx"; // or AdminFrame

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [response, setResponse] = useState({});
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  //user state
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    //console.log(response)

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
    if(response['error'] !== undefined) {
      console.log(response['error'])
      setError(error)
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
        <Route path="/debug" element={<Debug />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/admin" element={<Admin/>} />
      </Routes>
    </div>
  )
}

export default App
