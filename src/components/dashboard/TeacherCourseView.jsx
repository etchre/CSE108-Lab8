import { useParams } from "react-router";
import teacherAPI from "../../functions/teacherAPI.js";
import {useEffect, useState} from "react";
import CourseRow from "./CourseRow.jsx";
import GradeInput from "./GradeInput.jsx";

function TeacherCourseView({
    token,
    classInfo,
    currentCourse,
    setResponse,
    setError,
    gradeRefresh,
    setGradeRefresh,
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
    setGradeRefresh(false)
  }, [current,gradeRefresh])

  return (
    <div className='text-white p-6 text-md w-5xl'>
      <h3 className="text-2xl font-bold mb-4">
        {currentCourse.split('-')[1]}
      </h3>
      <CourseRow
        addons={['border-b border-white uppercase font-bold']}
        items={['Student Name','Grade']}
      />
      {classInfo.map((item, index) => {
        //omit the bottom border on the last class in the list
        let borderStyle = index >= classInfo.length-1? '': 'border-b'
        let borderColor = index%2 === 0 ? 'bg-[#00507C]': 'bg-[#196189]';
        return (
          <CourseRow
            key={item['username']+item['grade']+index}
            addons={['my-0.5','border-white ',borderColor,borderStyle,'items-center']}
            items={[
              item['username'],
              <GradeInput
                grade={item['grade']}
                classID={current}
                studentID={item['student_id']}
                token={token}
                setResponse={setResponse}
                setError={setError}
              />
            ]}
          />)
      })}

    </div>
  )
}

export default TeacherCourseView;