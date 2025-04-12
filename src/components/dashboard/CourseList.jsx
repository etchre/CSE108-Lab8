import CourseRow from "./CourseRow.jsx";

function CourseList({courses}) {
  let borderStyle = ' border-b border-white'

  return(
    <div>
      {courses.map((course, index) => {
        let courseData = [
          course['name'],
          course['teacher'],
          course['Time'],
          course['numStudents']+'/'+course['capacity']
        ]

        //omit the bottom border on the last class in the list
        if(index >= courses.length-1){
          borderStyle = ''
        }

        return(
          <CourseRow
            addons={['']}
            itemAddons={['bg-[#00507C] '+borderStyle]}
            key={course['name'] + index}
            items={courseData}
          />
        )
      })}
    </div>
  );
}

export default CourseList;