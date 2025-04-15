import { useEffect } from "react";

function Admin({token}) {
  useEffect(() => {
    window.location.href = `http://localhost:5000/admin?jwt=${token}`;
  }, []);
  return null;
}

export default Admin;

