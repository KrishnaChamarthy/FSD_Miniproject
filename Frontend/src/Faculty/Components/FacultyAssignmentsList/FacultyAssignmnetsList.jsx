import React from "react";

const FacultyAssignmnetsList = ({
  filteredAssignments,
  findCourseNameByCode,
  setActivePage,
}) => {
  return (
    <div className="faculty-assignments-element">
      <div className="element-title-course">
        All Assignments
        <div
          className="add-assignment"
          onClick={() => {
            setActivePage("create");
          }}
        >
          <i class="bx bxs-file-plus"></i>
          Add Assignment
        </div>
      </div>
      <div className="faculty-assignments-list">
        {filteredAssignments.map((assignment, index) => {
          const courseName = findCourseNameByCode(assignment.course_code);
          return (
            <div className="faculty-assignment" key={index}>
              <div className="assignment-course">
                <p>
                  {assignment.course_code}: {courseName}
                </p>
              </div>
              <div className="assignment-title">
                <p>{assignment.assignment_title}</p>
                <p>Due: {new Date(assignment.due_date).toLocaleDateString()}</p>
              </div>
              <div className="assignment-status">Assigned</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FacultyAssignmnetsList;
