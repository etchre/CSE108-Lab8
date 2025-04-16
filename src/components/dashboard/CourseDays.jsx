const days = ['S','M','T','W','TH','F','S']

function CourseDays({courseDays}) {
  const inputDays = courseDays.split(',')

  return (
    <div className='flex mr-2'>
      {days.map((day, index) => {
        let borderEdge = ' '
        if(index === 0) {
          borderEdge = 'border-l-2 '
        } else if(index === days.length-1){
          borderEdge = 'border-r-2 '
        }

        let activeDayStyle = ''
        if(inputDays.includes(day)){
          activeDayStyle = ' bg-gray-600 text-white'
        }

        return(
          <div
            className={'px-1 border-1 border-y-2 border-gray-600 '+borderEdge+activeDayStyle}
            key={day + index}
          >
            {day.substring(0, 1)}
          </div>
        )
      })}
    </div>
  )
}

export default CourseDays;