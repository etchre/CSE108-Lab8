import {useState} from 'react'
import {Routes, Route} from "react-router";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";
import Debug from "./pages/Debug.jsx";
import Admin from "./pages/admin.jsx"; // or AdminFrame

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <Routes>
        <Route index element={
          <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        } />
        <Route path="/dashboard" element={
          <Dashboard loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        }/>
        <Route path="/debug" element={<Debug />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/admin" element={<Admin/>} />
      </Routes>
    </div>
  )
}

export default App
