import CourseRow from "./CourseRow.jsx";

function CourseList({courses}) {
  return(
    <div>
      {courses.map((course, index) => {
        let courseData = [
          course['className'],
          course['teacher'],
          course['time'],
          course['numStudents']+'/'+course['capacity']
        ]

        return(
          <CourseRow
            addons={['']}
            itemAddons={['bg-gray-400']}
            key={course['className'] + index}
            items={courseData}
          />
        )
      })}
    </div>
  );
}

export default CourseList;