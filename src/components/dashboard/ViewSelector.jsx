function ViewSelector() {
  return(
    <div className="my-2 flex justify-center">
      <div className="bg-blue-200 rounded-lg text-white flex flex-row p-1">
        <button className="bg-blue-900 py-2 px-4 rounded-lg">
          Your Courses
        </button>
        <button className="py-2 px-4">
          Add Courses
        </button>
      </div>
    </div>
  )
}

export default ViewSelector;