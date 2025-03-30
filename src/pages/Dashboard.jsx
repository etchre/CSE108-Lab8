import {useEffect} from "react";
import {useNavigate} from "react-router";

function Dashboard({loggedIn, setLoggedIn}) {
  let navigate = useNavigate();

  useEffect(() => {
    if(!loggedIn) {
      navigate('/');
    }
  }, [loggedIn]);

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