import studentAPI from "../../functions/studentAPI.js";
import generalAPI from "../../functions/generalAPI.js";
import {useEffect, useState} from "react";

function ViewSelector({token, setResponse}) {

  const [view, setView] = useState('user')

  return(
    <div className="my-2 flex justify-center">
      <div className="bg-blue-200 rounded-lg text-white flex flex-row p-1">
        <button
          className={
            (view==='user'?'bg-blue-900':'')
              +" rounded-lg py-2 px-4 cursor-pointer"
          }
          onClick={() => {
            studentAPI.getClasses({token, setResponse})
            setView('user')
          }}
        >
          Your Courses
        </button>
        <button
          className={
            (view==='all'?'bg-blue-900':'')+" rounded-lg py-2 px-4 cursor-pointer"
          }
          onClick={() => {
            generalAPI.seeAllCourses({setResponse})
            setView('all')
          }}
        >
          Add Courses
        </button>
      </div>
    </div>
  )
}

export default ViewSelector;