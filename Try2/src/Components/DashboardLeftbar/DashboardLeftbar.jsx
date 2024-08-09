import React from 'react'
import Profile_icon from "../../assets/Dashboard/boy.png"
import "./DashboardLeftbar.css"

const DashboardLeftbar = () => {
  return (
    <div className='dashboard-leftbar'>
      <div className="profile">
        <img src={Profile_icon} alt="" />
        <div className="name">
          Krishna Chamarthy
        </div>
        <div className="info">
          Computer Science | 5th Semister
        </div>
        <div className="prn">
          1032221617
        </div>
      </div>
      <div className="dashboard-calender"></div>
    </div>
  )
}

export default DashboardLeftbar