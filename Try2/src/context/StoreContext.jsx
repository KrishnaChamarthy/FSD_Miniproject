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
        if (token) {
            fetchStudentData();
            fetchCoursesData();
        }
    }, [token]);

    const fetchStudentData = async () => {
        try {
            const response = await axios.get(`${url}/api/student/info`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response.data.data);
            
            setStudentData(response.data.data);
        } catch (error) {
            console.error("Error fetching student data:", error);
        }
    };

    const fetchAttendanceData = async () => {
        try {
            const response = await axios.get(`${url}/api/attendance/info`, {student_PRN: studentData[student_PRN]});
            console.log(response.data.data);
        } catch (error) {
            console.log(error);
            
        }
    }

    const fetchCoursesData = async () => {
        try {
            const response = await axios.get(`${url}/api/course/list`);
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
    }

    const contextValue = {
        url,
        token,
        setToken,
        studentData,
        setStudentData,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
