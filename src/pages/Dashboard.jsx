import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import studentAPI from "../functions/studentAPI.js";
import teacherAPI from "../functions/teacherAPI.js";

import DashboardHeader from "../components/dashboard/DashboardHeader.jsx";
import Student from "./dashboard/Student.jsx";
import Teacher from "./dashboard/Teacher.jsx";
import CourseSchedule from "../components/dashboard/CourseSchedule.jsx";

function Dashboard({
  loggedIn,
  setLoggedIn,
  setResponse,
  token,
  courses,
  user,
  role
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    } else {
      if (role === "student") {
        studentAPI.getClasses({ token, setResponse });
      } else {
        teacherAPI.getClasses({ token, setResponse });
      }
      // generalAPI.seeAllCourses({ setResponse })
    }
  }, [loggedIn, token, role, navigate, setResponse]);

  useEffect(() => {
    console.log("Courses => ", courses);
  }, [courses]);

  return (
    // navy background color (UCM color)
    <div className="min-h-screen w-full bg-[#003B5C] relative overflow-x-hidden">

      {/* DashboardHeader */}
      {/**<DashboardHeader user={user} setLoggedIn={setLoggedIn} />*/}

      <header className="bg-white text-center pt-4 pb-2">
        <h1 className="text-[#003B5C] font-bold text-2xl tracking-wide">
          UNIVERSITY OF CALIFORNIA
        </h1>
        <h2 className="text-[#003B5C] font-extrabold text-4xl tracking-widest">
          MERCED
        </h2>
      </header>

      {/* gold navigation bar */}
      <nav className="bg-[#FFD200] text-[#003B5C] font-semibold flex justify-center space-x-8 py-2 shadow-md">
        <button className="hover:underline">Weekly Schedule</button>
        <button className="hover:underline">Course Details</button>
        <button className="hover:underline">Add Courses</button>
        <button className="hover:underline">Your Enrolled Courses</button>
      </nav>

      {/* additional tables here (if needed) */}
      {role === "student" ? (
        <Student token={token} courses={courses} setResponse={setResponse} />
      ) : role === "teacher" ? (
        <Teacher token={token} courses={courses} setResponse={setResponse} />
      ) : (
        <div>Error</div>
        )}
    </div>
  );
}

export default Dashboard;
