import React, { useContext, useState } from "react";
import "./AssignmentDisplay.css";
import upload_area from "../../assets/upload_area.png";
import pdf_upload from "../../assets/pdf-upload.png";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const AssignmentDisplay = ({ selectedAssignment }) => {
  const [file, setFile] = useState(null);
  const { studentData, url } = useContext(StoreContext);

  const { course_code, assignment_title, due_date } = selectedAssignment;

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select a file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("course_code", course_code);
    formData.append("assignment_title", assignment_title);
    formData.append("student_PRN", studentData.student_PRN);
    formData.append("submission_date", new Date().toISOString());
    formData.append("submission", file);

    try {
      const response = await axios.post(`${url}/api/assignment/submit`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });

      if (response.data.success) {
        alert("Assignment submitted successfully!");
      } else {
        alert(response.data.message || "Failed to submit assignment.");
      }
    } catch (error) {
      console.error("Error submitting assignment:", error);
      alert("An error occurred while submitting the assignment.");
    }
  };

  return (
    <div className="assignment-popup">
      <div className="assignment-popup-date">
        Due: {new Date(due_date).toLocaleDateString()}
      </div>
      <div className="assignment-popup-title">
        <p>
          {course_code}: {selectedAssignment.course_name}
        </p>
        <p>{assignment_title}</p>
      </div>
      <div className="assignment-popup-content">
        <p>
          {selectedAssignment.assignment_description ||
            "No description provided."}
        </p>
      </div>
      <p>Upload File</p>
      <label htmlFor="file">
        <img src={file ? pdf_upload : upload_area} alt="Upload" />
      </label>
      <input
        onChange={(e) => setFile(e.target.files[0])}
        type="file"
        id="file"
        hidden
        required
      />
      <div className="assignment-submit" onClick={handleSubmit}>
        Submit
      </div>
    </div>
  );
};

export default AssignmentDisplay;
