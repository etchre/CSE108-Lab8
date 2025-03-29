import {useNavigate} from "react-router";
import {useEffect} from "react";

function Login({loggedIn, setLoggedIn}) {

  // changed 'let' to 'const' 
  // initialize navigate function 
  const navigate = useNavigate();

  useEffect(() => {

    // if user already logged in, redirect to dashboard
    if(loggedIn) {
      navigate('/dashboard');
    }
  }, [loggedIn, navigate]);

  // return the JSX for login screen
  return (

    // outer container to set screen height
    // will use navy colored background to keep in line with UCM
    <div className="min-h-screen bg-blue-900 flex flex-col justify-center items-center px-4">

      {/** Heading: displays main title */}
      <h1 className="text-4xl font-bold text-white mb-2">UC Merced</h1>

      {/** Subheading: subtitle */}
      <h2 className="text-xl text-yellow-400 mb-8">COURSE REGISTRATION</h2>

      {/** Login container: white background, rounded corners, shadow for depth, padding, and width */}
      <div className="bg-white rounded shadow-lg p-8 w-full max-w-md">

        {/** Username input field */}
        <div className="mb-4">
          {/** label for username field */}
          <label className="block text-gray-700 font-semibold mb-2">
            Username
          </label>
          {/** input field for username w/ styling */}
          <input
            type="text"
            className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Enter your username"
          />
        </div>

        {/** password input container */}
        <div className="mb-4">

          {/** label for password */}
          <label className="block text-gray-700 font-semibold mb-2">
            Password
          </label>

          {/** input field for password w/ 'username' styling */}
          <input
            type="password"
            className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Enter your password"
          />
        </div>

        {/** login button: when clicked, sets 'loggedIn' state true */}
        <button
          className="bg-yellow-400 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-500 w-full"
          onClick={() => {
            //update login state
            setLoggedInI(true);
          }}
        >
          Login
        </button>

        {/** forgot password link */}
        <p className="text-center mt-4">

          {/** link styled for blue color */}
          <a href="#" className="text-blue-500 hover:underline text-sm">
            Forgot Password?
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;