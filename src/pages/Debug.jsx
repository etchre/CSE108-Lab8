function Debug(){

  const hello = () => {
    console.log("hello");
  }

  return(
    <div className="m-4">

      {/*button row*/}
      <div className="flex justify-start">
        <button className="m-2 p-3 rounded-xl bg-amber-300 cursor-pointer" onClick={hello}>Hello</button>
      </div>

    </div>
  )
}

export default Debug;