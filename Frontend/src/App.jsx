import React, { useContext, useState } from "react";
import Sidebar from "./Components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Profile from "./Pages/Profile/Profile";
import Attendance from "./Pages/Attendance/Attendance";
import TimeTable from "./Pages/TimeTable/TimeTable";
import Circulars from "./Pages/Circulars/Circulars";
import Result from "./Pages/Result/Result";
import LMS from "./Pages/LMS/LMS";
import Login from "./Pages/Login/Login";
import { StoreContext } from "./context/StoreContext";
import FacultySidebar from "./Faculty/Components/FacultySidebar/FacultySidebar";
import FacultyDashboard from "./Faculty/Pages/FacultyDashboard/FacultyDashboard";
import FacultyAttendance from "./Faculty/Pages/FacultyAttendance/FacultyAttendance"
import FacultyGradebook from "./Faculty/Pages/FacultyGradebook/FacultyGradebook"
import FacultyAssignments from "./Faculty/Pages/FacultyAssignments/FacultyAssignments";
import FacultyProfile from "./Faculty/Pages/FacultyProfile/FacultyProfile";
import AdminSideBar from "./Admin/Components/AdminSideBar/AdminSideBar";
import AdminCirculars from "./Admin/Pages/AdminCirculars/AdminCirculars"
import AdminAddStudents from "./Admin/Pages/AdminAddStudents/AdminAddStudents";
import AdminAddFaculty from "./Admin/Pages/AdminAddFaculty/AdminAddFaculty";
import AdminCourses from "./Admin/Pages/AdminCourses/AdminCourses";

const App = () => {
  const [theme, setTheme] = useState("");
  const { user } = useContext(StoreContext);

  return (
    <div className={theme === "dark" ? "app dark" : "app"}>

      {user === "" ? (
        <Login />
      ) : user === "student" ? (
        <>
          <Sidebar setTheme={setTheme} theme={theme} />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile/*" element={<Profile />} />
            <Route path="/attendance/*" element={<Attendance />} />
            <Route path="/timetable/*" element={<TimeTable />} />
            <Route path="/circulars/*" element={<Circulars />} />
            <Route path="/result/*" element={<Result />} />
            <Route path="/lms/*" element={<LMS />} />
          </Routes>
        </>
      ) : user === "faculty" ? (
        <>
          <FacultySidebar setTheme={setTheme} theme={theme} />
          <Routes>
            <Route path="/" element={<FacultyDashboard />}/>
            <Route path="/profile/*" element={<FacultyProfile />}/>
            <Route path="/attendance/*" element={<FacultyAttendance />}/>
            <Route path="/gradebook/*" element={<FacultyGradebook />}/>
            <Route path="/assignments/*" element={<FacultyAssignments />}/>
          </Routes>
        </>
      ): (
        <>
        <AdminSideBar setTheme={setTheme} theme={theme} />
        <Routes>
          <Route path="/" element={<AdminCirculars />}/>
          <Route path="/students/*" element={<AdminAddStudents />}/>
          <Route path="/faculty/*" element={<AdminAddFaculty />}/>
          <Route path="/courses/*" element={<AdminCourses />}/>
        </Routes>
        </>
      )}
    </div>
  );
};

export default App;
