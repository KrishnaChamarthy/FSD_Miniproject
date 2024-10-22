import React from "react";
import "./AssignmentDisplay.css";

const AssignmentDisplay = ({ selectedAssignment }) => {
  const {
    course_code,
    course_name,
    assignment_title,
    assignment_description,
    due_date,
  } = selectedAssignment;
  
  return (
    <div className="assignment-popup">
      <div className="assignment-popup-date">
        Due: {new Date(due_date).toLocaleDateString()}
      </div>
      <div className="assignment-popup-title">
        <p>
          {course_code}: {course_name}
        </p>
        <p>{assignment_title}</p>
      </div>
      <div className="assignment-popup-content">
        <p>{assignment_description}</p>
      </div>
      <div className="assignment-submit">Submit</div>
    </div>
  );
};

export default AssignmentDisplay;
