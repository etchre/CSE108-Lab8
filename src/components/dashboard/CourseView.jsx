import {useEffect} from "react";
import CourseRow from "./CourseRow.jsx";
import CourseList from "./CourseList.jsx";
import CourseHeader from "./CourseHeader.jsx";
import ViewSelector from "./ViewSelector.jsx";

function CourseView({courses, token, setResponse}) {
  useEffect(() => {
    console.log(courses);
  }, [courses])

  return (
    <div className="max-w [1400px] mx-auto px-6 py-6 text-white h-full overflow-auto">
      <ViewSelector token={token} setResponse={setResponse} />
      <h3 className="text-2xl font-bold mb-4">Course Details</h3>
      {/* example table for courses */}
      <div className="overflow-x-auto">
          <div className="text-sm text-left w-full">
          <CourseHeader />
          <CourseList courses={courses} />
        </div>
      </div>
    </div>
  )
}

export default CourseView;