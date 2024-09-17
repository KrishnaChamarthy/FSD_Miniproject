import React, { useContext, useState, useEffect } from "react";
import "./FacultyAttendanceMain.css";
import studentLogo from "../../../assets/Faculty/graduated.png";
import presentLogo from "../../../assets/Faculty/import.png";
import absentLogo from "../../../assets/Faculty/sad-face.png";
import percentageLogo from "../../../assets/Faculty/discount.png";
import { StoreContext } from "../../../context/StoreContext";
import axios from "axios";

const FacultyAttendanceMain = () => {
  const getCurrentDateFormatted = () => {
    let currentDate = new Date();

    if (currentDate.getDay() === 6) {
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (currentDate.getDay() === 0) {
      currentDate.setDate(currentDate.getDate() - 2);
    }

    return `${currentDate.toLocaleDateString("en-US", {
      day: "2-digit",
    })}/${currentDate.toLocaleDateString("en-US", {
      month: "2-digit",
    })}/${currentDate.toLocaleDateString("en-US", {
      year: "2-digit",
    })} | ${currentDate.toLocaleDateString("en-US", { weekday: "long" })} `;
  };

  const [date, setDate] = useState(getCurrentDateFormatted());
  const [openDateDropdown, setOpenDateDropdown] = useState(false);
  const [course, setCourse] = useState("Select Course");
  const [openCourseDropdown, setOpenCourseDropdown] = useState(false);
  const [students, setStudents] = useState([]); // State to store students for selected course
  const [attendance, setAttendance] = useState({});
  const { timetable, courseInfo, url } = useContext(StoreContext);

  const getDayFromDate = (dateStr) => {
    const dateParts = dateStr.split(" | ");
    if (dateParts.length > 1) {
      return dateParts[1].trim();
    }
    return "";
  };

  const handleOpenDateDropdown = () => {
    setOpenDateDropdown(!openDateDropdown);
  };

  const handleDateClick = (selectedDate) => {
    setDate(selectedDate);
    setOpenDateDropdown(false);
    setCourse("Select Course");
    setAttendance({}); // Reset the attendance state
  };

  const handleOpenCourseDropdown = () => {
    setOpenCourseDropdown(!openCourseDropdown);
  };
  const handleCourseClick = (selectedCourse) => {
    setCourse(selectedCourse);
    setOpenCourseDropdown(false);
    setAttendance({}); // Reset the attendance state
    fetchStudents(selectedCourse);
    fetchAttendanceForDate(date); // Fetch attendance when course is selected
  };

  const handleAttendanceChange = (student_PRN, status) => {
    setAttendance((prevState) => ({
      ...prevState,
      [student_PRN]: status, // Update attendance for the student
    }));
  };

  // Function to generate options for date dropdown
  const generateDateOptions = () => {
    const options = [];
    let currentDate = new Date();

    while (options.length < 20) {
      const dayOfWeek = currentDate.getDay();

      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        const formattedDate = `${currentDate.toLocaleDateString("en-US", {
          day: "2-digit",
        })}/${currentDate.toLocaleDateString("en-US", {
          month: "2-digit",
        })}/${currentDate.toLocaleDateString("en-US", {
          year: "2-digit",
        })} | ${currentDate.toLocaleDateString("en-US", { weekday: "long" })}`;
        options.push(
          <li
            key={formattedDate}
            onClick={() => handleDateClick(formattedDate)}
          >
            {formattedDate}
          </li>
        );
      }

      currentDate.setDate(currentDate.getDate() - 1);
    }

    return options;
  };

  // Function to generate options for course dropdown
  const generateCourseOptions = () => {
    const selectedDayFull = getDayFromDate(date);
    const filteredCourses = [];
    for (const entry of timetable) {
      if (
        entry.day_of_week === selectedDayFull &&
        entry.course_code !== "BREAK"
      ) {
        filteredCourses.push(entry);
      }
    }

    return filteredCourses.length > 0 ? (
      filteredCourses.map((entry) => (
        <li
          key={entry.course_code}
          onClick={() => handleCourseClick(entry.course_code)}
        >
          {entry.course_code}
        </li>
      ))
    ) : (
      <li>No courses available</li>
    );
  };

  // Function to fetch students based on the selected course from courseInfo
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

  const handleSubmit = async () => {
    const selectedCourse = courseInfo.find(
      (courseObj) => courseObj._id === course
    );
    const type = "T"; // Determine if it's theory or practical

    // Extract the date part (ignoring the weekday) and split it into day, month, year
    const dateParts = date.split(" | ")[0].split("/");
    const day = dateParts[0];
    const month = dateParts[1] - 1; // Month is 0-indexed in JavaScript Date
    const year = `20${dateParts[2]}`; // Convert 'YY' to '20YY' for the full year

    // Create a date object using the correct day, month, and year
    // Set hours, minutes, seconds, and milliseconds to 0 to avoid time zone issues
    const localDate = new Date(year, month, day);

    // Adjust for the local time zone if needed
    const offset = localDate.getTimezoneOffset(); // Get timezone offset in minutes
    const adjustedDate = new Date(localDate.getTime() - offset * 60 * 1000);

    // Convert to a local date string or use as needed
    const formattedDate = adjustedDate.toISOString(); // Format as YYYY-MM-DD

    for (const student_PRN in attendance) {
      const status = attendance[student_PRN]; // Get the attendance status (Present/Absent)
      try {
        await axios.post(`${url}/api/attendance/add`, {
          student_PRN,
          course_code: course,
          date: formattedDate, // Send the adjusted date
          status,
          type,
        });
      } catch (error) {
        console.error("Failed to submit attendance:", error);
      }
    }

    alert("Attendance submitted successfully!");
  };

  const calculateAttendanceCounts = () => {
    let presentCount = 0;
    let absentCount = 0;

    for (const student_PRN in attendance) {
      if (attendance[student_PRN] === "Present") {
        presentCount++;
      } else if (attendance[student_PRN] === "Absent") {
        absentCount++;
      }
    }

    return { presentCount, absentCount };
  };

  const fetchAttendanceForDate = async (selectedDate) => {
    const formattedDate = new Date(
      selectedDate.split(" | ")[0]
    ).toLocaleDateString("en-US");
    const updatedAttendance = {};

    for (const student of students) {
      try {
        const response = await axios.get(`${url}/api/attendance/info`, {
          params: {
            student_PRN: student.student_PRN,
          },
        });

        // Filter the response to get attendance for the specific course and date
        const attendanceData = response.data.data.find(
          (entry) =>
            entry.course_code === course &&
            new Date(entry.date).toISOString().split("T")[0] === formattedDate
        );

        // Update attendance state with fetched data
        if (attendanceData) {
          updatedAttendance[student.student_PRN] = attendanceData.status;
        } else {
          updatedAttendance[student.student_PRN] = "Absent"; // Default to Absent if no record found
        }
        console.log(updatedAttendance);
      } catch (error) {
        console.error(
          "Failed to fetch attendance for student:",
          student.student_PRN,
          error
        );
      }
    }

    setAttendance(updatedAttendance);
  };

  const { presentCount, absentCount } = calculateAttendanceCounts();

  return (
    <div className="faculty-attendance-container">
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
            <i className="bx bx-user"></i>
            {students.length}
          </div>
        </div>
        <div className="faculty-attendance-element present-students">
          <div className="element-title">Present Today</div>
          <div className="content">
            <i className="bx bxs-user-check"></i>
            {presentCount}
          </div>
        </div>
        <div className="faculty-attendance-element absent-students">
          <div className="element-title">Absent Today</div>
          <div className="content">
            <i className="bx bxs-user-x"></i>
            {absentCount}
          </div>
        </div>
        <div className="faculty-attendance-element precentage-students">
          <div className="element-title">Percentage</div>
          <div className="content">
            <i className="bx bx-objects-vertical-bottom"></i>
            {students.length > 0
              ? Math.round((presentCount / students.length) * 100)
              : 0}
            %
          </div>
        </div>
        <div className="faculty-attendance-element set-attendance">
          <div className="element-title-course">
            Set Attendance
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
                  {generateCourseOptions()}
                </ul>
              </div>
              <div className="semester-dropdown">
                <div className="select" onClick={handleOpenDateDropdown}>
                  <span className="selected">{date}</span>
                  <div
                    className={
                      openDateDropdown ? "caret caret-rotate" : "caret"
                    }
                  ></div>
                </div>
                <ul className={openDateDropdown ? "menu menu-open" : "menu"}>
                  {generateDateOptions()}
                </ul>
              </div>
            </div>
          </div>
          <table className="faculty-attendance-table">
            <thead>
              <tr>
                <th>Student PRN</th>
                <th>Student Name</th>
                <th>Course</th>
                <th>Type</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <tr key={student.student_PRN}>
                    <td>{student.student_PRN}</td>
                    <td>{student.first_name + " " + student.last_name}</td>
                    <td>{course}</td>
                    <td>Theory</td>
                    <td>
                      <div className="attendance-options">
                      <div
                        className={`attendance-option attendance-present ${
                          attendance[student.student_PRN] === "Present"
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          handleAttendanceChange(student.student_PRN, "Present")
                        }
                      >
                        P
                      </div>
                      <div
                        className={`attendance-option attendance-absent ${
                          attendance[student.student_PRN] === "Absent"
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          handleAttendanceChange(student.student_PRN, "Absent")
                        }
                      >
                        A
                      </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No students available for this course</td>
                </tr>
              )}
            </tbody>
          </table>
          <button onClick={handleSubmit} className="submit-button">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacultyAttendanceMain;
