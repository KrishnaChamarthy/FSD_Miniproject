import React from 'react'
import "./DocumentsProfile.css"

const DocumentsProfile = () => {
  return (
    <div className='documents-profile'>
      <div className="educational-profile-element">
        <div className="element-title">Personal Documents</div>
        <div className="document-table">
          <tr>
            <th>Document Name</th>
            <th>Status</th>
            <th>Upload Date</th>
            <th>Uploaded By</th>
          </tr>
          <tr>
            <td>SSC Marks Sheet</td>
            <td>Approved</td>
            <td>Date</td>
            <td>Student</td>
          </tr>
          <tr>
            <td>HSC Marks Sheet</td>
            <td>Approved</td>
            <td>Date</td>
            <td>Student</td>
          </tr>
          <tr>
            <td>Aadhar Card</td>
            <td>Approved</td>
            <td>Date</td>
            <td>Student</td>
          </tr>
          <tr>
            <td>Birth Certificate</td>
            <td>Approved</td>
            <td>Date</td>
            <td>Student</td>
          </tr>
        </div>
      </div>
    </div>
  )
}

export default DocumentsProfile