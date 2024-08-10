import React from 'react'
import "./DashboardMain.css"

const DashboardMain = () => {
  return (
    <div className='dashboard-container'>
        <header>
            <div className="header-text">
                Hello Krishna 👋
                <span>Let's do some productive activities today.</span>
            </div>
            <div className="header-search">
                <i className="bx bx-search"></i>
                <input type="text" placeholder="Search..." />
            </div>
            <div className="header-bell">
                <i class='bx bx-bell'></i>
            </div>
        </header>

    </div>
  )
}

export default DashboardMain