import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import studentAPI from "../functions/studentAPI.js";
import generalAPI from "../functions/generalAPI.js";
import teacherAPI from "../functions/teacherAPI.js";


function Login({ loggedIn, setResponse }) {
  // initialize navigate function
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true);

  // login form
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // new account form 
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    // if user already exists; redirect to dashboard
    if (loggedIn) {
      navigate("/dashboard/");
    }
  }, [loggedIn, navigate]);

  const handleLogin = () => {
    generalAPI.login({
      username: loginUsername,
      password: loginPassword,
      setResponse
    });

    setLoginPassword('');
  };

  const handleAccountCreation = () => {
    console.log("Creating account with:", newUsername, newPassword, "Role:", selectedRole);
    if(selectedRole === 'student') {
      studentAPI.createAccount({
        username: newUsername,
        password: newPassword,
        setResponse
      });
    } else if(selectedRole === 'teacher') {
      teacherAPI.createAccount({
        username: newUsername,
        password: newPassword,
        setResponse
      });
    } else if (selectedRole === 'admin') {
      console.log('error');
    }

    setSelectedRole(null)
    setIsLoginView(true);
    setNewUsername("");
    setNewPassword("");
  };

  return (
    // outer container to set screen height
    // will use navy colored background to keep in line with UCM 
    <div className="min-h-screen bg-blue-900 flex flex-col justify-center items-center px-4">

      {/** heading */}
      <h1 className="text-4xl font-bold text-white mb-2">UC Merced</h1>
      <h2 className="text-xl text-yellow-400 mb-8">COURSE REGISTRATION</h2>

      <div className="bg-white rounded shadow-lg p-8 w-full max-w-md">
        {isLoginView ? (
          <>
            {/* login container */}
            <div className="mb-4">

              {/** username input */}
              <label className="block text-gray-700 font-semibold mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/** password input */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/** login button: when clicked, sets 'loggedIn  state to true */}
            <button
              className="bg-yellow-400 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-500 w-full"
              onClick={handleLogin}
            >
              Login
            </button>

            {/* forgot password & create account */}
            <div className="flex justify-center mt-4 text-sm">
              <button
                className="text-blue-500 hover:underline"
                onClick={() => {
                  setSelectedRole(null);
                  setIsLoginView(false)
                }}
              >
                Create Account
              </button>
            </div>
          </>
        ) : (
          <>

            {/** if no role selected, show options */}
            {selectedRole === null ? (
              <>
                <div className="mb-4 text-center">
                  <p className="mb-6 text-gray-700">Select account type:</p>
                  <div className="flex justify-around">
                    <button
                      className="bg-yellow-400 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-500"
                      onClick={() => setSelectedRole("student")}
                    >
                      Student
                    </button>
                    <button
                      className="bg-yellow-400 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-500"
                      onClick={() => setSelectedRole("teacher")}
                    >
                      Teacher
                    </button>
                  </div>
                </div>
                <button
                  className="text-blue-500 hover:underline mt-4"
                  onClick={() => setIsLoginView(true)}
                >
                  Back to Login
                </button>
              </>
            ) : (
              <>
                {/* after selecting role, show account creation fields */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    New Username
                  </label>
                  <input
                    type="text"
                    placeholder="Choose a username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Choose a password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <button
                  className="bg-yellow-400 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-500 w-full"
                  onClick={handleAccountCreation}
                >
                  Create Account
                </button>
                <button
                  className="text-blue-500 hover:underline mt-4"
                  onClick={() => setSelectedRole(null)}
                >
                  Back
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Login;