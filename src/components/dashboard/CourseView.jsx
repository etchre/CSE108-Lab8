import {useEffect} from "react";
import CourseRow from "./CourseRow.jsx";
import CourseList from "./CourseList.jsx";
import CourseHeader from "./CourseHeader.jsx";
import ViewSelector from "./ViewSelector.jsx";

function CourseView({courses}) {

  useEffect(() => {
    console.log(courses);
  }, [courses])

  return (
    <div className="m-4">
      <ViewSelector />
      <div className="py-8 px-16 bg-blue-900 rounded-lg">
        <CourseHeader />
        <CourseList courses={courses} />
      </div>
    </div>
  )
}

export default CourseView;