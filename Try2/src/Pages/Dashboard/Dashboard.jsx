import React from 'react'
import "./Dashboard.css"
import DashboardLeftbar from '../../Components/DashboardLeftbar/DashboardLeftbar'

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <div className="dashboard-content"></div>
      <DashboardLeftbar />
    </div>
  )
}

export default Dashboard
