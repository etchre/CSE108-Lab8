import studentAPI from "../../functions/studentAPI.js";
import EnrollButton from "./EnrollButton.jsx";
import {useEffect, useState} from "react";

function AddCourseView({courses, allCourses, token, setResponse}) {
  const [ids, setIds] = useState(courses.map(course => course['id']));

  useEffect(() => {
    setIds(courses.map(course => course['id']));
  }, [courses])

  return (
    <div>
      {allCourses.map((course, index) => {
        return (
          <div
            className='flex justify-between px-4 py-3 my-2 rounded-lg shadow-sm bg-white text-[#003B5C] mx-2'
            key={'all'+course['className']+index}
          >
            <div>
              <p className='font-bold text-lg'>{course['className']}</p>
              <p className='text-sm text-gray-600'>{course['teacher']+' - Time '+ course['time']}</p>
            </div>
            <EnrollButton
              token={token}
              id={course['id']}
              setResponse={setResponse}
              enrolled={ids.includes(course['id'])}
            />
          </div>
        )
      })}
    </div>
  )
}

export default AddCourseView;