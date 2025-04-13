import CourseRow from "./CourseRow.jsx";

function CourseView({courses}) {
  const gridColumns = 'grid-cols-4'

  return (
    <div className="px-6 py-6 text-white h-full overflow-auto">
      <h3 className="text-2xl font-bold mb-4">Course Details</h3>
        <div className="text-sm text-left w-full">
          {/* header row */}
          <CourseRow
            addons={['border-b border-white uppercase font-bold', gridColumns]}
            items={['Course Name','Instructor','Time','Students Enrolled']}
          />
          <CourseList courses={courses} gridColumns={gridColumns} />
        </div>
    </div>
  )
}

function CourseList ({courses, gridColumns}) {
  return(
      <div>
        {courses.map((course, index) => {
          //omit the bottom border on the last class in the list
          let borderStyle = index >= courses.length-1? '': 'border-b'

          return(
            <CourseRow
              addons={['my-0.5','bg-[#00507C]',borderStyle, gridColumns]}
              itemAddons={['']}
              key={course['className'] + index}
              items={
                [
                  course['className'],
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