import React, { useState, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from "../../../context/StoreContext";

const FacultyAssignmentsCreate = ({setActivePage}) => {
  const { url, facultyCourses, fetchAssignments } = useContext(StoreContext); 

  const [formData, setFormData] = useState({
    course_code: '',
    assignment_title: '',
    assignment_description: '',
    due_date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${url}/api/assignment/create`, formData);
      fetchAssignments();
      setActivePage('list');
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };

  return (
    <div className="faculty-assignments-element assignment-create">
      <div className="element-title-course">
      Create New Assignment
      <div className="add-assignment" onClick={() => {setActivePage('list')}}>
      <i className='bx bx-arrow-back'></i>
      Go Back
      </div>
      </div>
      <form onSubmit={handleSubmit} className='assignment-create-form'>
        <div className="top">
        <div className="form-group course-code">
          <label>Course Code:</label>
          <select
            name="course_code"
            value={formData.course_code}
            onChange={handleChange}
            required
          >
            <option value="">Select Course</option>
            {facultyCourses.map((course) => (
              <option key={course.course_code} value={course.course_code}>
                {course.course_code}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group assignment-date">
          <label>Due Date:</label>
          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            required
          />
        </div>
        </div>
        

        <div className="form-group title">
          <label>Assignment Title:</label>
          <input
            type="text"
            name="assignment_title"
            value={formData.assignment_title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group desc">
          <label>Assignment Description:</label>
          <textarea
            name="assignment_description"
            value={formData.assignment_description}
            onChange={handleChange}
            required
          />
        </div>

       

        <button type="submit" className="submit-button">Create Assignment</button>
      </form>
    </div>
  );
};

export default FacultyAssignmentsCreate;
