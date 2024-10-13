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
    return studentMarks.filter(mark => mark.semester === sem.toString())
  }

  const getCoursemarks = (course_code) => {
    return studentMarks.filter(mark => mark.course_code === course_code);
  }

  function calculateGPA(semesterMarks) {
    let totalMarks = 0;
    let totalSubjects = semesterMarks.length;
  
    semesterMarks.forEach((mark) => {
      const subjectTotal = mark.internalMarks + mark.externalMarks;
      totalMarks += subjectTotal;
    });
  
    let averageMarks = totalMarks / totalSubjects;
  
    let gpa = (averageMarks / 100) * 10;
  
    return gpa.toFixed(2);  
  }

  const handleSemesterResult = (sem) => {      
    let temp_gpas = [];
    let temp_cgpas = [];
    let totalGPA = 0;

    for (let i = 1; i <= sem; i++) {
      let g = calculateGPA(getSemesterMarks(i));
      temp_gpas.push(g);
      totalGPA += parseFloat(g);

      let cgpa = totalGPA / i;
      temp_cgpas.push(cgpa.toFixed(2)); 
    }

    setGpas(temp_gpas);
    setCgpas(temp_cgpas);
    
  };

  useEffect(() => {
    if (studentMarks && studentMarks.length > 0) {
      handleSemesterResult(studentData.semester);
    }
  }, [studentMarks, studentData.semester]);

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
    labels: gpas.map((_, index) => `Semester ${index + 1}`),
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
          <p><span>{cgpas[cgpas.length - 1]}</span>
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