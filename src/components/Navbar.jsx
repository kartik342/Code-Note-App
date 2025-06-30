import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row gap-4 place-content-around place-items-center bg-zinc-700 rounded-lg h-10'>
      <NavLink 
      to="/">
        Home
      </NavLink>

      <NavLink 
      to="/paste">
        Notes List
      </NavLink>
    </div>
  )
}

export default Navbar
