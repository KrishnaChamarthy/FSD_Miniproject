import React, { useState } from 'react'
import "./Sidebar.css"
import Logo from "../../assets/Logo.png"
import { Link } from 'react-router-dom'


const Sidebar = ({activePage, setActivePage}) => {

  const handleClick = (name) => {
    setActivePage(name)
  }
  return (
    <div className='sidebar'>
      <img src={Logo} alt="" />
      <div className="sidebar-menu">
        <ul>
          <Link to="/" className={activePage==="dashboard"?"active":""} onClick={() => handleClick("dashboard")}>Dashboard</Link>
          <Link to="/profile" className={activePage==="profile"?"active":""} onClick={() => handleClick("profile")}>Student Profile</Link>
          <Link to="/attendance" className={activePage==="attendance"?"active":""} onClick={() => handleClick("attendance")}>Attendance</Link>
          <Link to="/timetable" className={activePage==="timetable"?"active":""} onClick={() => handleClick("timetable")}>Time Table</Link>
          <Link to="/circulars" className={activePage==="circulars"?"active":""} onClick={() => handleClick("circulars")}>Circulars</Link>
          <Link to="/result" className={activePage==="result"?"active":""} onClick={() => handleClick("result")}>Result</Link>
          <Link to="/lms" className={activePage==="lms"?"active":""} onClick={() => handleClick("lms")}>LMS</Link>
          <Link to="/fees" className={activePage==="fees"?"active":""} onClick={() => handleClick("fees")}>Fees</Link>
          <Link to="/requests" className={activePage==="requests"?"active":""} onClick={() => handleClick("requests")}>Service Request</Link>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
