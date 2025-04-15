import CourseView from "../../components/dashboard/CourseView.jsx";
import BottomPanel from "../../components/dashboard/BottomPanel.jsx";
import CourseSchedule from "../../components/dashboard/CourseSchedule.jsx";
import {useEffect, useState} from "react";
import ViewSelector from "../../components/dashboard/ViewSelector.jsx";
import {Route, Routes} from "react-router";
import AddCourseView from "../../components/dashboard/AddCourseView.jsx";

function Student({token, courses, allCourses, setResponse}) {
  return (
    <div>
      <ViewSelector
        links = {[
          ['Your Courses', '/dashboard/'],
          ['Add Courses', '/dashboard/add-courses'],
        ]}
      />
      <div className='flex justify-center'>
        <Routes>
          <Route index element={
            <CourseView
              courses={courses}
              token={token}
              setResponse={setResponse}
            />
          }/>
          <Route path="/add-courses" element={
            <AddCourseView
              courses={courses}
              allCourses={allCourses}
              token={token}
              setResponse={setResponse}/>
          } />
        </Routes>
      </div>
    </div>
  )
}

export default Student