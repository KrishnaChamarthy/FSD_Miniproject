import React, { useState } from "react";
import "./FacultyDashboardMain.css";
import Attendance_icon from "../../../assets/Dashboard/attendance.png";
import Subject_icon from "../../../assets/Dashboard/subject.png";
import Task_icon from "../../../assets/Dashboard/task.png";
import Cloud_img from "../../../assets/Dashboard/cloud.png";

const FacultyDashboardMain = () => {
  const [course, setCourse] = useState("5th Course");
  const [openCourseDropdown, setOpenCourseDropdown] = useState(false);

  const handleOpenDropdown = () => {
    setOpenCourseDropdown(!openCourseDropdown);
  };

  const handleClick = (sem) => {
    setCourse(sem);
    setOpenCourseDropdown(!openCourseDropdown);
  };

  return (
    <div className="faculty-dashboard-container">
      <header>
        <div className="header-text">
          Hello Faculty👋
          <br />
          <span>Let's do some productive activities today.</span>
        </div>
        <div className="header-search">
          <i className="bx bx-search"></i>
          <input type="text" placeholder="Search anything..." />
        </div>
        <div className="header-bell">
          <i className="bx bx-bell"></i>
        </div>
      </header>
      <div className="faculty-dashboard-body">
        <header>
          <p>Summary Report</p>
          <div className="semester-dropdown">
            <div className="select" onClick={handleOpenDropdown}>
              <span className="selected">{course}</span>
              <div
                className={
                  openCourseDropdown ? "caret caret-rotate" : "caret"
                }
              ></div>
            </div>
            <ul className={openCourseDropdown ? "menu menu-open" : "menu"}>
              <li
                onClick={() => {
                  handleClick("1st Course");
                }}
              >
                1st Course
              </li>
              <li
                onClick={() => {
                  handleClick("2nd Course");
                }}
              >
                2nd Course
              </li>
              <li
                onClick={() => {
                  handleClick("3rd Course");
                }}
              >
                3rd Course
              </li>
              <li
                onClick={() => {
                  handleClick("4th Course");
                }}
              >
                4th Course
              </li>
              <li
                onClick={() => {
                  handleClick("5th Course");
                }}
              >
                5th Course
              </li>
            </ul>
          </div>
        </header>
        <div className="summary-content">
          <div className="content-part">
            <div className="content-image">
              <img src={Attendance_icon} alt="" />
            </div>
            <div className="content-body">
              <p className="title">Students Present</p>
              <p className="amount">
                <span>40</span> / 50<span className="percentage">80%</span>
              </p>
              <p>Students often attend your classes!</p>
            </div>
          </div>
          <div className="summary-divider"></div>
          <div className="content-part">
            <div className="content-image">
              <img src={Task_icon} alt="" />
            </div>

            <div className="content-body">
              <p className="title">Tasks Left</p>
              <p className="amount">
                <span>134</span> / 140
                <span className="percentage">80%</span>
              </p>
              <p>Finish grading assignments</p>
            </div>
          </div>
          <div className="summary-divider"></div>
          <div className="content-part">
            <div className="content-image">
              <img src={Subject_icon} alt="" />
            </div>
            <div className="content-body">
              <p className="title">Courses</p>
              <p className="amount">
                <span>3</span> / 7<span className="percentage">0%</span>
              </p>
              <p>You teach a lot of courses!</p>
            </div>
          </div>
        </div>
        <div className="dashboard-content">
          <div className="circular-container">
            <header>Circulars/Notices</header>
            <ul></ul>
          </div>
          <div className="gpa-container">
            <header>
              <p>
                GPA <br />
                <span>Grade Point Average</span>
              </p>
            </header>
            <div className="gpa">3.93</div>
            <p>Top 10 students in campus</p>
            <img src={Cloud_img} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboardMain;
