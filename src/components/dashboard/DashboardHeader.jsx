function DashboardHeader({user, setLoggedIn}) {
  return (
    <div className="grid grid-cols-3 bg-white items-center px-8">
      <div className="text-3xl font-bold text-[#003B5C]">
        Hello {user}!
      </div>
      <header className=" text-center pt-4 pb-2">
        <h1 className="text-[#003B5C] font-bold text-2xl tracking-wide">
          UNIVERSITY OF CALIFORNIA
        </h1>
        <h2 className="text-[#003B5C] font-extrabold text-4xl tracking-widest">
          MERCED
        </h2>
      </header>
      <div className='flex justify-end'>
        <button className="w-fit p-2 rounded-lg border-2 border-[#FFD200] cursor-pointer" onClick={() => {
          setLoggedIn(false);
        }}>
          Log out
        </button>
      </div>
    </div>
  )
}

export default DashboardHeader;