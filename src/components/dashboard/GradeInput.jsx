import {useState} from "react";
import teacherAPI from "../../functions/teacherAPI.js";

function GradeInput({
    grade,
    classID,
    studentID,
    token,
    setResponse,
    setError
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

    let invalid = false;

    if(inputGrade.length <= 0){
        setError("grade is empty");
        invalid = true;
    }

    if(Number.isNaN(Number(inputGrade))) {
        setError("grade is not a number");
        invalid = true;
    } else {
        if(Number(inputGrade) < 0 || Number(inputGrade) > 100) {
            setError("grade must be between 0 and 100");
            invalid = true;
        }
    }

    if(invalid){
        e.target.reset();
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

  const [showOptions, setShowOptions] = useState(false);

  return (
    <form
      onSubmit={handleSubmit}
    >
      <input
        name='grade'
        type='text'
        placeholder={grade}
        className={'border-b-1 p-1 w-9 ' + (
          showOptions?'text-yellow-400':'placeholder:text-white'
        )}
        onChange={() => {setShowOptions(true)}}
      />
      <button
        name='undoButton'
        type='reset'
        className={'mx-3 cursor-pointer text-xl ' + (showOptions?'':'hidden')}
        onClick={() => {setShowOptions(false)}}
      >
        ↩️
      </button>
      <button
        name='submitButton'
        type='submit'
        className={'cursor-pointer rounded-full text-xl ' + (showOptions?'':'hidden')}
        onClick={() => {setShowOptions(false)}}
      >
         ✅
      </button>
    </form>
  )
}

export default GradeInput;