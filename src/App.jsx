import {useEffect, useState} from 'react'
import {Routes, Route} from "react-router";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";
import Debug from "./pages/Debug.jsx";
import Admin from "./pages/admin.jsx";
import studentAPI from "./functions/studentAPI.js";
import generalAPI from "./functions/generalAPI.js"; // or AdminFrame

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [response, setResponse] = useState({});
  const [token, setToken] = useState(null);
  const [error, setError] = useState('No error');
  const [showError, setShowError] = useState(false);

  //user state
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  //exclusive state for teachers
  const [classInfo, setClassInfo] = useState([]);
  const [currentCourse, setCurrentCourse] = useState('err-null');
  const [gradeRefresh, setGradeRefresh] = useState(false);

  const fiveSeconds = 5000;

  useEffect(() => {
    if(showError) {
      const interval = setInterval(() => {
        setShowError(false);
        clearInterval(interval);
      }, fiveSeconds);
    }
  }, [showError])

  useEffect(() => {
    if(error !== 'No error') {
      setShowError(true)
    }
  }, [error])

  //handle side effects whenever a response from the api is received
  useEffect(() => {
    //console.log(response)
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
      setError(response['error'])
    }
    if(response['message'] !== undefined) {
      if(response['message'] === 'you have enrolled in the class' ) {
        studentAPI.getClasses({ token, setResponse });
        generalAPI.seeAllCourses({ setResponse })
      }
      if(response['message'] === 'you have unenrolled from the class') {
        studentAPI.getClasses({ token, setResponse });
        generalAPI.seeAllCourses({ setResponse })
      }
      if(response['message'] === 'grade changed' ) {
        setGradeRefresh(true);
      }
    }
    if(response['students'] !== undefined) {
      setClassInfo(response['students'])
    }
    if(response['className'] !== undefined) {
      setCurrentCourse(response['className'])
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
            classInfo={classInfo}
            currentCourse={currentCourse}
            user={user}
            role={role}
            setError={setError}
            gradeRefresh={gradeRefresh}
            setGradeRefresh={setGradeRefresh}
          />
        } />
        <Route path="/debug" element={<Debug />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/admin" element={
          <Admin token={token} />
        } />
      </Routes>
      <div className={'fixed w-full bottom-4 flex justify-center '+(showError?'':'hidden')}>
        <button
          className='bg-red-500 w-fit px-4 p-2 rounded-lg text-white flex justify-center cursor-pointer'
          onClick={() => setShowError(false)}
        >
          An error has occurred: {error}
        </button>
      </div>
    </div>
  )
}

export default App
