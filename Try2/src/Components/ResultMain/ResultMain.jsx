import React, { useContext, useEffect, useState } from 'react'
import "./ResultMain.css"
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Ticks, Colors } from 'chart.js';
import { StoreContext } from '../../context/StoreContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);



const ResultMain = () => {

  const [semester, setSemester] = useState("5th Semester");
  const [openSemesterDropdown, setOpenSemesterDropdown] = useState(false);
  const [gpas, setGpas] = useState([]);
  const [cgpas, setCgpas] = useState([]);

  const {studentMarks, studentData} = useContext(StoreContext);

  const getSemesterMarks = (sem) => {
        return studentMarks.filter(mark => mark.semester === sem)
  }

  const getCoursemarks = (course_code) => {
    return studentMarks.filter(mark => mark.course_code === course_code);
  }

  const calculateGPA = (marks) => {
    if (marks.length === 0) return 0;
    const totalMarks = marks.reduce((acc, mark) => acc + mark.totalMarks, 0);
    return (totalMarks / marks.length) / 10; 
  };

  const calculateCGPA = (upToSemesterIndex) => {
    const gpaSum = gpas.slice(0, upToSemesterIndex + 1).reduce((acc, gpa) => acc + gpa, 0);
    const completedSemesters = gpas.slice(0, upToSemesterIndex + 1).length;
    return completedSemesters > 0 ? gpaSum / completedSemesters : 0;
  }

  const handleSemesterResult = (sem) => {
    const marks = getSemesterMarks(sem);
    console.log(marks);
    
    const calculatedGPA = calculateGPA(marks);
    
    const updatedGpas = [...gpas];
    const semIndex = sem - 1;
    updatedGpas[semIndex] = calculatedGPA;

    setGpas(updatedGpas);

    const calculatedCGPA = calculateCGPA(semIndex);
    const updatedCgpas = [...cgpas];
    updatedCgpas[semIndex] = calculatedCGPA;

    setCgpas(updatedCgpas);
    
  };

  useEffect(() => {
    handleSemesterResult(studentData.semester-2);
  }, []);

  const handleOpenDropdown = () => {
    setOpenSemesterDropdown(!openSemesterDropdown);
  };

  const handleClick = (sem) => {
    setSemester(sem);
    setOpenSemesterDropdown(!openSemesterDropdown);
  };

  const rootStyles = getComputedStyle(document.documentElement);
  const textColor = rootStyles.getPropertyValue('--text-color').trim();
  const bodyColor = rootStyles.getPropertyValue('--body-color').trim();
  const data = {
    labels: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'],
    datasets: [
      {
        label: 'CGPA',
        data: cgpas, 
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'GPA',
        data: gpas,
        borderColor: 'rgba(153,102,255,1)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        offset: true,
        min: 4,
        max: 10,
        ticks: {
          color: textColor,
        },
        grid: {
          color: bodyColor,  
        },border: {
          color: bodyColor,  
        }
      },x: {
        offset: true,  
        ticks: {
          color: textColor,
        },
        grid: {
          color: bodyColor,  
        },
      },

    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: textColor,
        },
      },
      title: {
        display: false
      },
    },
  };

  return (
    <div className='result-container'>
         <header>
        <div className="header-text">
          Student Marksheet
          <br />
          <span>View Your Results.</span>
        </div>
        <div className="header-search">
          <i className="bx bx-search"></i>
          <input type="text" placeholder="Search anything..." />
        </div>
        <div className="header-bell">
          <i class="bx bx-bell"></i>
        </div>
      </header>
      <div className="result-body">
        <div className="result-element result-summary">
          <div className="element-title">Summary</div>
          <Line data={data} options={options} className='result-graph'/>
        </div>
        <div className="result-element result-cgpa">
          <div className="element-title">Current CGPA</div>
          <div className="result-cgpa-content">
          <p><span>8.71</span>
            <br />Top 10 students in campus</p>
          </div>
        </div>
        <div className="result-element sub-attendance-summary">
          <div className="element-title-course">
            Semester-Wise Result
            <div className="semester-dropdown">
              <div className="select" onClick={handleOpenDropdown}>
                <span className="selected">{semester}</span>
                <div
                  className={
                    openSemesterDropdown ? "caret caret-rotate" : "caret"
                  }
                ></div>
              </div>
              <ul className={openSemesterDropdown ? "menu menu-open" : "menu"}>
                <li
                  onClick={() => {
                    handleClick("1st Semester");
                  }}
                >
                  1st Semester
                </li>
                <li
                  onClick={() => {
                    handleClick("2nd Semester");
                  }}
                >
                  2nd Semester
                </li>
                <li
                  onClick={() => {
                    handleClick("3rd Semester");
                  }}
                >
                  3rd Semester
                </li>
                <li
                  onClick={() => {
                    handleClick("4th Semester");
                  }}
                >
                  4th Semester
                </li>
                <li
                  onClick={() => {
                    handleClick("5th Semester");
                  }}
                >
                  5th Semester
                </li>
              </ul>
            </div>
          </div>
          <table className="result-table">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Internal Marks</th>
                <th>External Marks</th>
                <th>Total Marks</th>
                <th>Grade</th>
              </tr>
            </thead>
            
          </table>
        </div>
      </div>
    </div>
  )
}

export default ResultMain