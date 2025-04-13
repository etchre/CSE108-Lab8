import { useParams } from "react-router";
import {useEffect} from "react";
import teacherAPI from "../../functions/teacherAPI.js";

function TeacherCourseView({token, classInfo, setResponse}) {
  //class id is passed in through the url
  //params.classID
  let params = useParams();

  useEffect(() => {
    teacherAPI.getClassInfo({
      token,
      classId: params.classID,
      setResponse
    })
  }, [])

  return (
    <div>
      teacher course view
    </div>
  )
}

export default TeacherCourseView;