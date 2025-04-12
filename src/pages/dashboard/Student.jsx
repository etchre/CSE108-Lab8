import CourseView from "../../components/dashboard/CourseView.jsx";
import BottomPanel from "../../components/dashboard/BottomPanel.jsx";
import CourseSchedule from "../../components/dashboard/CourseSchedule.jsx";

function Student({token, courses, setResponse}) {
  return (
    <div>
      <CourseSchedule />
      <BottomPanel>
        <CourseView courses={courses} token={token} setResponse={setResponse} />
      </BottomPanel>
    </div>
  )
}

export default Student