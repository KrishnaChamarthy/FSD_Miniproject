import React, { useState } from 'react'
import "./DashboardMain.css"

const DashboardMain = () => {

    const [semester, setSemester] = useState("5th Semester");
    const [openSemesterDropdown, setOpenSemesterDropdown] = useState(false);

    const handleOpenDropdown = () => {
        setOpenSemesterDropdown(!openSemesterDropdown);
    }

    const handleClick = (sem) => {
        setSemester(sem);
        setOpenSemesterDropdown(!openSemesterDropdown);
    }

  return (
    <div className='dashboard-container'>
        <header>
            <div className="header-text">
                Hello Krishna👋<br/>
                <span>Let's do some productive activities today.</span>
            </div>
            <div className="header-search">
                <i className="bx bx-search"></i>
                <input type="text" placeholder="Search anything..." />
            </div>
            <div className="header-bell">
                <i class='bx bx-bell'></i>
            </div>
        </header>
        <div className="dashboard-body">
            <header>
                <p>Summary Report</p>
                <div className="semester-dropdown">
                    <div className="select" onClick={handleOpenDropdown}>
                        <span className="selected">{semester}</span>
                        <div className={openSemesterDropdown ? "caret caret-rotate": "caret"}></div>
                    </div>
                    <ul className={openSemesterDropdown ? "menu menu-open" : "menu"}>
                        <li onClick={() => {
                            handleClick("1st Semester")
                        }}>1st Semester</li>
                        <li onClick={() => {
                            handleClick("2nd Semester")
                        }}>2nd Semester</li>
                        <li onClick={() => {
                            handleClick("3rd Semester")
                        }}>3rd Semester</li>
                        <li onClick={() => {
                            handleClick("4th Semester")
                        }}>4th Semester</li>
                        <li onClick={() => {
                            handleClick("5th Semester")
                        }}>5th Semester</li>
                    </ul>
                </div>
            </header>
        </div>
    </div>
  )
}

export default DashboardMain