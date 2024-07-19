import React from 'react'
import "./Dashboard.css"
import Search_icon from "../../assets/search.png"

const Dashboard = () => {
  return (
    <div className='dashboard'>
        <div className="dashboard-title">
            <p>Student Dashboard</p>
            <div className="search-icon">
                <img src={Search_icon} alt="" />
            </div>
        </div>
    </div>
  )
}
export default Dashboard
