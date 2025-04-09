import CourseView from "../../components/dashboard/CourseView.jsx";

function Student({token, courses, setResponse}) {
  return (
    <div>
      <CourseView courses={courses} token={token} setResponse={setResponse} />
    </div>
  )
}

export default Student