import React, { useState } from 'react'
import "./ProfileMain.css"
import Profile_icon from "../../assets/Dashboard/boy.png";
import PersonalProfile from '../PersonalProfile/PersonalProfile';
import EducationalProfile from '../EducationalProfile/EducationalProfile';
import DocumentsProfile from '../DocumentsProfile/DocumentsProfile';

const ProfileMain = () => {

  const [activeProfile, setActiveProfile] = useState("personal");

  const handleProfileChange = (profile) => {
    setActiveProfile(profile);
  }

  const handleProfileRender = () => {
    if (activeProfile === 'personal'){
      return <PersonalProfile />
    }
    else if (activeProfile === 'educational'){
      return <EducationalProfile />
    }
    else{
      return <DocumentsProfile />
    }
  }

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
          <i className="bx bx-bell"></i>
        </div>
      </header>
      <div className="profile-body">
        <div className="profile-info-main">
          <img src={Profile_icon} alt="" />
          <div className="name">Krishna Chamarthy</div>
          <div className="prn">1032221617</div>
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

export default ProfileMain