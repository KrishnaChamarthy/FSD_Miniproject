import React, { useContext } from 'react'
import "./FacultyPersonalProfile.css"
import { StoreContext } from '../../../context/StoreContext'

const FacultyPersonalProfile = () => {

  const {facultyData} = useContext(StoreContext);

  const handleDate = () =>{
    let dob = facultyData.dob;

    if (dob) {
        if (!(dob instanceof Date)) {
            dob = new Date(dob); 
        }
        const day = dob.getDate().toString().padStart(2, '0');
        const month = (dob.getMonth() + 1).toString().padStart(2, '0');
        const year = dob.getFullYear();
    
        const formattedDate = `${day}/${month}/${year}`; 
        return formattedDate;
    }else{
        return "-";
    }
}

  return (
    <div className='personal-profile'>
        <div className="personal-profile-element student-info">
            <div className="element-title">Faculty Information</div>
            <ul className="element-content">
                <li>
                    <div className="element-field">
                        PRN
                    </div>
                    <div className="element-value">
                        {facultyData.faculty_PRN || "-"}
                    </div>
                    <div className="element-field">
                        First Name
                    </div>
                    <div className="element-value">
                    {facultyData.first_name || "-"}
                    </div>
                </li>
                <li>
                    <div className="element-field">
                        Middle Name
                    </div>
                    <div className="element-value">
                    {facultyData.middle_name || "-"}
                    </div>
                    <div className="element-field">
                        Last Name
                    </div>
                    <div className="element-value">
                    {facultyData.last_name || "-"}
                    </div>
                </li>
                <li>
                    <div className="element-field">
                        DOB
                    </div>
                    <div className="element-value">
                        {handleDate()}
                    </div>
                    <div className="element-field">
                        Gender
                    </div>
                    <div className="element-value">
                        {facultyData.gender || "-"}
                    </div>
                </li>
                <li>
                    <div className="element-field">
                        Blood Group
                    </div>
                    <div className="element-value">
                        {facultyData.bg || "-"}
                    </div>
                    <div className="element-field">
                        Nationality
                    </div>
                    <div className="element-value">
                        {facultyData.nationality || "-"}
                    </div>
                </li>
                <li>
                    <div className="element-field">
                        Aadhar Number
                    </div>
                    <div className="element-value">
                        {facultyData.aadhar || "-"}
                    </div>
                    <div className="element-field">
                      Marital Status
                    </div>
                    <div className="element-value">
                        {facultyData.marital || "-"}
                    </div>
                </li>
                <li>
                    <div className="element-field">
                        Employee No.
                    </div>
                    <div className="element-value">
                        {facultyData.faculty_PRN || "-"}  
                    </div>
                    <div className="element-field">
                        Department
                    </div>
                    <div className="element-value">
                        {facultyData.ad_date || "-"}
                    </div>
                </li>
            </ul>
        </div>
        <div className="personal-profile-element contact-info">
            <div className="element-title">Contact Information</div>
            <ul className="element-content">
                <li>
                    <div className="element-field">
                        Email
                    </div>
                    <div className="element-value">
                        {facultyData.email || "-"}
                    </div>
                </li>
                <li>
                    <div className="element-field">
                        Mobile No.
                    </div>
                    <div className="element-value">
                        {facultyData.phone || "-"}
                    </div>
                </li>
                <li>
                    <div className="element-field">
                        Current Address
                    </div>
                    <div className="element-value">
                        {facultyData.address || "-"}
                    </div>
                </li>
                <li>
                    <div className="element-field">
                        Street
                    </div>
                    <div className="element-value">
                        -
                    </div>
                </li>
                <li>
                    <div className="element-field">
                        Area
                    </div>
                    <div className="element-value">
                        -
                    </div>
                </li>
                <li>
                    <div className="element-field">
                        City
                    </div>
                    <div className="element-value">
                        -
                    </div>
                </li>
                <li>
                    <div className="element-field">
                        Pincode
                    </div>
                    <div className="element-value">
                        411028
                    </div>
                </li>
                <li>
                    <div className="element-field">
                        State
                    </div>
                    <div className="element-value">
                        Maharashtra
                    </div>
                </li>
                <li>
                    <div className="element-field">
                        Country
                    </div>
                    <div className="element-value">
                        India
                    </div>
                </li>
                <li>
                    <div className="element-field">
                        Emergency Contact Name
                    </div>
                    <div className="element-value">
                        {facultyData.e_name || "-"}
                    </div>
                </li>
                <li>
                    <div className="element-field">
                        Emergency Contact Number
                    </div>
                    <div className="element-value">
                        {facultyData.e_phone || "-"}
                    </div>
                </li>
            </ul>
        </div>
        <div className="personal-profile-element parent-info">
            <div className="element-title">Personal Information</div>
            <ul className="element-content">
                <li>
                    <div className="element-field">
                        Languages
                    </div>
                    <div className="element-value">
                        {facultyData.languages || "-"}
                    </div>
                    <div className="element-field">
                        Hobbies
                    </div>
                    <div className="element-value">
                        {facultyData.hobbies || "-"}
                    </div>
                </li>
                <li>
                    <div className="element-field">
                        Interests
                    </div>
                    <div className="element-value">
                        {facultyData.interests || "-"}
                    </div>
                    <div className="element-field">
                        Joining Date
                    </div>
                    <div className="element-value">
                    {facultyData.m_email || "-"}
                    </div>
                </li>
                
            </ul>
        </div>
    </div>
  )
}

export default FacultyPersonalProfile