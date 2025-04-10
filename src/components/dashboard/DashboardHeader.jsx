function DashboardHeader({user, setLoggedIn}) {
  return (
    <div className="flex justify-between m-4">
      <div className="text-3xl font-bold">
        hello {user}
      </div>
      <div>
        UC Merced
      </div>
      <button className="p-2 border-2 rounded-lg" onClick={() => {
        setLoggedIn(false);
      }}>
        Log out
      </button>
    </div>
  )
}

export default DashboardHeader;