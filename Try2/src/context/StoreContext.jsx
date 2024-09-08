import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const url = "http://localhost:4000";

  const [user, setUser] = useState("");

  const [token, setToken] = useState("");
  const [studentData, setStudentData] = useState({});
  const [attendanceData, setAttendanceData] = useState({
    presentClasses: 0,
    totalClasses: 0,
    absentClasses: 0,
    percentage: "0",
    weekly: 0,
    holidays: 0,
    onLeave: 0,
    "course-wise": {},
  });
  const [studentCourses, setStudentCourses] = useState([]);
  const [circularsList, setCircularsList] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (token) {
        await fetchStudentData();
      }
    };
    loadData();
  }, [token]);

  useEffect(() => {
    if (Object.keys(studentData).length > 0) {
      fetchCoursesData();
      fetchAttendanceData();
      fetchCirculars();
    }
  }, [studentData]);

  const fetchStudentData = async () => {
    try {
      const response = await axios.get(`${url}/api/student/info`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudentData(response.data.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const fetchAttendanceData = async () => {
    try {
      const student_PRN = studentData.student_PRN;
      const response = await axios.get(`${url}/api/attendance/info`, {
        params: {
          student_PRN: student_PRN,
        },
      });

      const attendanceRecords = response.data.data;
      const totalClasses = attendanceRecords.length;
      const presentClasses = attendanceRecords.filter(
        (record) => record.status === "Present"
      ).length;
      const percentage = (presentClasses / totalClasses) * 100;

      const courseAttendance = {};

      for (const course of studentData.courses_enrolled) {
        const courseAttendanceRecords = attendanceRecords.filter(
          (record) => record.course_code === course
        );

        const theoryRecords = courseAttendanceRecords.filter(
          (record) => record.type === "T"
        );
        const practicalRecords = courseAttendanceRecords.filter(
          (record) => record.type === "P"
        );

        const totalTheoryClasses = theoryRecords.length;
        const presentTheoryClasses = theoryRecords.filter(
          (record) => record.status === "Present"
        ).length;
        const theoryPercentage =
          totalTheoryClasses > 0
            ? (presentTheoryClasses / totalTheoryClasses) * 100
            : 0;

        const totalPracticalClasses = practicalRecords.length;
        const presentPracticalClasses = practicalRecords.filter(
          (record) => record.status === "Present"
        ).length;
        const practicalPercentage =
          totalPracticalClasses > 0
            ? (presentPracticalClasses / totalPracticalClasses) * 100
            : 0;
        
        courseAttendance[course] = {
          totalClasses: courseAttendanceRecords.length,
          presentClasses: courseAttendanceRecords.filter(
            (record) => record.status === "Present"
          ).length,
          percentage: (
            (courseAttendanceRecords.filter(
              (record) => record.status === "Present"
            ).length /
              courseAttendanceRecords.length) *
            100
          ).toFixed(0),
          theory: {
            totalClasses: totalTheoryClasses,
            presentClasses: presentTheoryClasses,
            percentage: theoryPercentage.toFixed(0),
          },
          practical: {
            totalClasses: totalPracticalClasses,
            presentClasses: presentPracticalClasses,
            percentage: practicalPercentage.toFixed(0),
          },
        };
      }

      const weekly = 104;
      const holidays = 17;
      const onLeave = 365 - (totalClasses + weekly + holidays);

      const aData = {
        presentClasses: presentClasses,
        totalClasses: totalClasses,
        absentClasses: totalClasses - presentClasses,
        percentage: percentage.toFixed(0),
        weekly: weekly,
        holidays: holidays,
        onLeave: onLeave,
        "course-wise": courseAttendance,
      };

      console.log(aData);

      setAttendanceData(aData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCoursesData = async () => {
    try {
      const response = await axios.get(`${url}/api/course/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const allCourses = response.data.data;
      const courses = [];
      const enrolledCourseCodes = studentData.courses_enrolled || [];

      allCourses.forEach((course) => {
        if (enrolledCourseCodes.includes(course.course_code)) {
          courses.push(course);
        }
      });
      setStudentCourses(courses);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCirculars = async () => {
    try {
      const response = await axios.get(`${url}/api/circulars/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const cList = response.data.data;
      const studentPRN = studentData.student_PRN;
      const updatedCircularsList = cList.map((circular) => {
        return {
          ...circular,
          read: circular.read.includes(studentPRN), 
        };
      });
  
      setCircularsList(updatedCircularsList);
      console.log(updatedCircularsList);
      
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = {
    url,
    user,
    setUser,
    token,
    setToken,
    studentData,
    setStudentData,
    attendanceData,
    setAttendanceData,
    studentCourses,
    setStudentCourses,
    circularsList,
    setCircularsList
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
