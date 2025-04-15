import CourseView from "../../components/dashboard/CourseView.jsx";
import ViewSelector from "../../components/dashboard/ViewSelector.jsx";
import {Route, Routes} from "react-router";
import TeacherCourseView from "../../components/dashboard/TeacherCourseView.jsx";
import {useEffect, useState} from "react";

function Teacher({
    token,
    courses,
    classInfo,
    currentCourse,
    setResponse
}) {
  const [ids, setIds] = useState(courses.map(course => course['id']));
  const [tags, setTags] = useState(courses.map(
    course => course['className'].split('-')[0]
  ));

  useEffect(() => {
    setIds(courses.map(course => course['id']));
    setTags(courses.map(course => course['className'].split('-')[0]));
  }, [courses])

  return (
    <div>
      <ViewSelector
        links = {
        [['Your Courses', '/dashboard/']].concat(ids.map(
          (id,index) => [tags[index], '/dashboard/course/'+id]
        ))
      }
      />
      <div className='flex justify-center'>
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
              currentCourse={currentCourse}
              setResponse={setResponse}
            />
          }/>
        </Routes>
      </div>
    </div>
  )
}

export default Teacher