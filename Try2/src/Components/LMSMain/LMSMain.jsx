import React from "react";
import { Pie } from "react-chartjs-2"; // Import the Pie chart
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js"; // Import ArcElement for Pie chart

import "./LMSMain.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const LMSMain = () => {
  const data = {
    labels: ["Completed", "Pending", "Overdue"],
    datasets: [
      {
        label: "Assignments",
        data: [15, 10, 5], 
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
      display: false
    },

  },
  };

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
              <div className="lms-amount">30</div>
            </li>
            <li className="completed">
              <div className="lms-label-container">
                <i className="material-icons-outlined">assignment_turned_in</i>
                <div className="lms-label">Completed</div>
              </div>
              <div className="lms-amount">15</div>
            </li>
            <li className="pending">
              <div className="lms-label-container">
                <i className="material-icons-outlined">assignment_returned</i>
                <div className="lms-label">Pending</div>
              </div>
              <div className="lms-amount">10</div>
            </li>
            <li className="overdue">
              <div className="lms-label-container">
                <i className="material-icons-outlined">assignment_late</i>
                <div className="lms-label">Overdue</div>
              </div>
              <div className="lms-amount">5</div>
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
            <div className="element-title">Assignments</div>
            <div className="lms-assignments">
              <div className="lms-assignment assignment-completed">
                <div className="assignment-course">
                  <p>CET3004B - Information and Cyber Security</p>
                </div>
                <div className="assignment-title">
                  <p>Lab Assignment 1</p>
                  <p>Due: 23-10-24</p>
                </div>
                <div className="assignment-status assignment-completed-text">
                  Completed
                </div>
              </div>
              <div className="lms-assignment assignment-pending">
                <div className="assignment-course">
                  <p>CET3004B - Information and Cyber Security</p>
                </div>
                <div className="assignment-title">
                  <p>Lab Assignment 1</p>
                  <p>Due: 23-10-24</p>
                </div>
                <div className="assignment-status assignment-pending-text">
                  Pending
                </div>
              </div>
              <div className="lms-assignment assignment-overdue">
                <div className="assignment-course">
                  <p>CET3004B - Information and Cyber Security</p>
                </div>
                <div className="assignment-title">
                  <p>Lab Assignment 1</p>
                  <p>Due: 23-10-24</p>
                </div>
                <div className="assignment-status assignment-overdue-text">
                  Overdue
                </div>
              </div>
              
            </div>
        </div>
      </div>
    </div>
  );
};

export default LMSMain;
