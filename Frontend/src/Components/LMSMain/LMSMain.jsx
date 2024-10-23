import React, { useContext, useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import AssignmentDisplay from "../AssignmentDisplay/AssignmentDisplay";
import "./LMSMain.css";
import { StoreContext } from "../../context/StoreContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const LMSMain = () => {
  const [showAssignment, setShowAssignment] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const { assignments, studentData, studentCourses } = useContext(StoreContext);

  
  const closeAssignmentDisplay = () => {
    setShowAssignment(false);
    setSelectedAssignment(null);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeAssignmentDisplay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const categorizeAssignment = (assignment) => {
    const currentDate = new Date();
    const dueDate = new Date(assignment.due_date);

    const studentSubmission = assignment.submissions.find(
      (submission) => submission.student_PRN === studentData.student_PRN
    );

    if (studentSubmission) {
      const submissionDate = new Date(studentSubmission.submission_date);
      if (submissionDate <= dueDate) {
        return "Completed";
      }
    }

    if (dueDate < currentDate) {
      return "Overdue";
    }

    return "Pending";
  };

  const assignmentStatusCounts = assignments.reduce(
    (acc, assignment) => {
      const status = categorizeAssignment(assignment);
      acc[status]++;
      return acc;
    },
    { Completed: 0, Pending: 0, Overdue: 0 }
  );

  const data = {
    labels: ["Completed", "Pending", "Overdue"],
    datasets: [
      {
        label: "Assignments",
        data: [
          assignmentStatusCounts.Completed,
          assignmentStatusCounts.Pending,
          assignmentStatusCounts.Overdue,
        ],
        backgroundColor: ["#34c75a", "#7d922f98", "#ff6867"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    layout: {
      padding: 0,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const handleClick = (assignment) => {
    const assignmentWithCourseName = {
      ...assignment,
      course_name: findCourseNameByCode(assignment.course_code) // Adding course_name
    };
  
  
    setSelectedAssignment(assignmentWithCourseName); // Ensure this includes all necessary fields
    setShowAssignment(true);
  };
  

  const findCourseNameByCode = (course_code) => {
    const course = studentCourses.find((course) => {
      return course.course_code === course_code;
    });

    return course ? course.course_name : "Course not found";
  };

  const sortedAssignments = assignments.sort((a, b) => {
    const statusA = categorizeAssignment(a);
    const statusB = categorizeAssignment(b);

    const statusOrder = {
      Overdue: 1,
      Pending: 2,
      Completed: 3,
    };

    return statusOrder[statusA] - statusOrder[statusB];
  });

  return (
    <div className="lms-container">
      <header>
        <div className="header-text">
          Assignments
          <br />
          <span>Submit Your Assignments.</span>
        </div>
        <div className="header-search">
          <i className="bx bx-search"></i>
          <input type="text" placeholder="Search anything..." />
        </div>
        <div className="header-bell">
          <i className="bx bx-bell"></i>
        </div>
      </header>

      <div className="lms-body">
        <div className="lms-element lms-summary">
          <div className="element-title">Assignments Status</div>
          <ul className="lms-summary-content">
            <li className="total-assignments">
              <div className="lms-label-container">
                <i className="material-icons-outlined">assignment</i>
                <div className="lms-label">Total</div>
              </div>
              <div className="lms-amount">{assignments.length}</div>
            </li>
            <li className="completed">
              <div className="lms-label-container">
                <i className="material-icons-outlined">assignment_turned_in</i>
                <div className="lms-label">Completed</div>
              </div>
              <div className="lms-amount">
                {assignmentStatusCounts.Completed}
              </div>
            </li>
            <li className="pending">
              <div className="lms-label-container">
                <i className="material-icons-outlined">assignment_returned</i>
                <div className="lms-label">Pending</div>
              </div>
              <div className="lms-amount">{assignmentStatusCounts.Pending}</div>
            </li>
            <li className="overdue">
              <div className="lms-label-container">
                <i className="material-icons-outlined">assignment_late</i>
                <div className="lms-label">Overdue</div>
              </div>
              <div className="lms-amount">{assignmentStatusCounts.Overdue}</div>
            </li>
          </ul>
        </div>

        <div className="lms-element lms-piechart">
          <div className="element-title">Statistics</div>
          <div className="assignment-piechart">
            <Pie data={data} options={options} />
          </div>
        </div>

        <div className="lms-element lms-assignments-list">
          {showAssignment && selectedAssignment && (
            <div
              className="assignment-display-overlay"
              onClick={closeAssignmentDisplay}
            >
              <div
                className="assignment-display-content"
                onClick={(e) => e.stopPropagation()}
              >
                <AssignmentDisplay selectedAssignment={selectedAssignment} />
              </div>
            </div>
          )}
          <div className="element-title">Assignments</div>
          <div className="lms-assignments">
            {sortedAssignments.map((assignment, index) => {
              const status = categorizeAssignment(assignment);
              const courseName = findCourseNameByCode(assignment.course_code);

              return (
                <div
                  key={index}
                  className={`lms-assignment assignment-${status.toLowerCase()}`}
                  onClick={() => handleClick(assignment)}
                >
                  <div className="assignment-course">
                    <p>
                      {assignment.course_code}: {courseName}
                    </p>
                  </div>
                  <div className="assignment-title">
                    <p>{assignment.assignment_title}</p>
                    <p>
                      Due: {new Date(assignment.due_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div
                    className={`assignment-status assignment-${status.toLowerCase()}-text`}
                  >
                    {status}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LMSMain;
