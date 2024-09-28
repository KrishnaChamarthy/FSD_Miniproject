import React, { useContext, useState } from 'react'
import "./FacultyEducationalProfile.css"
import { StoreContext } from '../../../context/StoreContext'

const FacultyEducationalProfile = () => {

  const [year, setYear] = useState("2023");
  const [openYearDropdown, setOpenYearDropdown] = useState(false);

  const {facultyData, facultyCourses} = useContext(StoreContext);
  const handleOpenDropdown = () => {
    setOpenYearDropdown(!openYearDropdown);
  };

  const handleClick = (sem) => {
    setYear(sem);
    setOpenYearDropdown(!openYearDropdown);
  };

  const filteredCourses = facultyCourses.filter((course) => {
    const courseYearNumber = String(course.year || ""); 
    return courseYearNumber === year;
  });

  return (
    <div className='educational-profile'>
    <div className="educational-profile-element academic-info">
      <div className="element-title">Educational Qualifications</div>
      <ul className="element-content">
        <li>
          <div className="element-field">Highest Degree</div>
          <div className="element-value">{facultyData.program_enrolled || "-"}</div>
          <div className="element-field">Field of Study</div>
          <div className="element-value">{facultyData.major || "-"}</div>
        </li>
        <li>
          <div className="element-field">Current Position</div>
          <div className="element-value">{facultyData.ac_year || "-"}</div>
          <div className="element-field">Years of Experience</div>
          <div className="element-value">{facultyData.year || "-"}</div>
        </li>
        <li>
          <div className="element-field">Teaching Areas of Expertise</div>
          <div className="element-value">{facultyData.enroll_date || "-"}</div>
          <div className="element-field">Professional Awards</div>
          <div className="element-value">{facultyData.grad_year || "-"}</div>
        </li>
      </ul>
    </div>
    <div className="educational-profile-element performance-info">
      <div className="element-title">Professional Experince</div>
      <ul className="element-content">
        <li>
          <div className="element-field">Previous Institutions</div>
          <div className="element-value">3.9</div>
        </li>
        <li>
          <div className="element-field">Research and Publications</div>
          <div className="element-value">2nd</div>
        </li>
        <li>
          <div className="element-field">Workshops and Training Conducted</div>
          <div className="element-value">7th</div>
        </li>
      </ul>
    </div>
    <div className="educational-profile-element course-info">
      <div className="element-title-course">
        Courses Taught
        <div className="semester-dropdown">
          <div className="select" onClick={handleOpenDropdown}>
            <span className="selected">{year}</span>
            <div className={openYearDropdown ? "caret caret-rotate" : "caret"}></div>
          </div>
          <ul className={openYearDropdown ? "menu menu-open" : "menu"}>
            <li onClick={() => handleClick("2024")}>2024</li>
            <li onClick={() => handleClick("2023")}>2023</li>
            <li onClick={() => handleClick("2022")}>2022</li>
            <li onClick={() => handleClick("2021")}>2021</li>
            <li onClick={() => handleClick("2020")}>2020</li>
          </ul>
        </div>
      </div>
      <table className='course-table'>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Credits</th>
            <th>Hours Per Week</th>
            <th>Faculty</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map((course, index) => (
            <tr key={index}>
              <td>{course.course_code}</td>
              <td>{course.course_name}</td>
              <td>{course.credits}</td>
              <td>5</td>
              <td>Teacher</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default FacultyEducationalProfile