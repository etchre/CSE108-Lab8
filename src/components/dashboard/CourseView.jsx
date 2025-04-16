import CourseRow from "./CourseRow.jsx";
import {NavLink} from "react-router";

function CourseView({courses, teacher=false}) {
  return (
    <div className="px-6 py-6 text-white h-full overflow-auto w-350">
      <h3 className="text-2xl font-bold mb-4">Course Details</h3>
        <div className="text-md text-left w-full">
          {/* header row */}
          <CourseRow
            addons={['border-b border-white uppercase font-bold']}
            items={['Course Name','Subject','Instructor','Time','Students Enrolled']}
          />
          <CourseList courses={courses} teacher={teacher} />
        </div>
    </div>
  )
}

function CourseList ({courses, teacher}) {
  return(
      <div>
        {courses.map((course, index) => {
          //omit the bottom border on the last class in the list
          let borderStyle = index >= courses.length-1? '': 'border-b'
          let borderColor = index%2 === 0 ? 'bg-[#00507C]': 'bg-[#196189]';

          const courseDetails = course['className'].split('-')
          const courseTag = courseDetails[0]
          const courseName = courseDetails[1]
          if(!teacher) {
            return(
              <CourseRow
                addons={['my-0.5',borderColor,borderStyle]}
                key={course['className'] + index}
                items={
                  [
                    courseName,
                    courseTag,
                    course['teacher'],
                    course['time'],
                    course['numStudents']+'/'+course['capacity'],
                  ]
                }
              />
            )
          } else {
            return(
              <CourseRow
                addons={['my-0.5',borderColor,borderStyle]}
                key={course['className'] + index}
                items={
                  [
                    <NavLink
                      to={"/dashboard/course/"+course['id']}
                      className='text-blue-300 underline'
                    >
                      {courseName}
                    </NavLink>,
                    courseTag,
                    course['teacher'],
                    course['time'],
                    course['numStudents']+'/'+course['capacity'],
                  ]
                }
              />
            )
          }

        })}
      </div>
    );
}

export default CourseView;