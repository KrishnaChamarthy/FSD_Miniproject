import React, { useState } from 'react'
import "./FacultyProfileMain.css"
import Profile_icon from "../../../assets/Dashboard/boy.png";

import FacultyPersonalProfile from "../FacultyPersonalProfile/FacultyPersonalProfile"
import FacultyEducationalProfile from "../FacultyEducationalProfile/FacultyEducationalProfile"
import FacultyDocumentsProfile from "../FacultyDocumentsProfile/FacultyDocumentsProfile"

const FacultyProfileMain = () => {

  const [activeProfile, setActiveProfile] = useState("personal");

  const handleProfileChange = (profile) => {
    setActiveProfile(profile);
  }

  const handleProfileRender = () => {
    if (activeProfile === 'personal'){
      return <FacultyPersonalProfile />
    }
    else if (activeProfile === 'educational'){
      return <FacultyEducationalProfile />
    }
    else{
      return <FacultyDocumentsProfile />
    }
  }

  return (
    <div className='profile-container'>
        <header>
        <div className="header-text">
          Faculty Profile
          <br />
          <span>View Your Profile.</span>
        </div>
        <div className="header-search">
          <i className="bx bx-search"></i>
          <input type="text" placeholder="Search anything..." />
        </div>
        <div className="header-bell">
          <i className="bx bx-bell"></i>
        </div>
      </header>
      <div className="profile-body">
        <div className="profile-info-main">
          <img src={Profile_icon} alt="" />
          <div className="name">Faculty</div>
          <div className="prn">1234567890 | Department of Computer Science</div>
        </div>
        <div className="profile-info">
          <div className="profile-options">
            <button className={activeProfile === 'personal' ? 'profile-option profile-option-active' : 'profile-option'} onClick={() => {handleProfileChange('personal')}}>Personal Info</button>
            <button className={activeProfile === 'educational' ? 'profile-option profile-option-active' : 'profile-option'} onClick={() => {handleProfileChange('educational')}}>Educational Info</button>
            <button className={activeProfile === 'documents' ? 'profile-option profile-option-active' : 'profile-option'} onClick={() => {handleProfileChange('documents')}}>Documents</button>
          </div>
          {handleProfileRender()}
        </div>
      </div>
    </div>
  )
}

export default FacultyProfileMain