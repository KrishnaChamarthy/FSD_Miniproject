import React, { useState } from 'react'
import "./TimeTableMain.css"
import DaySchedule from "../DaySchedule/DaySchedule"
import WeekSchedule from "../WeekSchedule/WeekSchedule"

const TimeTableMain = () => {

  const [schedularType, setSchedularType] = useState("Day");

  const handleSchedularChange = (type) => {
    setSchedularType(type);
  }

  const handleSchedularRender = () => {
    if (schedularType === "Day"){
      return <DaySchedule />
    }
    else{
      return <WeekSchedule />
    }
  }

  return (
    <div className='timetable-container'>
        <header>
        <div className="header-text">
          Academic Timetable
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
      <div className="timetable-body">
        <div className="timetable-element interactive-timetable">
          <div className="element-title schedular-title">
            TimeTable
            <div className="schedular-type-options">
            <button onClick={() => handleSchedularChange("Day")}>Day</button>
              <button onClick={() => handleSchedularChange("Week")}>Week</button>
            </div>
          </div>
          {handleSchedularRender()}
        </div>
      </div>
    </div>
  )
}

export default TimeTableMain