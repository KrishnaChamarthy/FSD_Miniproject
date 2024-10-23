import React from 'react'
import "./Dashboard.css"
import DashboardLeftbar from '../../Components/DashboardLeftbar/DashboardLeftbar'
import DashboardMain from '../../Components/DashboardMain/DashboardMain'

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <DashboardMain />
      <DashboardLeftbar />
    </div>
  )
}

export default Dashboard
