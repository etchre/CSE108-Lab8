import {useEffect} from "react";
import {useNavigate} from "react-router";
import studentAPI from "../functions/studentAPI.js";
import teacherAPI from "../functions/teacherAPI.js";

import DashboardHeader from "../components/dashboard/DashboardHeader.jsx";
import Student from "./dashboard/Student.jsx";
import Teacher from "./dashboard/Teacher.jsx";

function Dashboard({
    loggedIn,
    setLoggedIn,
    setResponse,
    token,
    courses,
    user,
    role
}) {
  let navigate = useNavigate();

  useEffect(() => {
    if(!loggedIn) {
      navigate('/');
    } else {
      if(role === 'student') {
        studentAPI.getClasses({token, setResponse});
      } else {
        teacherAPI.getClasses({token, setResponse});
      }

      //generalAPI.seeAllCourses({setResponse})
    }
  }, [loggedIn, token]);

  useEffect(() => {
    console.log(courses)
  }, [courses])


  return (
    <div>
      <DashboardHeader user={user} setLoggedIn={setLoggedIn} />
      {(() => {
        if (role === 'student') {
          return <Student token={token} courses={courses} setResponse={setResponse} />;
        } else if (role === 'teacher') {
          return <Teacher token={token} courses={courses} setResponse={setResponse} />
        } else {
          return (
            <div>error</div>
          )
        }
      })()}
    </div>
  )
}

export default Dashboard;