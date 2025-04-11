import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
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
  const navigate = useNavigate();

  // track the bottom panel’s open/close
  const [isBottomPanelOpen, setIsBottomPanelOpen] = useState(false);

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

  // toggle bottom panel
  const toggleBottomPanel = () => {
    setIsBottomPanelOpen((prev) => !prev);
  };

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

      {/* main container for schedule and bottom panel */}
      <div className="w-full mx-auto pt-6 pb-24"> 
        {/* pb-24 adds space at bottom so arrow doesn’t overlap the schedule */}

        {/* schedule container */}
        <div className="max-w-[1400px] mx-auto bg-white rounded-xl shadow-lg px-6 py-4">
          <h2 className="text-2xl font-bold mb-4 text-[#003B5C]">
            Weekly Schedule
          </h2>

          {/* table */}
          <div className="overflow-x-auto">
            <table className="w-full text-center border border-gray-300">
              <thead>
                <tr className="bg-[#FFD200] text-[#003B5C] font-semibold">
                  <th className="p-2 border-r border-gray-300 w-16">Time</th>
                  <th className="p-2 border-r border-gray-300">Sunday</th>
                  <th className="p-2 border-r border-gray-300">Monday</th>
                  <th className="p-2 border-r border-gray-300">Tuesday</th>
                  <th className="p-2 border-r border-gray-300">Wednesday</th>
                  <th className="p-2 border-r border-gray-300">Thursday</th>
                  <th className="p-2 border-r border-gray-300">Friday</th>
                  <th className="p-2">Saturday</th>
                </tr>
              </thead>
              <tbody>
                {/* Example data: should be dynamicall input. */}
                {["7 am","8 am","9 am","10 am","11 am","12 pm","1 pm","2 pm"].map((time) => (
                  <tr key={time} className="border-b border-gray-300">
                    <td className="py-2 border-r border-gray-300">{time}</td>
                    <td className="border-r border-gray-300"></td>
                    <td className="border-r border-gray-300"></td>
                    <td className="border-r border-gray-300"></td>
                    <td className="border-r border-gray-300"></td>
                    <td className="border-r border-gray-300"></td>
                    <td className="border-r border-gray-300"></td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* arrow up and down functionality */}
      <button
        onClick={toggleBottomPanel}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2
          bg-white text-[#003B5C] border border-gray-300 w-12 h-12 
          rounded-full flex items-center justify-center shadow-md hover:shadow-lg z-50"
      >
        {isBottomPanelOpen ? "↓" : "↑"}
      </button>
      <div
        className={`fixed left-0 w-full transition-all duration-300 z-40
        ${isBottomPanelOpen ? "h-1/2" : "h-0 overflow-hidden"} 
        bottom-0 bg-[#003B5C] rounded-t-xl shadow-xl border-t border-gray-200`}
      >
        <div className="max-w [1400px] mx-auto px-6 py-6 text-white h-full overflow-auto">
          <h3 className="text-2xl font-bold mb-4">Course Details</h3>
          {/* example table for courses */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-white bg-[#003B5C] border-b border-white uppercase">
                  <th className="px-4 py-2">CRN</th>
                  <th className="px-4 py-2">Course Name</th>
                  <th className="px-4 py-2">Instructor</th>
                  <th className="px-4 py-2">Time</th>
                </tr>
              </thead>
              <tbody className="bg-[#00507C]">
                <tr className="border-b border-white">
                  <td className="px-4 py-2">12345</td>
                  <td className="px-4 py-2">Intro to Biology</td>
                  <td className="px-4 py-2">Jeffrey Cruz</td>
                  <td className="px-4 py-2">9:30 am</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">67890</td>
                  <td className="px-4 py-2">Calculus I</td>
                  <td className="px-4 py-2">Richard Wong</td>
                  <td className="px-4 py-2">1:30 pm</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* additional tables here (if needed) */}
          {role === "student" ? (
            <Student token={token} courses={courses} setResponse={setResponse} />
          ) : role === "teacher" ? (
            <Teacher token={token} courses={courses} setResponse={setResponse} />
          ) : (
            <div>Error</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
