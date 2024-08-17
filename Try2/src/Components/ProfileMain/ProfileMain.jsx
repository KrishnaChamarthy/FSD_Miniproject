import React from 'react'
import "./ProfileMain.css"

const ProfileMain = () => {
  return (
    <div className='profile-container'>
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
      <div className="profile-body">
        
      </div>
    </div>
  )
}

export default ProfileMain