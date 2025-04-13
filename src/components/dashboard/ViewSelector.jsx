import {NavLink} from "react-router";

//links is an array consisting of 2 element arrays
function ViewSelector({links}) {
  return(
    <div className="flex justify-center bg bg-[#FFD200] text-[#003B5C] font-semibold py-2 space-x-8">
      {links.map((link, index) => {
        return (
          <NavLink
            to={link[1]}
            key={link+index}
            className={({isActive}) => (isActive ? 'bg-white border-white' : 'border-[#FFD200]') + ' rounded-md py-0.5 px-1.5 border-2 hover:border-white'}
            end
          >
            {link[0]}
          </NavLink>
        )
      })}
    </div>
  )
}

export default ViewSelector;