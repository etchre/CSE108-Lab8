import {useEffect} from "react";
import {useNavigate} from "react-router";
import studentAPI from "../functions/studentAPI.js";

function Dashboard({loggedIn, setLoggedIn, setResponse, token, courses}) {
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
    <div className="flex justify-between m-4">
      <div className="text-3xl font-bold">
        hello from the dashboard
      </div>
      <button className="p-2 border-2 rounded-lg" onClick={() => {
        setLoggedIn(false);
      }}>
        Log out
      </button>
    </div>
  )
}

export default Dashboard;