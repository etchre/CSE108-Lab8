import { useParams } from "react-router";
import teacherAPI from "../../functions/teacherAPI.js";
import {useEffect, useState} from "react";
import CourseRow from "./CourseRow.jsx";
import GradeInput from "./GradeInput.jsx";

function TeacherCourseView({
    token,
    classInfo,
    currentCourse,
    setResponse
}) {
  //class id is passed in through the url
  //params.classID
  const [current, setCurrent] = useState(null)
  let {classID} = useParams();

  if(classID !== current) {
    setCurrent(classID);
  }

  useEffect(() => {
    teacherAPI.getClassInfo({
      token,
      classId: current,
      setResponse
    })
  }, [current])

  return (
    <div className='text-white p-6 text-sm'>
      <h3 className="text-2xl font-bold mb-4">
        {currentCourse}
      </h3>
      <CourseRow
        addons={['border-b border-white uppercase font-bold']}
        items={['Student Name','Grade']}
      />
      {classInfo.map((item, index) => {
        //omit the bottom border on the last class in the list
        let borderStyle = index >= classInfo.length-1? '': 'border-b'
        return (
          <CourseRow
            key={item['username']+item['grade']+index}
            addons={['my-0.5','border-white bg-[#00507C]',borderStyle]}
            items={[
              item['username'],
              <GradeInput
                grade={item['grade']}
                classID={current}
                studentID={item['student_id']}
                token={token}
                setResponse={setResponse}
              />
            ]}
          />)
      })}

    </div>
  )
}

export default TeacherCourseView;