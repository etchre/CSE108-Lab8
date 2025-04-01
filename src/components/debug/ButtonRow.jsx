function ButtonRow({color, functions}) {
  return (
    <div className="flex justify-start my-2">
      {functions.map((func, index) => {
        return <button
          className={"m-2 p-3 rounded-xl cursor-pointer "+color}
          onClick={func}
          key={func.name + index}
        >
          {func.name}
        </button>
      })}
    </div>
  )
}

export default ButtonRow;