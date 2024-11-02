import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../../context/StoreContext";
import axios from "axios";

const AdminCircularsCreate = ({setActivePage}) => {
  const { url, fetchCirculars } = useContext(StoreContext);

  const [formData, setFormData] = useState({
    circular_id: '',
    subject: '',
    description: '',
    category: 'Academic', 
    dateIssued: '',      
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prevData) => ({
      ...prevData,
      dateIssued: today,
    }));
  }, []);

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
      await axios.post(`${url}/api/circulars/add`, formData);
      fetchCirculars();
      alert("Circular created successfully!");
    } catch (error) {
      console.error("Error creating circular:", error);
      alert("Failed to create circular");
    }
    setActivePage('list');
  };

  return (
    <div className="admin-circulars-element circular-create">
      <div className="element-title-course">
        Create New Circular
        <div
          className="add-assignment"
          onClick={() => {
            setActivePage("list");
          }}
        >
          <i className="bx bx-arrow-back"></i>
          Go Back
        </div>
      </div>
      <form onSubmit={handleSubmit} className="assignment-create-form">
        <div className="top">
        <div className="form-group course-code">
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="Academic">Academic</option>
            <option value="Administrative">Administrative</option>
            <option value="Exams">Exams</option>
            <option value="Events">Events</option>
            <option value="Holidays">Holidays</option>
          </select>
        </div>
        <div className="form-group assignment-date">
          <label>Date Issued:</label>
          <input
            type="date"
            name="dateIssued"
            value={formData.dateIssued}
            readOnly
          />
        </div>
        </div>
        <div className="form-group title">
          <label>Circular ID:</label>
          <input
            type="text"
            name="circular_id"
            value={formData.circular_id}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group title">
          <label>Subject:</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group desc">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-button">
          Create Circular
        </button>
      </form>
    </div>
  );
};

export default AdminCircularsCreate;
