import {useEffect} from "react";
import {useNavigate} from "react-router";
import studentAPI from "../functions/studentAPI.js";
import DashboardHeader from "../components/dashboard/DashboardHeader.jsx";
import CourseView from "../components/dashboard/CourseView.jsx";

function Dashboard({
    loggedIn,
    setLoggedIn,
    setResponse,
    token,
    courses,
    user
}) {
  let navigate = useNavigate();

  useEffect(() => {
    if(!loggedIn) {
      navigate('/');
    } else {
      studentAPI.getClasses({token, setResponse});
    }
  }, [loggedIn, token]);

  useEffect(() => {})

  return (
    <div>
      <DashboardHeader user={user} setLoggedIn={setLoggedIn} />
      <CourseView courses={courses} />
    </div>
  )
}

export default Dashboard;