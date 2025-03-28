import {useNavigate} from "react-router";
import {useEffect} from "react";

function Login({loggedIn, setLoggedIn}) {
  let navigate = useNavigate();

  useEffect(() => {
    if(loggedIn) {
      navigate('/dashboard');
    }
  }, [loggedIn]);

  return (
    <div className="flex justify-between content-center">
      <div className="text-3xl font-bold">
        hello from the login page
      </div>
      <button className="p-2 border-2 rounded-lg" onClick={() => {
        setLoggedIn(true)
      }}>
        Log In
      </button>
    </div>
  )
}

export default Login;