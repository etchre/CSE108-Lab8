import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import studentAPI from "../functions/studentAPI.js";
import teacherAPI from "../functions/teacherAPI.js";

import DashboardHeader from "../components/dashboard/DashboardHeader.jsx";
import Student from "./dashboard/Student.jsx";
import Teacher from "./dashboard/Teacher.jsx";
import CourseSchedule from "../components/dashboard/CourseSchedule.jsx";
import generalAPI from "../functions/generalAPI.js";

function Dashboard({
  loggedIn,
  setLoggedIn,
  setResponse,
  token,
  courses,
  classInfo,
  currentCourse,
  allCourses,
  user,
  role,
  setError,
  gradeRefresh,
  setGradeRefresh,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    } else {
      if (role === "student") {
        studentAPI.getClasses({ token, setResponse });
        generalAPI.seeAllCourses({ setResponse });
      } else if(role === "teacher") {
        teacherAPI.getClasses({ token, setResponse });
      } else if(role === "admin") {
        navigate("/admin");
        console.log('admin!')
      } else {
        navigate("/404")
      }
    }
  }, [loggedIn, token, role, navigate, setResponse]);

  return (
    // navy background color (UCM color)
    <div className="min-h-screen w-full bg-[#003B5C] relative overflow-x-hidden">
      <DashboardHeader user={user} setLoggedIn={setLoggedIn} />

      {/* additional tables here (if needed) */}
      {role === "student" ? (
        <Student
          token={token}
          courses={courses}
          allCourses={allCourses}
          setResponse={setResponse}
        />
      ) : role === "teacher" ? (
        <Teacher
          token={token}
          courses={courses}
          classInfo={classInfo}
          currentCourse={currentCourse}
          setResponse={setResponse}
          setError={setError}
          gradeRefresh={gradeRefresh}
          setGradeRefresh={setGradeRefresh}
        />
      ) : (
        <div>Error</div>
        )}
    </div>
  );
}

export default Dashboard;
