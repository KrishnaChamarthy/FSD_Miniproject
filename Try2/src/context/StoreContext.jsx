import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [studentData, setStudentData] = useState({});
    const [attendanceData, setAttendanceData] = useState();
    const [studentCourses, setStudentCourses] = useState([]);

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
                params:{
                    student_PRN: student_PRN
                }
            });    
            
            const totalClasses = response.data.data.length;
            const presentClasses = response.data.data.filter(record => record.status === 'Present').length;
            const percentage = (presentClasses/totalClasses) * 100;
            const aData = {
               "presentClasses": presentClasses,
               "totalClasses": totalClasses,
               "percentage": percentage.toFixed(0)
            }
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

    const contextValue = {
        url,
        token,
        setToken,
        studentData,
        setStudentData,
        attendanceData,
        setAttendanceData,
        studentCourses,
        setStudentCourses
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
