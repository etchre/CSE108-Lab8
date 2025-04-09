import { useEffect, useState } from "react";
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

  // state variable tracking if the upward facing arrow is clicked
  const [isBottomPanelOpen, setIsBottomPanelOpen] = useState(false);

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

  // bottom panel toggle functionality
  const toggleBottomPanel = () => {
    setIsBottomPanelOpen((prevState) => !prevState);
  };

  return (
    <div className="relative min-h-screen bg-white">
      <DashboardHeader user={user} setLoggedIn={setLoggedIn} />

      {/** main container for schedule and bottom panel */}
      <div className="relative">

        {/** schedule grid */}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">Weekly Schedule</h2>
          <div className="border border-gray-300 rounded p-2">

            {/** placeholder for grid */}
            <p>Schedule grid goes here.</p>
          </div>
        </div>

        {/** arrow toggle positioned at bottom-center */}
        <div className="absolute w-full flex justify-center" style={{ bottom: 0}} >
          <button
            onClick={toggleBottomPanel}
            className="bg-blue-500 text-white p-2 rounded-full shadow-lg">
              {isBottomPanelOpen ?  "↓" : "↑"}
            </button>
        </div>

        {/** bottom panel for course details */}
        <div className={`bg-gray-100 absolute left-0 w-full transition-all duration-300 ${isBottomPanelOpen ? "h-1/2" : "h-0 overflow-hidden"} bottom-0 border-t border-gray-400`}>
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2">Course Details</h3>
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
    </div>
  );
}

export default Dashboard;