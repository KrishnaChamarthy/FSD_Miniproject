import React, { useContext, useState, useEffect } from "react";
import "./FacultyGradebookMain.css";
import { StoreContext } from "../../../context/StoreContext";
import axios from "axios";

const FacultyGradebookMain = () => {
  const [openCourseDropdown, setOpenCourseDropdown] = useState(false);
  const [course, setCourse] = useState("Select Course");
  const [openSemesterDropdown, setOpenSemesterDropdown] = useState(false);
  const [semester, setSemester] = useState("Select Semester");
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});

  const { courseInfo, url, allCourses, facultyCourses } =
    useContext(StoreContext);

  const [totalStudents, setTotalStudents] = useState(0);
  const [marksAssigned, setMarksAssigned] = useState(0);
  const [pendingEntries, setPendingEntries] = useState(0);
  const [classAverage, setClassAverage] = useState(0);

  useEffect(() => {
    updateStats();
  }, [students, marks]);

  const handleOpenCourseDropdown = () => {
    setOpenCourseDropdown(!openCourseDropdown);
  };

  const handleOpenSemesterDropdown = () => {
    setOpenSemesterDropdown(!openSemesterDropdown);
  };

  const getSemesterCourses = (sem) => {
    return allCourses.filter((course) => course.semester === sem);
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

  const handleMarksChange = (studentPRN, field, value) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [studentPRN]: {
        ...prevMarks[studentPRN],
        [field]: value,
      },
    }));
  };

  const updateStats = () => {
    setTotalStudents(students.length);

    const assigned = students.filter(
      (student) =>
        marks[student.student_PRN]?.internal !== undefined &&
        marks[student.student_PRN]?.external !== undefined
    ).length;
    setMarksAssigned(assigned);

    setPendingEntries(totalStudents - assigned);

    const totalMarks = students.reduce((sum, student) => {
      const internal = parseFloat(marks[student.student_PRN]?.internal || 0);
      const external = parseFloat(marks[student.student_PRN]?.external || 0);
      return sum + internal + external;
    }, 0);

    const average = students.length > 0 ? totalMarks / students.length : 0;
    setClassAverage(average.toFixed(2));
  };
  const handleSubmit = async () => {
    try {
      const payload = students.map((student) => ({
        student_PRN: student.student_PRN,
        course_code: course,
        semester: String(semester),
        internalMarks: parseFloat(marks[student.student_PRN]?.internal) || 0,
        externalMarks: parseFloat(marks[student.student_PRN]?.external) || 0,
      }));

      await axios.post(`${url}/api/marks/add`, payload);
    } catch (error) {
      console.error("Error submitting marks:", error);
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
            <i className="bx bx-user"></i> {totalStudents}
          </div>
        </div>
        <div className="faculty-gradebook-element present-students">
          <div className="element-title">Marks Assigned</div>
          <div className="content">
            <i className="bx bxs-user-check"></i> {marksAssigned}
          </div>
        </div>
        <div className="faculty-gradebook-element absent-students">
          <div className="element-title">Pending Entries</div>
          <div className="content">
            <i className="bx bxs-user-x"></i> {pendingEntries}
          </div>
        </div>
        <div className="faculty-gradebook-element percentage-students">
          <div className="element-title">Class Average</div>
          <div className="content">
            <i className="bx bx-objects-vertical-bottom"></i> {classAverage}
          </div>
        </div>
        <div className="faculty-gradebook-element set-marks">
          <div className="element-title-course">
            Set Marks
            <div className="dropdowns">
              <div className="semester-dropdown">
                <div className="select" onClick={handleOpenSemesterDropdown}>
                  <span className="selected">{semester}</span>
                  <div
                    className={
                      openSemesterDropdown ? "caret caret-rotate" : "caret"
                    }
                  ></div>
                </div>
                <ul
                  className={openSemesterDropdown ? "menu menu-open" : "menu"}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <li
                      key={sem}
                      onClick={() => {
                        setSemester(sem);
                        setCourse("Select Course");
                        setStudents([]);
                        handleOpenSemesterDropdown();
                      }}
                    >
                      Semester {sem}
                    </li>
                  ))}
                </ul>
              </div>
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
                  {getSemesterCourses(semester).map((course) => (
                    <li
                      key={course._id}
                      onClick={() => {
                        setCourse(course.course_code);
                        fetchStudents(course.course_code);
                        console.log(students);
                        handleOpenCourseDropdown();
                      }}
                    >
                      {course.course_code}
                    </li>
                  ))}
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
            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <tr key={student.student_PRN}>
                    <td>{student.student_PRN}</td>
                    <td>{student.first_name + " " + student.last_name}</td>
                    <td>{course}</td>
                    <td>
                      <input
                        type="number"
                        value={marks[student.student_PRN]?.internal || ""}
                        onChange={(e) =>
                          handleMarksChange(
                            student.student_PRN,
                            "internal",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={marks[student.student_PRN]?.external || ""}
                        onChange={(e) =>
                          handleMarksChange(
                            student.student_PRN,
                            "external",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No students available for this course</td>
                </tr>
              )}
            </tbody>
          </table>
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacultyGradebookMain;
