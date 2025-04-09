import ButtonRow from "../components/debug/ButtonRow.jsx";
import studentAPI from "../functions/studentAPI.js";
import {useEffect, useState} from "react";

function Debug(){

  const [token, setToken] = useState("");
  const [response, setResponse] = useState({});

  useEffect(()=>{
    console.log(token);
  }, [token])

  useEffect(()=>{
    if(response['Token'] !== undefined){
      console.log('received token');
      setToken(response['Token']);
    }
    if(response['error'] !== undefined){
      console.log(response['error']);
    }
    //console.log(response);

  }, [response]);

  const hello = () => {
    console.log("hello");
  }

  const createTestAccount = () => {
    const username = "hawaii"
    const password = "pineapple"

    studentAPI.createAccount({username, password, setResponse});
  }

  const loginTestAccount = () => {
    const username = "test"
    const password = "12345678"

    studentAPI.login({username, password, setResponse})
  }

  const getClassesWithToken = () => {
    console.log(token)
    studentAPI.getClasses({token, setResponse})
  }

  const enrollInTestClass = (user_token) => {
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

      <ButtonRow color="bg-amber-300" functions={studentFunctions}/>

    </div>
  )
}

export default Debug;