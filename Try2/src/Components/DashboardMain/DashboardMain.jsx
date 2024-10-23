import React, { useContext, useEffect, useState } from "react";
import "./DashboardMain.css";
import Attendance_icon from "../../assets/Dashboard/attendance.png";
import Subject_icon from "../../assets/Dashboard/subject.png";
import Task_icon from "../../assets/Dashboard/task.png";
import Cloud_img from "../../assets/Dashboard/cloud.png"
import { StoreContext } from "../../context/StoreContext";

const DashboardMain = () => {
  const [semester, setSemester] = useState("5th Semester");
  const [openSemesterDropdown, setOpenSemesterDropdown] = useState(false);
  const [cgpa, setCgpa] = useState(0);

  const {attendanceData = {}, studentCourses, circularsList, studentMarks, studentData} = useContext(StoreContext);

  const handleOpenDropdown = () => {
    setOpenSemesterDropdown(!openSemesterDropdown);
  };

  const handleClick = (sem) => {
    setSemester(sem);
    setOpenSemesterDropdown(!openSemesterDropdown);
  };

  const getSemesterMarks = (sem) => { 
    const semNumber = String(sem).replace(/\D/g, "");
   
    return studentMarks.filter((mark) => mark.semester === semNumber);
  };

  const calculateGPA = (semesterMarks) => {
    let totalMarks = 0;
    let totalSubjects = semesterMarks.length;

    semesterMarks.forEach((mark) => {
      const subjectTotal = mark.internalMarks + mark.externalMarks;
      totalMarks += subjectTotal;
    });

    let averageMarks = totalMarks / totalSubjects;

    let gpa = (averageMarks / 100) * 10;

    return gpa.toFixed(2);
  }

  useEffect(() => {
    calculateCGPA();
  }, [semester])

  const calculateCGPA = () => {
    const semNumber = parseInt(semester.replace(/\D/g, ""), 10);
    
    let CGPA = 0;
  
    for (let i = 1; i <= semNumber; i++) {
      const g = calculateGPA(getSemesterMarks(i));
      
      if (!isNaN(parseFloat(g))) {
        CGPA += parseFloat(g);
      }
    }
  
    setCgpa((CGPA / semNumber).toFixed(2));
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
          <i className="bx bx-bell"></i>
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
              <p className="amount">
                <span>{attendanceData.presentClasses || 0}</span> / {attendanceData.totalClasses || 0}
                <span className="percentage">{attendanceData.percentage || 0}%</span>

              </p>
              <p>Great, you always attend class, keep it up!</p>
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
                <span className="percentage">80%</span>
              </p>
              <p>Don't forget to turn in your work</p>


            </div>
          </div>
          <div className="summary-divider"></div>
          <div className="content-part">
            <div className="content-image">
              <img src={Subject_icon} alt="" />
            </div>
            <div className="content-body">
              <p className="title">Subject</p>
              <p className="amount">
                <span>{studentCourses.length}</span> / 7
                <span className="percentage">{Math.round((studentCourses.length / 7) * 100)}%</span>

              </p>
              <p>You have taken 12 subjects this semester</p>
            </div>
          </div>
        </div>
        <div className="dashboard-content">
            <div className="circular-container-dashboard">
                <header>
                  Circulars/Notices
                </header>
                <ul>
                  {circularsList.map((circular) => (
                    <li>
                    <div className="circular-title-dashboard">
                      {circular.subject}
                    </div>
                    <div className="circular-date-dashboard">
                    {new Date(circular.dateIssued).toLocaleDateString()}
                    </div>
                  </li>
                  ))}
                </ul>
            </div> 
            <div className="gpa-container">
                <header>
                  <p>GPA <br />
                  <span>Grade Point Average</span></p> 
                </header>
                <div className="gpa">{cgpa}</div>
                <p>Top 10 students in campus</p>
                <img src={Cloud_img} alt="" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
