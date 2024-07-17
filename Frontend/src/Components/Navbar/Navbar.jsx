import React from 'react'
import "./Navbar.css"
import Logo from "../../assets/Logo.png"

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="navbar-left">
            <img src={Logo} alt="" className='logo'/>
            <div className="seperator"></div>
            <p>Student Dashboard</p>
        </div>
    </div>
  )
}

export default Navbar
