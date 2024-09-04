import React, { useContext, useState } from 'react';
import "./EducationalProfile.css";
import { StoreContext } from '../../context/StoreContext';

const EducationalProfile = () => {
  const [semester, setSemester] = useState("5th Semester");
  const [openSemesterDropdown, setOpenSemesterDropdown] = useState(false);

  const { studentData, studentCourses } = useContext(StoreContext);

  const handleOpenDropdown = () => {
    setOpenSemesterDropdown(!openSemesterDropdown);
  };

  const handleClick = (sem) => {
    setSemester(sem);
    setOpenSemesterDropdown(!openSemesterDropdown);
  };

  const selectedSemesterNumber = semester.split(' ')[0]; 
  
  const filteredCourses = studentCourses.filter((course) => {
    const courseSemesterNumber = String(course.semester || ""); 
    return courseSemesterNumber === selectedSemesterNumber[0];
  });
  
  return (
    <div className='educational-profile'>
      <div className="educational-profile-element academic-info">
        <div className="element-title">Current Academic Program</div>
        <ul className="element-content">
          <li>
            <div className="element-field">Program</div>
            <div className="element-value">{studentData.program_enrolled || "-"}</div>
            <div className="element-field">Major</div>
            <div className="element-value">{studentData.major || "-"}</div>
          </li>
          <li>
            <div className="element-field">Academic Year</div>
            <div className="element-value">{studentData.ac_year || "-"}</div>
            <div className="element-field">Term</div>
            <div className="element-value">{studentData.semester || "-"}</div>
          </li>
          <li>
            <div className="element-field">Enrollment Date</div>
            <div className="element-value">{studentData.enroll_date || "-"}</div>
            <div className="element-field">Expected Graduation Year</div>
            <div className="element-value">{studentData.grad_year || "-"}</div>
          </li>
        </ul>
      </div>
      <div className="educational-profile-element performance-info">
        <div className="element-title">Academic Performance</div>
        <ul className="element-content">
          <li>
            <div className="element-field">Current CGPA</div>
            <div className="element-value">3.9</div>
          </li>
          <li>
            <div className="element-field">Class Rank</div>
            <div className="element-value">2nd</div>
          </li>
          <li>
            <div className="element-field">Academic Standing</div>
            <div className="element-value">7th</div>
          </li>
        </ul>
      </div>
      <div className="educational-profile-element course-info">
        <div className="element-title-course">
          Course Enrollment
          <div className="semester-dropdown">
            <div className="select" onClick={handleOpenDropdown}>
              <span className="selected">{semester}</span>
              <div className={openSemesterDropdown ? "caret caret-rotate" : "caret"}></div>
            </div>
            <ul className={openSemesterDropdown ? "menu menu-open" : "menu"}>
              <li onClick={() => handleClick("1st Semester")}>1st Semester</li>
              <li onClick={() => handleClick("2nd Semester")}>2nd Semester</li>
              <li onClick={() => handleClick("3rd Semester")}>3rd Semester</li>
              <li onClick={() => handleClick("4th Semester")}>4th Semester</li>
              <li onClick={() => handleClick("5th Semester")}>5th Semester</li>
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
  );
};

export default EducationalProfile;
