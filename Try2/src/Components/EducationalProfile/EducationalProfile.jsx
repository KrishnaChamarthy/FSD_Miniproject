import React, { useState } from 'react'
import "./EducationalProfile.css"

const EducationalProfile = () => {
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
    <div className='educational-profile'>
      <div className="educational-profile-element academic-info">
        <div className="element-title">Current Academic Program</div>
          <ul className="element-content">
                <li>
                    <div className="element-field">
                        Program
                    </div>
                    <div className="element-value">
                        B.Tech Computer Science and Engineering
                    </div>
                    <div className="element-field">
                        Major
                    </div>
                    <div className="element-value">
                        N/A
                    </div>
                </li>
                <li>
                    <div className="element-field">
                        Acedemic Year
                    </div>
                    <div className="element-value">
                        2024/25
                    </div>
                    <div className="element-field">
                        Term
                    </div>
                    <div className="element-value">
                        Semester 5
                    </div>
                </li>
                <li>
                    <div className="element-field">
                        Enrollment Date
                    </div>
                    <div className="element-value">
                        29/08/2022
                    </div>
                    <div className="element-field">
                        Expected Graduation Year
                    </div>
                    <div className="element-value">
                        2026
                    </div>
                </li>
          </ul>
      </div>
      <div className="educational-profile-element performance-info">
        <div className="element-title">Academic Performance</div>
          <ul className="element-content">
                <li>
                    <div className="element-field">
                        Current CGPA
                    </div>
                    <div className="element-value">
                        3.9
                    </div>
                </li>
                <li>
                    <div className="element-field">
                        Class Rank
                    </div>
                    <div className="element-value">
                        2nd
                    </div>
                </li>
                <li>
                    <div className="element-field">
                        Academic Standing
                    </div>
                    <div className="element-value">
                        7th
                    </div>
                </li>
          </ul>
      </div>
      <div className="educational-profile-element course-info">
        <div className="element-title-course">
          Course Enrollment
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
        </div>
          <table className='course-table'>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Credits</th>
              <th>Hours Per Week</th>
              <th>Faculty</th>
            </tr>
            <tr>
              <td>CET2007B</td>
              <td>Artificial Intelligence and Expert Systems</td>
              <td>4</td>
              <td>5</td>
              <td>Teacher</td>
            </tr>
            <tr>
              <td>CET4003B</td>
              <td>Computer Graphics and 3D Modelling</td>
              <td>4</td>
              <td>5</td>
              <td>Teacher</td>
            </tr>
            <tr>
              <td>CET3005B</td>
              <td>Data Engineering</td>
              <td>1</td>
              <td>4</td>
              <td>Teacher</td>
            </tr>
            <tr>
              <td>CET3003B</td>
              <td>Full Stack Development</td>
              <td>2</td>
              <td>4</td>
              <td>Teacher</td>
            </tr>
            <tr>
              <td>CET3004B</td>
              <td>Information and Cyber Security</td>
              <td>4</td>
              <td>5</td>
              <td>Teacher</td>
            </tr>
          </table>
      </div>
    </div>
  )
}

export default EducationalProfile