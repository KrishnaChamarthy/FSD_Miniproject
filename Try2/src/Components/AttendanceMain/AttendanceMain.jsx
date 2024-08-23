import React, { useState } from "react";
import "./AttendanceMain.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

const AttendanceMain = () => {

  const [semester, setSemester] = useState("5th Semester");
  const [openSemesterDropdown, setOpenSemesterDropdown] = useState(false);

  const handleOpenDropdown = () => {
    setOpenSemesterDropdown(!openSemesterDropdown);
  };

  const handleClick = (sem) => {
    setSemester(sem);
    setOpenSemesterDropdown(!openSemesterDropdown);
  };

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
          Attendance
          <br />
          <span>View Your Attendance.</span>
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
        <div className="attendance-element sub-attendance-summary">
        <div className="element-title-course">
          Subject-Wise Attendance
          <div className="semester-dropdown">
            <div className="select" onClick={handleOpenDropdown}>
              <span className="selected">{semester}</span>
              <div
                className={
                  openSemesterDropdown ? "caret caret-rotate" : "caret"
                }
              ></div>
            </div>
            <ul className={openSemesterDropdown ? "menu menu-open" : "menu"}>
              <li
                onClick={() => {
                  handleClick("1st Semester");
                }}
              >
                1st Semester
              </li>
              <li
                onClick={() => {
                  handleClick("2nd Semester");
                }}
              >
                2nd Semester
              </li>
              <li
                onClick={() => {
                  handleClick("3rd Semester");
                }}
              >
                3rd Semester
              </li>
              <li
                onClick={() => {
                  handleClick("4th Semester");
                }}
              >
                4th Semester
              </li>
              <li
                onClick={() => {
                  handleClick("5th Semester");
                }}
              >
                5th Semester
              </li>
            </ul>
          </div>
        </div>
        <table className='attendance-table'>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Subject Type</th>
              <th>Present</th>
              <th>Total</th>
              <th>Percentage</th>
            </tr>
            <tr>
              <td rowSpan={2}>CET2007B</td>
              <td rowSpan={2}>Artificial Intelligence and Expert Systems</td>
              <td>Theory</td>
              <td>10</td>
              <td>20</td>
              <td>50%</td>
            </tr>
            <tr>
              <td>Practical</td>
              <td>5</td>
              <td>10</td>
              <td>50%</td>
            </tr>
            <tr>
              <td rowSpan={2}>CET3005B</td>
              <td rowSpan={2}>Data Engineering</td>
              <td>Theory</td>
              <td>10</td>
              <td>20</td>
              <td>50%</td>
            </tr>
            <tr>
            <td>Practical</td>
              <td>5</td>
              <td>10</td>
              <td>50%</td>
            </tr>
            <tr>
              <td>CET3003B</td>
              <td >Full Stack Development</td>
              <td>Practical</td>
              <td>10</td>
              <td>20</td>
              <td>50%</td>
            </tr>
            <tr>
              <td rowSpan={2}>CET4003B</td>
              <td rowSpan={2}>Computer Graphics and 3D Modelling</td>
              <td>Theory</td>
              <td>10</td>
              <td>20</td>
              <td>50%</td>
            </tr>
            <tr>
            <td>Practical</td>
              <td>5</td>
              <td>10</td>
              <td>50%</td>
            </tr>
            <tr>
              <td rowSpan={2}>CET3004B</td>
              <td rowSpan={2}>Information and Cyber Security</td>
              <td>Theory</td>
              <td>10</td>
              <td>20</td>
              <td>50%</td>
            </tr>
            <tr>
            <td>Practical</td>
              <td>5</td>
              <td>10</td>
              <td>50%</td>
            </tr>
            <tr>
              <th rowSpan={2}></th>
              <th rowSpan={2}>Total</th>
              <th>Theory</th>
              <th>20</th>
              <th>40</th>
              <th>50%</th>
            </tr>
            <tr>
              <th>Practical</th>
              <th>20</th>
              <th>40</th>
              <th>50%</th>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceMain;
