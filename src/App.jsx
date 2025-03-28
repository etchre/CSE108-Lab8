import {useState} from 'react'
import {Routes, Route} from "react-router";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="m-4">
      <Routes>
        <Route index element={
          <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        } />
        <Route path="/dashboard" element={
          <Dashboard loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        }/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
