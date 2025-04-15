import {useState} from "react";
import teacherAPI from "../../functions/teacherAPI.js";

function GradeInput({
    grade,
    classID,
    studentID,
    token,
    setResponse
}) {
  function handleSubmit(e) {
    e.preventDefault();

    // get value of grade from the input field
    const formData = new FormData(e.target);
    const inputGrade = formData.get('grade');

    //if the grade has not changed, do nothing
    if(grade === inputGrade) {
      return;
    }

    teacherAPI.changeGrade({
      token,
      classId: classID,
      student: studentID,
      grade: inputGrade,
      setResponse
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <input
        name='grade'
        type='text'
        placeholder={grade}
        className='border-b-1 p-1 w-8'
      />
    </form>
  )
}

export default GradeInput;