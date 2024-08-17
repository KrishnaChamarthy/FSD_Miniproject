import React from "react";
import Profile_icon from "../../assets/Dashboard/boy.png";
import "./DashboardLeftbar.css";
import Calendar from "../Calendar/Calendar"

const DashboardLeftbar = () => {
  return (
    <div className="dashboard-leftbar">
      <div className="dashboard-profile">
        <img src={Profile_icon} alt="" />
        <div className="name">Krishna Chamarthy</div>
        <div className="info">Computer Science | 5th Semister</div>
        <div className="prn">1032221617</div>
      </div>
      <Calendar />
      <div className="schedule">
        <header>
          <p className="schedule-title">Schedule</p>
          <p className="see-all">See All</p>
        </header>
        <div className="schedule-item">
          <div className="schedule-date">
            18
          </div>
          <div className="schedule-divider"></div>
          <div className="schedule-info">
            <div className="info-header">
              <p className="title">Full Stack Development</p>
              <p className="time">8:30 - 9:30</p>
            </div>
            <p className="info-content">Unit 3 out of 5</p>
          </div>
        </div>
        <div className="schedule-item later">
          <div className="schedule-date">
            19
          </div>
          <div className="schedule-divider"></div>
          <div className="schedule-info">
            <div className="info-header">
              <p className="title">Data Engineering</p>
              <p className="time">8:30 - 9:30</p>
            </div>
            <p className="info-content">Unit 3 out of 5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLeftbar;
