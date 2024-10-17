import React, { useContext, useState } from "react";
import "./FacultyGradebookMain.css";
import { StoreContext } from "../../../context/StoreContext";

const FacultyGradebookMain = () => {
  const [openCourseDropdown, setOpenCourseDropdown] = useState(false);
  const [course, setCourse] = useState("Select Course");
  const [openSemesterDropdown, setOpenSemesterDropdown] = useState(false);
  const [semester, setSemester] = useState("Select Semester");

  const {courseInfo, url, fetchSemesterCourses} = useContext(StoreContext);


  const handleOpenCourseDropdown = () => {
    setOpenCourseDropdown(!openCourseDropdown);
    console.log(fetchSemesterCourses("5"));
    
  };
  const handleOpenSemesterDropdown = () => {
    setOpenSemesterDropdown(!openSemesterDropdown);
  };

  const fetchStudents = (selectedCourse) => {
    const selectedCourseInfo = courseInfo.find(
      (course) => course._id === selectedCourse
    );

    if (selectedCourseInfo) {
      setStudents(selectedCourseInfo.students);
    } else {
      setStudents([]);
    }
  };

  return (
    <div className="faculty-gradebook-container">
      <header>
        <div className="header-text">
          Assign Marks
          <br />
          <span>Assign Marks Of Your Class.</span>
        </div>
        <div className="header-search">
          <i className="bx bx-search"></i>
          <input type="text" placeholder="Search anything..." />
        </div>
        <div className="header-bell">
          <i className="bx bx-bell"></i>
        </div>
      </header>
      <div className="faculty-gradebook-body">
        <div className="faculty-gradebook-element total-students">
          <div className="element-title">Total Students</div>
          <div className="content">
            <i className="bx bx-user"></i>0
          </div>
        </div>
        <div className="faculty-gradebook-element present-students">
          <div className="element-title">Marks Assigned</div>
          <div className="content">
            <i className="bx bxs-user-check"></i>0
          </div>
        </div>
        <div className="faculty-gradebook-element absent-students">
          <div className="element-title">Pending Entries</div>
          <div className="content">
            <i className="bx bxs-user-x"></i>0
          </div>
        </div>
        <div className="faculty-gradebook-element precentage-students">
          <div className="element-title">Class Average</div>
          <div className="content">
            <i className="bx bx-objects-vertical-bottom"></i>0
          </div>
        </div>
        <div className="faculty-gradebook-element set-marks">
          <div className="element-title-course">
            Set Marks
            <div className="dropdowns">
              <div className="semester-dropdown">
                <div className="select" onClick={handleOpenCourseDropdown}>
                  <span className="selected">{course}</span>
                  <div
                    className={
                      openCourseDropdown ? "caret caret-rotate" : "caret"
                    }
                  ></div>
                </div>
                <ul className={openCourseDropdown ? "menu menu-open" : "menu"}>
                    <li>Test</li>
                </ul>
              </div>
              <div className="semester-dropdown">
                <div className="select" onClick={handleOpenSemesterDropdown}>
                  <span className="selected">{semester}</span>
                  <div
                    className={
                      openSemesterDropdown ? "caret caret-rotate" : "caret"
                    }
                  ></div>
                </div>
                <ul className={openSemesterDropdown ? "menu menu-open" : "menu"}>
                    <li>Test</li>
                </ul>
              </div>
            </div>
          </div>
          <table className="faculty-gradebook-table">
          <thead>
              <tr>
                <th>Student PRN</th>
                <th>Student Name</th>
                <th>Course</th>
                <th>Internal Marks</th>
                <th>External Marks</th>
              </tr>
            </thead>
          </table>
          <button className="submit-button">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacultyGradebookMain;
