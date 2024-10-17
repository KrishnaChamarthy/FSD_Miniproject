import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const url = "http://localhost:4000";
  const [user, setUser] = useState(localStorage.getItem("user") || ""); // Initialize user state with value from local storage if available
  const [token, setToken] = useState(localStorage.getItem("token") || ""); // Initialize token state with value from local storage if available
  const [studentData, setStudentData] = useState({});
  const [facultyData, setFacultyData] = useState({});
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
  const [facultyCourses, setFacultyCourses] = useState([]);
  const [circularsList, setCircularsList] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [courseInfo, setCourseInfo] = useState([]); 
  const [studentMarks, setStudentMarks] = useState([]);

  useEffect(() => {
    const loadToken = () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      if (storedToken) {
        setToken(storedToken);
      }
      if (storedUser) {
        setUser(storedUser);
      }
    };
    loadToken();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (token) {
        try {
          if (user === "student") {
            await fetchStudentData();
          } else if (user === "faculty") {
            await fetchFacultyData();
          }
        } catch (error) {
          console.error("Error during fetching data:", error);
          handleLogout();
        }
      }
    };
    loadData();
  }, [token, user]);

  useEffect(() => {
    if (user === "student" && Object.keys(studentData).length > 0) {
      fetchAttendanceData();
      fetchCoursesData();
      fetchStudentMarks();
    } else if (user === "faculty" && Object.keys(facultyData).length > 0) {
      // Fetch additional data for faculty if needed
      
    }
    fetchTimetable();
    fetchCourseInfo();
    fetchCirculars();

  }, [studentData, facultyData, user]);

  const fetchStudentData = async () => {
    try {
      const response = await axios.get(`${url}/api/student/info`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudentData(response.data.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
      handleLogout();
    }
  };

  const fetchStudentMarks = async () => {
    try{
      const student_PRN = studentData.student_PRN;
      const response = await axios.get(`${url}/api/marks/get`, {
        params: { student_PRN },
      });

      const marksData = response.data.data;      
      setStudentMarks(marksData);
    }catch(error){
      console.log(error);
      
    }
  }

  const fetchFacultyData = async () => {
    try {
      const response = await axios.get(`${url}/api/faculty/info`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFacultyData(response.data.data);
    } catch (error) {
      console.error("Error fetching faculty data:", error);
      handleLogout();
    }
  };

  const fetchCoursesData = async () => {
    try {
      const response = await axios.get(`${url}/api/course/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const allCourses = response.data.data;
      let courses = [];

      if (user === "student") {
        const enrolledCourseCodes = studentData.courses_enrolled || [];
        courses = allCourses.filter(course => enrolledCourseCodes.includes(course.course_code));
      } else if (user === "faculty") {
        const handledCourseCodes = facultyData.courses_handled || [];
        courses = allCourses.filter(course => handledCourseCodes.includes(course.course_code));
      }
    
      setStudentCourses(courses);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSemesterCourses = async (sem) => {
    try {
      const response = await axios.get(`${url}/api/course/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const allCourses = response.data.data;
      const filteredCourses = allCourses.filter((course) => (
        course.semester === sem
      ))
      return filteredCourses;
    } catch (error) {
      console.log(error);
      
    }
  }

  // New function to fetch course information
  const fetchCourseInfo = async () => {
    try {
      const response = await axios.get(`${url}/api/student/course_info`);
      setCourseInfo(response.data.data); // Store course info in state
      
    } catch (error) {
      console.error("Error fetching course info:", error);
    }
  };

  const fetchTimetable = async () => {
    try {
      const response = await axios.get(`${url}/api/timetable/get`);
      setTimetable(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAttendanceData = async () => {
    try {
      const student_PRN = studentData.student_PRN;
      const response = await axios.get(`${url}/api/attendance/info`, {
        params: { student_PRN },
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

      setAttendanceData(aData);
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    setToken("");
    setUser("");
    setStudentData({});
    setFacultyData({});
    setAttendanceData({});
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem("user", newUser);
  };

  const contextValue = {
    url,
    user,
    setUser: updateUser,
    token,
    setToken,
    studentData,
    setStudentData,
    facultyData, 
    setFacultyData,
    attendanceData,
    setAttendanceData,
    studentCourses,
    setStudentCourses,
    fetchSemesterCourses,
    circularsList,
    setCircularsList,
    timetable,
    setTimetable,
    courseInfo, 
    fetchCourseInfo, 
    facultyCourses,
    setFacultyCourses,
    studentMarks,
    setStudentMarks
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
