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
    <div className='w-350 mx-8 px-6 py-2'>
      {allCourses.map((course, index) => {
        let classFull = course['numStudents']>=course['capacity'];

        return (
          <div
            className='flex justify-between px-4 py-3 my-2 rounded-lg shadow-sm bg-white text-[#003B5C] mx-2'
            key={'all'+course['className']+index}
          >
            <div>
              <div className='font-bold text-xl mb-0.5'>
                {course['className'].split('-')[0]}: {course['className'].split('-')[1]}
              </div>
              <div className='flex text-md text-gray-600 items-center'>
                <CourseDays courseDays={course['time'].split(' ')[0]}/>
                <div>{course['time'].split(' ').slice(1)}, {course['teacher']}</div>
              </div>
            </div>
            <div className='flex justify-end items-center'>
              <div className='px-3 text-md'>
                {classFull ?
                  <div className='border-red-600 border-b-2'>Course Full!</div> :
                  <div>Capacity: {course['numStudents']}/{course['capacity']}</div>
                }
              </div>
              <EnrollButton
                token={token}
                id={course['id']}
                setResponse={setResponse}
                enrolled={ids.includes(course['id'])}
                full={classFull}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AddCourseView;