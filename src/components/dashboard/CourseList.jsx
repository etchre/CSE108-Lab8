import CourseRow from "./CourseRow.jsx";

function CourseList({courses}) {
  return(
    <div>
      {courses.map((course, index) => {
        let courseData = [
          course['name'],
          course['teacher'],
          course['Time'],
          course['numStudents']+'/'+course['capacity']
        ]

        return(
          <CourseRow
            addons={['']}
            itemAddons={['bg-gray-400']}
            key={course['name'] + index}
            items={courseData}
          />
        )
      })}
    </div>
  );
}

export default CourseList;