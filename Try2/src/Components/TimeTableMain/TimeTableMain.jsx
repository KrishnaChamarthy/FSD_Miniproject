import React from 'react'
import "./TimeTableMain.css"

const TimeTableMain = () => {
  return (
    <div className='timetable-container'>
        <header>
        <div className="header-text">
          Timetable
          <br />
          <span>View Your Timetable.</span>
        </div>
        <div className="header-search">
          <i className="bx bx-search"></i>
          <input type="text" placeholder="Search anything..." />
        </div>
        <div className="header-bell">
          <i className="bx bx-bell"></i>
        </div>
      </header>
    </div>
  )
}

export default TimeTableMain