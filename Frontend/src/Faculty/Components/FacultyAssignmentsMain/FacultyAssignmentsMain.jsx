import React, { useContext, useState } from "react";
import "./FacultyAssignmentsMain.css";
import { StoreContext } from "../../../context/StoreContext";
import FacultyAssignmnetsList from "../FacultyAssignmentsList/FacultyAssignmnetsList";
import FacultyAssignmentsCreate from "../FacultyAssignmentsCreate/FacultyAssignmentsCreate";
import FacultyAssignmentsView from "../FacultyAssignmentsView/FacultyAssignmentsView";

const FacultyAssignmentsMain = () => {
  const { assignments, facultyCourses } = useContext(StoreContext);

  const [assignment, setAssignment] = useState(null);
  const [activePage, setActivePage] = useState("list");

  const handlePageRender = () => {
    if (activePage === "list")
      return (
        <FacultyAssignmnetsList
          setActivePage={setActivePage}
          filteredAssignments={filteredAssignments}
          findCourseNameByCode={findCourseNameByCode}
          setAssignment={setAssignment}
        />
      );
    else if (activePage === "create")
      return <FacultyAssignmentsCreate setActivePage={setActivePage} />;
    else if (activePage === 'view') return <FacultyAssignmentsView assignment={assignment} setActivePage={setActivePage}/>
  };

  const facultyCourseCodes = new Set(
    facultyCourses.map((course) => course.course_code)
  );

  const filteredAssignments = assignments.filter((assignment) =>
    facultyCourseCodes.has(assignment.course_code)
  );

  const findCourseNameByCode = (course_code) => {
    const course = facultyCourses.find((course) => {
      return course.course_code === course_code;
    });

    return course ? course.course_name : "Course not found";
  };

  return (
    <div className="faculty-assignments-container">
      <header>
        <div className="header-text">
          Assign Assignments
          <br />
          <span>Assign Assignments For Your Class.</span>
        </div>
        <div className="header-search">
          <i className="bx bx-search"></i>
          <input type="text" placeholder="Search anything..." />
        </div>
        <div className="header-bell">
          <i className="bx bx-bell"></i>
        </div>
      </header>
      <div className="faculty-assignments-body">{handlePageRender()}</div>
    </div>
  );
};

export default FacultyAssignmentsMain;
