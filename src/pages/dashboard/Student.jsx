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
          ['Weekly Schedule', '/dashboard/'],
          ['Add Courses', '/dashboard/add-courses'],
        ]}
      />
      <Routes>
        <Route index element={<CourseSchedule />}/>
        <Route path="/add-courses" element={
          <AddCourseView
            courses={courses}
            allCourses={allCourses}
            token={token}
            setResponse={setResponse}/>
        } />
      </Routes>
      <BottomPanel>
        <CourseView courses={courses} token={token} setResponse={setResponse} />
      </BottomPanel>
    </div>
  )
}

export default Student