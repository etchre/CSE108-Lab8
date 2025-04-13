import {useEffect, useState} from 'react'
import {Routes, Route} from "react-router";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";
import Debug from "./pages/Debug.jsx";
import Admin from "./pages/admin.jsx";
import student from "./pages/dashboard/Student.jsx";
import studentAPI from "./functions/studentAPI.js"; // or AdminFrame

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [response, setResponse] = useState({});
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  //user state
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  //exclusive state for teachers
  const [classInfo, setClassInfo] = useState([]);

  //handle side effects whenever a response from the api is received
  useEffect(() => {
    if(response['Token'] !== undefined) {
      setToken(response['Token'])
      if(response['role'] !== undefined) {
        setRole(response['role'])
      }
    }
    if(response['classes'] !== undefined) {
      if(response['id'] !== undefined) {
        setCourses(response['classes'])
      } else {
        setAllCourses(response['classes'])
      }
    }
    if(response['username'] !== undefined) {
      setUser(response['username'])
    }
    if(response['error'] !== undefined) {
      console.log(response['error'])
      setError(error)
    }
    if(response['message'] !== undefined) {
      if(response['message'] === 'you have enrolled in the class' ) {
        studentAPI.getClasses({ token, setResponse });
      }
      if(response['message'] === 'you have unenrolled from the class') {
        studentAPI.getClasses({ token, setResponse });
      }
    }
    if(response['students'] !== undefined) {
      console.log(response['students'])
    }
  }, [response]);

  //once role and token have been loaded, change the view to the dashboard
  useEffect(() => {
    if(role !== null && token !== null) {
      setLoggedIn(true)
    }
  }, [role, token])

  //clear state when not logged in
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
        <Route path="/dashboard/*" element={
          <Dashboard
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            setResponse={setResponse}
            token={token}
            courses={courses}
            allCourses={allCourses}
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
