import React from 'react'
import "./FacultyDashboard.css"
import FacultyDashboardLeftbar from "../../Components/FacultyDashboardLeftbar/FacultyDashboardLeftbar";
import FacultyDashboardMain from '../../Components/FacultyDashboardMain/FacultyDashboardMain'

const FacultyDashboard = () => {
  return (
    <div className='faculty-dashboard'>
      <FacultyDashboardMain />
      <FacultyDashboardLeftbar />
    </div>
  )
}

export default FacultyDashboard