import CourseView from "../../components/dashboard/CourseView.jsx";

function Teacher({token, courses, setResponse}) {
  return (
    <div>
      <CourseView
        token={token}
        courses={courses}
        setResponse={setResponse}
      />
    </div>
  )
}

export default Teacher