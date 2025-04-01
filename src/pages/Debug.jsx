import ButtonRow from "../components/debug/ButtonRow.jsx";
import studentAPI from "../functions/studentAPI.js";
import {useEffect, useState} from "react";

function Debug(){

  const [token, setToken] = useState("");

  useEffect(()=>{
    console.log(token);
  }, [])

  const hello = () => {
    console.log("hello");
  }

  const createTestAccount = () => {
    const username = "test"
    const password = "12345678"

    studentAPI.createAccount({username, password})
  }

  const loginTestAccount = () => {
    const username = "test"
    const password = "12345678"

    studentAPI.login({username, password})
  }

  const getClassesWithToken = () => {
    studentAPI.getClasses({token})
  }

  const enrollInTestClass = () => {
    const classId = 0

    studentAPI.enroll({token, classId})
  }

  const unenrollInTestClass = () => {
    const classId = 0

    studentAPI.unenroll({token, classId})
  }

  const studentFunctions = [
    hello,
    createTestAccount,
    loginTestAccount,
    getClassesWithToken,

  ]

  return(
    <div className="m-4">

      <ButtonRow color="bg-amber-300" functions={studentFunctions} />

    </div>
  )
}

export default Debug;