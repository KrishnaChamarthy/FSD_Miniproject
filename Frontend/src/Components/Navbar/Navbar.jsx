import React from 'react'
import "./Navbar.css"
import Logo from "../../assets/Logo.png"
import Profile_icon from "../../assets/boy.png"
import Bell_icon from "../../assets/bell.png"

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="navbar-left">
            <img src={Logo} alt="" className='logo'/>
            <div className="seperator"></div>
            <p>Student Dashboard</p>
        </div>
        <div className="navbar-right">
          <div className="navbar-bell-icon">
            <img src={Bell_icon} alt="" className='bell-icon'/>
            <div className="dot">3</div>
          </div>
          <div className="seperator"></div>
          <div className="profile-info">
            <p>Krishna Srimanth Chamarthy</p>
            <span>[Student]</span>
          </div>
          <img src={Profile_icon} alt="" className='profile-icon'/>
        </div>
    </div>
  )
}

export default Navbar
