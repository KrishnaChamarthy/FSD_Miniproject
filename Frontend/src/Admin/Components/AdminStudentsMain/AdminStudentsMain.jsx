import React, { useContext, useState } from "react";
import "./AdminStudentsMain.css";
import axios from "axios";
import { StoreContext } from "../../../context/StoreContext";

const AdminStudentsMain = () => {
  const { url } = useContext(StoreContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    student_PRN: "",
    semester: "",
    first_name: "",
    middleName: "",
    last_name: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    nationality: "",
    aadharNumber: "",
    registrationNo: "",
    admissionNo: "",
    admissionDate: "",
    phone: "",
    currentAddress: "",
    street: "",
    area: "",
    city: "",
    pincode: "411028",
    state: "Maharashtra",
    country: "India",
    emergencyContactName: "",
    emergencyContactNumber: "",
    fatherName: "",
    motherName: "",
    fatherEmail: "",
    motherEmail: "",
    fatherMobile: "",
    motherMobile: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${url}/api/student/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Form Data Submitted Successfully:", response.data);

      setFormData({
        email: "",
        password: "",
        student_PRN: "",
        semester: "",
        first_name: "",
        middleName: "",
        last_name: "",
        dob: "",
        gender: "",
        bloodGroup: "",
        nationality: "",
        aadharNumber: "",
        registrationNo: "",
        admissionNo: "",
        admissionDate: "",
        phone: "",
        currentAddress: "",
        street: "",
        area: "",
        city: "",
        pincode: "411028",
        state: "Maharashtra",
        country: "India",
        emergencyContactName: "",
        emergencyContactNumber: "",
        fatherName: "",
        motherName: "",
        fatherEmail: "",
        motherEmail: "",
        fatherMobile: "",
        motherMobile: "",
      });
    } catch (error) {
      console.error(
        "Error submitting form data:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="admin-students-container">
      <header>
        <div className="header-text">
          Add Students
          <br />
          <span>Register Students for your college.</span>
        </div>
        <div className="header-search">
          <i className="bx bx-search"></i>
          <input type="text" placeholder="Search anything..." />
        </div>
        <div className="header-bell">
          <i className="bx bx-bell"></i>
        </div>
      </header>
      <div className="admin-students-body">
        <div className="admin-students-element login-info">
          <ul className="element-content">
            <li>
              <div className="element-field">Email</div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="element-input"
              />
              <div className="element-field">Password</div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="element-input"
              />
              <div className="element-field">Semester</div>
              <input
                type="text"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="element-input"
              />
            </li>
          </ul>
        </div>

        <div className="admin-students-element student-input">
          <div className="element-title">Student Information</div>
          <ul className="element-content">
            <li>
              <div className="element-field">PRN</div>
              <input
                type="text"
                name="student_PRN"
                value={formData.student_PRN}
                onChange={handleChange}
                className="element-input"
              />
              <div className="element-field">First Name</div>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="element-input"
              />
            </li>
            <li>
              <div className="element-field">Middle Name</div>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className="element-input"
              />
              <div className="element-field">Last Name</div>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="element-input"
              />
            </li>
            <li>
              <div className="element-field">DOB</div>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="element-input"
              />
              <div className="element-field">Gender</div>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="element-input"
              />
            </li>
            <li>
              <div className="element-field">Blood Group</div>
              <input
                type="text"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="element-input"
              />
              <div className="element-field">Nationality</div>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="element-input"
              />
            </li>
            <li>
              <div className="element-field">Aadhar Number</div>
              <input
                type="text"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                className="element-input"
              />
              <div className="element-field">Registration No.</div>
              <input
                type="text"
                name="registrationNo"
                value={formData.registrationNo}
                onChange={handleChange}
                className="element-input"
              />
            </li>
            <li>
              <div className="element-field">Admission No.</div>
              <input
                type="text"
                name="admissionNo"
                value={formData.admissionNo}
                onChange={handleChange}
                className="element-input"
              />
              <div className="element-field">Admission Date</div>
              <input
                type="date"
                name="admissionDate"
                value={formData.admissionDate}
                onChange={handleChange}
                className="element-input"
              />
            </li>
          </ul>
        </div>

        <div className="admin-students-element contact-input">
          <div className="element-title">Contact Information</div>
          <ul className="element-content">
            <li>
              <div className="element-field">Email</div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="element-input"
              />
            </li>
            <li>
              <div className="element-field">Mobile No.</div>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="element-input"
              />
            </li>
            <li>
              <div className="element-field">Current Address</div>
              <input
                type="text"
                name="currentAddress"
                value={formData.currentAddress}
                onChange={handleChange}
                className="element-input"
              />
            </li>
            <li>
              <div className="element-field">Street</div>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="element-input"
              />
            </li>
            <li>
              <div className="element-field">Area</div>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="element-input"
              />
            </li>
            <li>
              <div className="element-field">City</div>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="element-input"
              />
            </li>
            <li>
              <div className="element-field">Pincode</div>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="element-input"
              />
            </li>
            <li>
              <div className="element-field">State</div>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="element-input"
              />
            </li>
            <li>
              <div className="element-field">Country</div>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="element-input"
              />
            </li>
            <li>
              <div className="element-field">Emergency Contact Name</div>
              <input
                type="text"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleChange}
                className="element-input"
              />
            </li>
            <li>
              <div className="element-field">Emergency Contact Number</div>
              <input
                type="text"
                name="emergencyContactNumber"
                value={formData.emergencyContactNumber}
                onChange={handleChange}
                className="element-input"
              />
            </li>
          </ul>
        </div>

        <div className="admin-students-element parent-input">
          <div className="element-title">Parent Information</div>
          <ul className="element-content">
            <li>
              <div className="element-field">Father's Full Name</div>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                className="element-input"
              />
              <div className="element-field">Mother's Full Name</div>
              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                className="element-input"
              />
            </li>
            <li>
              <div className="element-field">Father's Email</div>
              <input
                type="email"
                name="fatherEmail"
                value={formData.fatherEmail}
                onChange={handleChange}
                className="element-input"
              />
              <div className="element-field">Mother's Email</div>
              <input
                type="email"
                name="motherEmail"
                value={formData.motherEmail}
                onChange={handleChange}
                className="element-input"
              />
            </li>
            <li>
              <div className="element-field">Father's Mobile No.</div>
              <input
                type="text"
                name="fatherMobile"
                value={formData.fatherMobile}
                onChange={handleChange}
                className="element-input"
              />
              <div className="element-field">Mother's Mobile No.</div>
              <input
                type="text"
                name="motherMobile"
                value={formData.motherMobile}
                onChange={handleChange}
                className="element-input"
              />
            </li>
          </ul>
        </div>

        <div className="admin-students-element submit-info">
          <button onClick={handleSubmit} className="submit-button">
            Add Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminStudentsMain;
