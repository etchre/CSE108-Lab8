import studentAPI from "../../functions/studentAPI.js";

function EnrollButton({token, id, setResponse, enrolled}) {
  let buttonColor = enrolled ? 'bg-red-500 hover:bg-red-400' : 'bg-green-500 hover:bg-green-400';

  return (
    <button
      className={'text-white px-4 py-2 rounded-lg cursor-pointer '+buttonColor}
      onClick={()=>{
        if (enrolled) {
          studentAPI.unenroll({token, classId: id, setResponse})
        } else {
          studentAPI.enroll({token, classId: id, setResponse})
        }
      }}
    >
      {enrolled ? 'Drop' : 'Enroll'}
    </button>
  )
}

export default EnrollButton;