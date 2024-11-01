import React, {useContext} from 'react';
import { StoreContext } from '../../../context/StoreContext';


const FacultyAssignmentsView = ({ setActivePage, assignment }) => {
  const { url } = useContext(StoreContext); 

  return (
    <div className='faculty-assignments-element'>
      <div className="element-title-course">
        View Assignment Stats
        <div className="add-assignment" onClick={() => { setActivePage('list'); }}>
          <i className='bx bx-arrow-back'></i>
          Go Back
        </div>
      </div>
      <div className="assignment-title">{assignment.assignment_title}</div>
      <table className="faculty-attendance-table">
        <thead>
          <tr>
            <th>Student PRN</th>
            <th>Course</th>
            <th>Submitted On</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>
          {assignment.submissions && assignment.submissions.length > 0 ? (
            assignment.submissions.map((submission, index) => (
              <tr key={index}>
                <td>{submission.student_PRN}</td>
                <td>{assignment.course_code}</td>
                <td>{new Date(submission.submission_date).toLocaleDateString()}</td>
                <td>
                  <a 
                    href={`${url}/${submission.submission}`} 
                    download={`${submission.student_PRN}_submission.pdf`} 
                  >
                    Download PDF
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No submissions available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FacultyAssignmentsView;
