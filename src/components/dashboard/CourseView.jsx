import CourseRow from "./CourseRow.jsx";

function CourseView({courses}) {
  return (
    <div className="px-6 py-6 text-white h-full overflow-auto">
      <h3 className="text-2xl font-bold mb-4">Course Details</h3>
        <div className="text-sm text-left w-full">
          {/* header row */}
          <CourseRow
            addons={['border-b border-white uppercase font-bold']}
            items={['Course Name','Subject','Instructor','Time','Students Enrolled']}
          />
          <CourseList courses={courses} />
        </div>
    </div>
  )
}

function CourseList ({courses}) {
  return(
      <div>
        {courses.map((course, index) => {
          //omit the bottom border on the last class in the list
          let borderStyle = index >= courses.length-1? '': 'border-b'

          const courseDetails = course['className'].split('-')
          const courseTag = courseDetails[0]
          const courseName = courseDetails[1]

          return(
            <CourseRow
              addons={['my-0.5','bg-[#00507C]',borderStyle]}
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
        })}
      </div>
    );
}

export default CourseView;