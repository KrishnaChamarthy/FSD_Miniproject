import React from "react";
import "./Dashboard.css";
import Search_icon from "../../assets/search.png";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-title">
        <p>Student Dashboard</p>
        <div className="search-icon">
          <img src={Search_icon} alt="" />
        </div>
      </div>
      <div className="dashboard-headers">
        <div className="dashboard-header ">
          <div className="header-title">Semister</div>
          <div className="header-amount">5</div>
          
        </div>
        <div className="dashboard-header">
          <div className="header-title">Courses Enrolled</div>
          <div className="header-amount">12</div>
    
        </div>
        <div className="dashboard-header">
          <div className="header-title">Assignemnts Submitted</div>
          <div className="header-amount">4</div>
          <div className="header-progressbar">
            <div className="progressbar-container">
              <div className="skill"></div>
            </div>
            <div className="progressbar-amount">80%</div>
          </div>
        </div>
        <div className="dashboard-header">
          <div className="header-title">Attendance Summary</div>
          <div className="header-amount">88%</div>
          <div className="header-progressbar">
            <div className="progressbar-container">
              <div className="skill"></div>
            </div>
            <div className="progressbar-amount">88%</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
