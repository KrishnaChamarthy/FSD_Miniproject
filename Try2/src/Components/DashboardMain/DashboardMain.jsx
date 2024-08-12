import React, { useState } from "react";
import "./DashboardMain.css";
import Attendance_icon from "../../assets/Dashboard/attendance.png";
import Subject_icon from "../../assets/Dashboard/subject.png";
import Task_icon from "../../assets/Dashboard/task.png";

const DashboardMain = () => {
  const [semester, setSemester] = useState("5th Semester");
  const [openSemesterDropdown, setOpenSemesterDropdown] = useState(false);

  const handleOpenDropdown = () => {
    setOpenSemesterDropdown(!openSemesterDropdown);
  };

  const handleClick = (sem) => {
    setSemester(sem);
    setOpenSemesterDropdown(!openSemesterDropdown);
  };

  return (
    <div className="dashboard-container">
      <header>
        <div className="header-text">
          Hello Krishna👋
          <br />
          <span>Let's do some productive activities today.</span>
        </div>
        <div className="header-search">
          <i className="bx bx-search"></i>
          <input type="text" placeholder="Search anything..." />
        </div>
        <div className="header-bell">
          <i class="bx bx-bell"></i>
        </div>
      </header>
      <div className="dashboard-body">
        <header>
          <p>Summary Report</p>
          <div className="semester-dropdown">
            <div className="select" onClick={handleOpenDropdown}>
              <span className="selected">{semester}</span>
              <div
                className={
                  openSemesterDropdown ? "caret caret-rotate" : "caret"
                }
              ></div>
            </div>
            <ul className={openSemesterDropdown ? "menu menu-open" : "menu"}>
              <li
                onClick={() => {
                  handleClick("1st Semester");
                }}
              >
                1st Semester
              </li>
              <li
                onClick={() => {
                  handleClick("2nd Semester");
                }}
              >
                2nd Semester
              </li>
              <li
                onClick={() => {
                  handleClick("3rd Semester");
                }}
              >
                3rd Semester
              </li>
              <li
                onClick={() => {
                  handleClick("4th Semester");
                }}
              >
                4th Semester
              </li>
              <li
                onClick={() => {
                  handleClick("5th Semester");
                }}
              >
                5th Semester
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
              <p className="title">Attendance</p>
              <p>
                <span>89</span> / 89
              </p>
              <p>Great, you always attend class, keep it up!</p>
              <div className="percentage">100%</div>

            </div>
          </div>
          <div className="summary-divider"></div>
          <div className="content-part">
            <div className="content-image">
              <img src={Task_icon} alt="" />
            </div>

            <div className="content-body">
              <p className="title">Task</p>
              <p className="amount">
                <span>134</span> / 140
              </p>
              <p>Don't forget to turn in your work</p>
              <div className="percentage">80%</div>

            </div>
          </div>
          <div className="summary-divider"></div>
          <div className="content-part">
            <div className="content-image">
              <img src={Subject_icon} alt="" />
            </div>
            <div className="content-body">
              <p className="title">Subject</p>
              <p>
                <span>12</span> / 15
              </p>
              <p>You have taken 12 subjects this semester</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
