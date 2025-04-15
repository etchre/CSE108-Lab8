import studentAPI from "../../functions/studentAPI.js";

function EnrollButton({token, id, setResponse, enrolled, full}) {
  let buttonColor = enrolled ? 'bg-red-500 hover:bg-red-400' : 'bg-green-500 hover:bg-green-400';
  buttonColor += ' cursor-pointer'

  if(full && !enrolled) {
    buttonColor = 'bg-gray-400'
  }

  return (
    <button
      className={'text-white px-4 py-3 rounded-lg '+buttonColor}
      onClick={()=>{
        if (full && !enrolled) {
          return;
        }
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