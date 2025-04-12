import CourseRow from "./CourseRow.jsx";

function CourseHeader() {

  const header = [
    'Course Name',
    'Instructor',
    'Time',
    'Students Enrolled'
  ]

  return (
    <CourseRow addons={['border-b border-white uppercase font-bold']} items={header} />
  )
}

export default CourseHeader;