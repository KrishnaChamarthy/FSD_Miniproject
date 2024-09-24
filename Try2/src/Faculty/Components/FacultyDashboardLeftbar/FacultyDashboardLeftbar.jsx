import React from 'react'
import "./FacultyDashboardLeftbar.css"
import Profile_icon from "../../../assets/Dashboard/boy.png"

const FacultyDashboardLeftbar = () => {
  return (
    <div className='faculty-dashboard-sidebar'>
      <div className="dashboard-profile">
        <img src={Profile_icon} alt="" />
        <div className="name">Faculty</div>
        <div className="info">School of Computer Engineering</div>
        <div className="prn">1234567890</div>
      </div>
      
      
    </div>
  )
}

export default FacultyDashboardLeftbar