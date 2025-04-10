import { useEffect } from "react";

function Admin() {
  useEffect(() => {
    window.location.href = "http://localhost:5000/admin";
  }, []);
  return null;
}

export default Admin;

