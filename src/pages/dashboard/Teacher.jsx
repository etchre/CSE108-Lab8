import CourseView from "../../components/dashboard/CourseView.jsx";
import ViewSelector from "../../components/dashboard/ViewSelector.jsx";
import {Route, Routes} from "react-router";
import TeacherCourseView from "../../components/dashboard/TeacherCourseView.jsx";
import {useEffect, useState} from "react";

function Teacher({token, courses, classInfo, setResponse}) {
  const [ids, setIds] = useState(courses.map(course => course['id']));

  useEffect(() => {
    setIds(courses.map(course => course['id']));
  }, [courses])

  return (
    <div>
      <ViewSelector
        links = {
        [['Your Courses', '/dashboard/']].concat(ids.map(
          id => [id, '/dashboard/course/'+id]
        ))
      }
      />
      <Routes>
        <Route index element={
          <CourseView
            token={token}
            courses={courses}
            setResponse={setResponse}/>
        }/>
        <Route path='/course/:classID' element={
          <TeacherCourseView
            token={token}
            classInfo={classInfo}
            setResponse={setResponse}
          />
        }/>
      </Routes>
    </div>
  )
}

export default Teacher