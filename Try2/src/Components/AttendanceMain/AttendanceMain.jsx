import React from 'react'
import "./AttendanceMain.css"
import {Doughnut} from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


const AttendanceMain = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100], 
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverOffset: 5,
    }]
  };

  const options = {
    cutout: '70%',
  };

  return (
    <div className='attendance-container'>
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
          <i class="bx bx-bell"></i>
        </div>
      </header>
      <div className="attendance-body">
        <div className="attendance-element attendance-chart">
          <div className="chart-container">
            <Doughnut data={data} options={options}/>
          </div>
        </div>
        <div className="attendance-element attendance-summary">
          dddd
        </div>
      </div>
    </div>
  )
}

export default AttendanceMain