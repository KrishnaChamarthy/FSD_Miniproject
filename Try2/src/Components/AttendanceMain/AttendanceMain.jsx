import React from "react";
import "./AttendanceMain.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

const AttendanceMain = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const centerTextPlugin = {
    id: "centerText",
    afterDraw: (chart) => {
      const { width, height, ctx } = chart;
      ctx.restore();
      const fontSize = (height / 114).toFixed(2);
      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = "middle";

      const total = chart.config.data.datasets[0].data.reduce(
        (acc, curr) => acc + curr,
        0
      );
      const present = chart.config.data.datasets[0].data[0];
      const percentage = ((present / total) * 100).toFixed(2);

      const text = `${percentage}%`;
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2;

      ctx.fillText(text, textX, textY);
      ctx.save();
    },
  };

  const data = {
    labels: ["Present", "Absent", "On Leave", "Week Off/Holiday"],
    datasets: [
      {
        label: "Attendance",
        data: [2000, 590, 465, 157],
        backgroundColor: ["#4a90e2", "#ff6867","#34c75a", "#9ea0a1"],
        hoverOffset: 5,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: () => "",
          label: function (tooltipItem) {
            const dataset = tooltipItem.dataset;
            const total = dataset.data.reduce((acc, curr) => acc + curr, 0);
            const currentValue = dataset.data[tooltipItem.dataIndex];
            const percentage = ((currentValue / total) * 100).toFixed(2);
            return `${percentage}% ${tooltipItem.label}`;
          },
        },
        backgroundColor: "#fff",
        titleColor: "#000",
        titleFont: {
          weight: "bold",
        },
        bodyColor: "#000",
        bodyFont: {
          weight: "bold",
        },
        borderColor: "#ddd",
        borderWidth: 1,
        cornerRadius: 5,
        padding: 10,
        displayColors: false,
      },
      centerText: true,
    },
  };

  return (
    <div className="attendance-container">
      <header>
        <div className="header-text">
          Student Profile
          <br />
          <span>View and Update Your Profile.</span>
        </div>
        <div className="header-search">
          <i className="bx bx-search"></i>
          <input type="text" placeholder="Search anything..." />
        </div>
        <div className="header-bell">
          <i className="bx bx-bell"></i>
        </div>
      </header>
      <div className="attendance-body">
        <div className="attendance-element attendance-chart">
          <div className="element-title">Statistics</div>
          <div className="chart-container">
            <Doughnut
              data={data}
              options={options}
              plugins={[centerTextPlugin]}
            />
          </div>
        </div>
        <div className="attendance-element attendance-summary">
          <div className="element-title">Attendance</div>
          <ul className="attendance-summary-content">
            <li className="present">
              <i class="bx bx-check"></i>
              <div className="attendance-label">Present</div>
              <div className="attendance-amount">4500</div>
            </li>
            <li className="absent">
              <i class="material-icons-outlined">report_problem</i>
              <div className="attendance-label">Absent</div>
              <div className="attendance-amount">500</div>
            </li>
            <li className="leave">
              <i class="material-icons-outlined">beach_access</i>
              <div className="attendance-label">On Leave</div>
              <div className="attendance-amount">465</div>
            </li>
            <li className="holiday">
              <i class="bx bx-calendar-event"></i>
              <div className="attendance-label">Weekly Off</div>
              <div className="attendance-amount">145</div>
            </li>
            <li className="holiday">
              <i class="fa-solid fa-gift"></i>{" "}
              <div className="attendance-label">Holiday</div>
              <div className="attendance-amount">12</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AttendanceMain;
