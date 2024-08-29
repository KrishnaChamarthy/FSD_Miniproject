import React from 'react'
import "./ResultMain.css"

const ResultMain = () => {
  return (
    <div className='result-container'>
         <header>
        <div className="header-text">
          Student Marksheet
          <br />
          <span>View Your Results.</span>
        </div>
        <div className="header-search">
          <i className="bx bx-search"></i>
          <input type="text" placeholder="Search anything..." />
        </div>
        <div className="header-bell">
          <i class="bx bx-bell"></i>
        </div>
      </header>
    </div>
  )
}

export default ResultMain