function CourseSchedule() {
  return (
      <div className="w-full mx-auto pt-6 pb-24">
        {/* pb-24 adds space at bottom so arrow doesn’t overlap the schedule */}

        {/* schedule container */}
        <div className="max-w-[1400px] mx-auto bg-white rounded-xl shadow-lg px-6 py-4">
          <h2 className="text-2xl font-bold mb-4 text-[#003B5C]">
            Weekly Schedule
          </h2>

          {/* table */}
          <div className="overflow-x-auto">
            <table className="w-full text-center border border-gray-300">
              <thead>
                <tr className="bg-[#FFD200] text-[#003B5C] font-semibold">
                  <th className="p-2 border-r border-gray-300 w-16">Time</th>
                  <th className="p-2 border-r border-gray-300">Sunday</th>
                  <th className="p-2 border-r border-gray-300">Monday</th>
                  <th className="p-2 border-r border-gray-300">Tuesday</th>
                  <th className="p-2 border-r border-gray-300">Wednesday</th>
                  <th className="p-2 border-r border-gray-300">Thursday</th>
                  <th className="p-2 border-r border-gray-300">Friday</th>
                  <th className="p-2">Saturday</th>
                </tr>
              </thead>
              <tbody>
                {/* Example data: should be dynamicall input. */}
                {["7 am","8 am","9 am","10 am","11 am","12 pm","1 pm","2 pm"].map((time) => (
                  <tr key={time} className="border-b border-gray-300">
                    <td className="py-2 border-r border-gray-300">{time}</td>
                    <td className="border-r border-gray-300"></td>
                    <td className="border-r border-gray-300"></td>
                    <td className="border-r border-gray-300"></td>
                    <td className="border-r border-gray-300"></td>
                    <td className="border-r border-gray-300"></td>
                    <td className="border-r border-gray-300"></td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  )
}

export default CourseSchedule;