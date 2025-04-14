import Student from "../../pages/dashboard/Student.jsx";
import Teacher from "../../pages/dashboard/Teacher.jsx";
import {useState} from "react";

function BottomPanel({children}) {
  // track the bottom panel’s open/close
  const [isBottomPanelOpen, setIsBottomPanelOpen] = useState(true);

  // toggle bottom panel
  const toggleBottomPanel = () => {
    setIsBottomPanelOpen((prev) => !prev);
  };

  return (
    <div>
      {/* arrow up and down functionality */}
      <button
        onClick={toggleBottomPanel}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2
          bg-white text-[#003B5C] border border-gray-300 w-12 h-12
          rounded-full flex items-center justify-center shadow-md hover:shadow-lg z-50"
      >
        {isBottomPanelOpen ? "↓" : "↑"}
      </button>
      <div
        className={`fixed left-0 w-full transition-all duration-300 z-40
        ${isBottomPanelOpen ? "min:h-fit pb-16 h-1/3" : "h-0 overflow-hidden"} 
        bottom-0 bg-[#003B5C] rounded-t-xl shadow-xl border-t border-gray-200`}
      >
        {children}
      </div>
    </div>
  )
}

export default BottomPanel