import React, { useContext, useState, useEffect } from "react";
import "./CircularsMain.css";
import { StoreContext } from "../../context/StoreContext";
import CircularDisplay from "../CircularDisplay/CircularDisplay";
import axios from "axios";

const CircularsMain = () => {
  const { circularsList, showCirculer, setShowCircular, url, studentData } = useContext(StoreContext);
  const [selectedCircular, setSelectedCircular] = useState(null);

  const computeCounts = () => {
    const counts = {
      important: 0,
      unread: 0,
      academic: 0,
      administrative: 0,
      events: 0,
      holidays: 0,
      exams: 0,
    };

    circularsList.forEach((circular) => {
      const category = circular.category.toLowerCase();
      if (category === "academic") counts.academic++;
      else if (category === "administrative") counts.administrative++;
      else if (category === "events") counts.events++;
      else if (category === "holidays") counts.holidays++;
      else if (category === "exams") counts.exams++;
      if (category === "academic" || category === "exams") counts.important++;
      if (!circular.read) counts.unread++;
    });

    return counts;
  };

  const counts = computeCounts();

  const handleClick = async (circular) => {
    try {
      if (!circular.read) {
        await axios.post(`${url}/api/circulars/addToRead`, {
          student_PRN: studentData.student_PRN,
          circular_id: circular.circular_id,
        });
        circular.read = true;
      }
      setSelectedCircular(circular);
      setShowCircular(true);
    } catch (error) {
      console.error("Error marking circular as read:", error);
    }
  };

  const renderCircularsRows = () => {
    return circularsList.map((circular) => (
      <tr key={circular.circular_id} onClick={() => handleClick(circular)}>
        <td>{circular.circular_id}</td>
        <td>{circular.subject}</td>
        <td>
          <div className={`${circular.category.toLowerCase()}-category`}>
            {circular.category}
          </div>
        </td>
        <td>{new Date(circular.dateIssued).toLocaleDateString()}</td>
        <td>{circular.read ? "" : <div className="unread"></div>}</td>
      </tr>
    ));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowCircular(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="circulars-container">
      <header>
        <div className="header-text">
          Circulars
          <br />
          <span>View Circulars/Notices.</span>
        </div>
        <div className="header-search">
          <i className="bx bx-search"></i>
          <input type="text" placeholder="Search anything..." />
        </div>
        <div className="header-bell">
          <i className="bx bx-bell"></i>
        </div>
      </header>
      <div className="circulars-body">
        <div className="circulars-element circulars-summary">
          <div className="element-title">Summary</div>
          <ul className="circulars-summary-content">
            <li className="important">
              <i className="material-icons-outlined">report_problem</i>
              <div className="circulars-label">Important</div>
              <div className="circulars-amount">{counts.important}</div>
            </li>
            <li className="unread">
              <i className="material-icons-outlined">mark_email_unread</i>
              <div className="circulars-label">Unread</div>
              <div className="circulars-amount">{counts.unread}</div>
            </li>
          </ul>
        </div>
        <div className="circulars-element circulars-categories">
          <div className="element-title">Circulars Categories</div>
          <ul className="circulars-categories-content">
            <li className="academic">
              <i className="material-icons-outlined">school</i>
              <div className="circulars-label">Academic</div>
              <div className="circulars-amount">{counts.academic}</div>
            </li>
            <li className="administrative">
              <i className="material-icons-outlined">history_edu</i>
              <div className="circulars-label">Administrative</div>
              <div className="circulars-amount">{counts.administrative}</div>
            </li>
            <li className="events">
              <i className="material-icons-outlined">emoji_events</i>
              <div className="circulars-label">Events</div>
              <div className="circulars-amount">{counts.events}</div>
            </li>
            <li className="holidays">
              <i className="bx bx-calendar-event"></i>
              <div className="circulars-label">Holidays</div>
              <div className="circulars-amount">{counts.holidays}</div>
            </li>
            <li className="exams">
              <i className="material-icons-outlined">quiz</i>
              <div className="circulars-label">Exams</div>
              <div className="circulars-amount">{counts.exams}</div>
            </li>
          </ul>
        </div>
        <div className="circulars-element circulars-list">
          {showCirculer && selectedCircular && (
            <div
              className="circular-display-overlay"
              onClick={() => setShowCircular(false)}
            >
              <div
                className="circular-display-content"
                onClick={(e) => e.stopPropagation()}
              >
                <CircularDisplay circular={selectedCircular} />
              </div>
            </div>
          )}
          <div className="element-title">Circulars</div>
          <table className="circulars-table">
            <thead>
              <tr>
                <th className="id">Circular ID</th>
                <th className="sub">Circular Subject</th>
                <th className="cat">Category</th>
                <th className="date">Date</th>
                <th className="read"></th>
              </tr>
            </thead>
            <tbody>{renderCircularsRows()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CircularsMain;
