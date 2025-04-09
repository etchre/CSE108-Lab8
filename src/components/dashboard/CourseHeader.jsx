import CourseRow from "./CourseRow.jsx";

function CourseHeader() {

  const header = [
    'Course Name',
    'Teacher',
    'Time',
    'Students Enrolled'
  ]

  return (
    <CourseRow addons={['bg-blue-400']} items={header} />
  )
}

export default CourseHeader;