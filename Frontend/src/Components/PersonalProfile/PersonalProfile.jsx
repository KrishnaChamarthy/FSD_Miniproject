import React, { useContext } from 'react'
import "./PersonalProfile.css"
import { StoreContext } from '../../context/StoreContext'

const PersonalProfile = () => {

    const {studentData} = useContext(StoreContext);

    const handleDate = () =>{
        let dob = studentData.dob;

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
            <div className="element-title">Student Information</div>
            <ul className="element-content">
                <li>
                    <div className="element-field">
                        PRN
                    </div>
                    <div className="element-value">
                        {studentData.student_PRN || "-"}
                    </div>
                    <div className="element-field">
                        First Name
                    </div>
                    <div className="element-value">
                    {studentData.first_name || "-"}
                    </div>
                </li>
                <li>
                    <div className="element-field">
                        Middle Name
                    </div>
                    <div className="element-value">
                    {studentData.middle_name || "-"}
                    </div>
                    <div className="element-field">
                        Last Name
                    </div>
                    <div className="element-value">
                    {studentData.last_name || "-"}
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
                        {studentData.gender || "-"}
                    </div>
                </li>
                <li>
                    <div className="element-field">
                        Blood Group
                    </div>
                    <div className="element-value">
                        {studentData.bg || "-"}
                    </div>
                    <div className="element-field">
                        Nationality
                    </div>
                    <div className="element-value">
                        {studentData.nationality || "-"}
                    </div>
                </li>
                <li>
                    <div className="element-field">
                        Aadhar Number
                    </div>
                    <div className="element-value">
                        {studentData.aadhar || "-"}
                    </div>
                    <div className="element-field">
                        Registration No.
                    </div>
                    <div className="element-value">
                        {studentData.student_PRN || "-"}
                    </div>
                </li>
                <li>
                    <div className="element-field">
                        Admission No.
                    </div>
                    <div className="element-value">
                        {studentData.student_PRN || "-"}  
                    </div>
                    <div className="element-field">
                        Admission Date
                    </div>
                    <div className="element-value">
                        {studentData.ad_date || "-"}
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
                        {studentData.email || "-"}
                    </div>
                </li>
                <li>
                    <div className="element-field">
                        Mobile No.
                    </div>
                    <div className="element-value">
                        {studentData.phone || "-"}
                    </div>
                </li>
                <li>
                    <div className="element-field">
                        Current Address
                    </div>
                    <div className="element-value">
                        {studentData.address || "-"}
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
                        {studentData.e_name || "-"}
                    </div>
                </li>
                <li>
                    <div className="element-field">
                        Emergency Contact Number
                    </div>
                    <div className="element-value">
                        {studentData.e_phone || "-"}
                    </div>
                </li>
            </ul>
        </div>
        <div className="personal-profile-element parent-info">
            <div className="element-title">Parent Information</div>
            <ul className="element-content">
                <li>
                    <div className="element-field">
                        Father's Full Name
                    </div>
                    <div className="element-value">
                        {studentData.f_name || "-"}
                    </div>
                    <div className="element-field">
                        Mother's Full Name
                    </div>
                    <div className="element-value">
                        {studentData.m_name || "-"}
                    </div>
                </li>
                <li>
                    <div className="element-field">
                        Father's Email
                    </div>
                    <div className="element-value">
                        {studentData.f_email || "-"}
                    </div>
                    <div className="element-field">
                        Mother's Email
                    </div>
                    <div className="element-value">
                    {studentData.m_email || "-"}
                    </div>
                </li>
                <li>
                    <div className="element-field">
                        Father's Mobile No.
                    </div>
                    <div className="element-value">
                    {studentData.f_phone || "-"}
                    </div>
                    <div className="element-field">
                        Mother's Mobile No.
                    </div>
                    <div className="element-value">
                    {studentData.m_phone || "-"}
                    </div>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default PersonalProfile