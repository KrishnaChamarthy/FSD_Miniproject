import React from 'react'
import "./FacultyDashboardLeftbar.css"
import Profile_icon from "../../../assets/Dashboard/boy.png"
import Calendar from '../../../Components/Calendar/Calendar'

const FacultyDashboardLeftbar = () => {
  return (
    <div className='faculty-dashboard-sidebar'>
      <div className="dashboard-profile">
        <img src={Profile_icon} alt="" />
        <div className="name">Faculty</div>
        <div className="info">School of Computer Engineering</div>
        <div className="prn">1234567890</div>
      </div>
      <Calendar />
      <div className="schedule">
        <header>
          <p className="schedule-title">Schedule</p>
          <p className="see-all">See All</p>
        </header>
        <div className="schedule-item">
          <div className="schedule-date">
            18
          </div>
          <div className="schedule-divider"></div>
          <div className="schedule-info">
            <div className="info-header">
              <p className="title">Full Stack Development</p>
              <p className="time">8:30 - 9:30</p>
            </div>
            <p className="info-content">Unit 3 out of 5</p>
          </div>
        </div>
        <div className="schedule-item later">
          <div className="schedule-date">
            19
          </div>
          <div className="schedule-divider"></div>
          <div className="schedule-info">
            <div className="info-header">
              <p className="title">Data Engineering</p>
              <p className="time">8:30 - 9:30</p>
            </div>
            <p className="info-content">Unit 3 out of 5</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FacultyDashboardLeftbar