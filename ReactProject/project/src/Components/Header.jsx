import React from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'


const Header = () => {
  const isSelected = ({ isActive }) => (
    {
      fontWeight: isActive ? " bold" : undefined
    }



  );
  const navigate = useNavigate()
  //  navigate("/contact") // It Forwards To The [Given-Location] {FORCEFULLY}


  const {pathname} = useLocation(); 


  return (
    <>
      <header className="text-gray-600 body-font">

        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-pink-500 rounded-full" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">Let's Go</span>
          </div >
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            
            <NavLink   to={"/home"} className={` ${pathname === "/home" ? "font-semibold": ""}  mr-5 hover:text-gray-900`}>Home</NavLink>
            <NavLink   to={"/services"} className={` ${pathname === "/services" ? "font-semibold": ""}  mr-5 hover:text-gray-900`}>Services</NavLink>
            <NavLink   to={"/about"} className={` ${pathname === "/about" ? "font-semibold": ""}  mr-5 hover:text-gray-900`}>About</NavLink>
            <NavLink   to={"/contact"} className={` ${pathname === "/contact" ? "font-semibold": " "}  mr-5 hover:text-gray-900`}>Contact Us</NavLink>
          </nav>
          <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Button
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </header>

    </>
  )
}

export default Header