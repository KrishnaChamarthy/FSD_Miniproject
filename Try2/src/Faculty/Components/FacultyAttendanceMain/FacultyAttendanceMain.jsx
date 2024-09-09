import React from 'react'
import "./FacultyAttendanceMain.css"
import studentLogo from "../../../assets/Faculty/graduated.png"
import presentLogo from "../../../assets/Faculty/import.png";
import absentLogo from "../../../assets/Faculty/sad-face.png";
import percentageLogo from "../../../assets/Faculty/discount.png";

const FacultyAttendanceMain = () => {
  return (
    <div className='faculty-attendance-container'>
        <header>
        <div className="header-text">
          Assign Attendance
          <br />
          <span>Assign Attendance Of Your Class.</span>
        </div>
        <div className="header-search">
          <i className="bx bx-search"></i>
          <input type="text" placeholder="Search anything..." />
        </div>
        <div className="header-bell">
          <i className="bx bx-bell"></i>
        </div>
      </header>
      <div className="faculty-attendance-body">
        <div className="faculty-attendance-element total-students">
            <div className="element-title">Total Students</div>
            <div className="content">
            <i class='bx bx-user' ></i>
                42
            </div>
        </div>
        <div className="faculty-attendance-element present-students">
            <div className="element-title">Present Today</div>
            <div className="content">
            <i class='bx bxs-user-check' ></i>
                42
            </div>
        </div>
        <div className="faculty-attendance-element absent-students">
            <div className="element-title">Absent Today</div>
            <div className="content">
            <i class='bx bxs-user-x'></i>                
            42
            </div>
        </div>
        <div className="faculty-attendance-element precentage-students">
            <div className="element-title">Percentage</div><div className="content">
            <i class='bx bx-objects-vertical-bottom' ></i>
                42
            </div>
        </div>
        <div className="faculty-attendance-element set-attendance">
        <div className="element-title">Set Attendance</div>

        </div>
      </div>
    </div>
  )
}

export default FacultyAttendanceMain