import studentAPI from "../../functions/studentAPI.js";
import EnrollButton from "./EnrollButton.jsx";
import {useEffect, useState} from "react";
import CourseDays from "./CourseDays.jsx";

function AddCourseView({courses, allCourses, token, setResponse}) {
  const [ids, setIds] = useState(courses.map(course => course['id']));

  useEffect(() => {
    setIds(courses.map(course => course['id']));
  }, [courses])

  return (
    <div className='w-7xl mx-8 px-6 py-2'>
      {allCourses.map((course, index) => {
        return (
          <div
            className='flex justify-between px-4 py-3 my-2 rounded-lg shadow-sm bg-white text-[#003B5C] mx-2'
            key={'all'+course['className']+index}
          >
            <div>
              <div className='font-bold text-lg'>
                {course['className'].split('-')[0]}: {course['className'].split('-')[1]}
              </div>
              <div className='flex text-sm text-gray-600 items-center'>
                <CourseDays courseDays={course['time'].split(' ')[0]}/>
                <div>{course['time'].split(' ').slice(1)}, {course['teacher']}</div>
              </div>
            </div>
            <div className='flex justify-end items-center'>
              <div className='px-3 text-md'>
                Capacity: {course['numStudents']}/{course['capacity']}
              </div>
              <EnrollButton
                token={token}
                id={course['id']}
                setResponse={setResponse}
                enrolled={ids.includes(course['id'])}
                full={course['numStudents']>=course['capacity']}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AddCourseView;