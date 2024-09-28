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
import Fees from "./Pages/Fees/Fees";
import Requests from "./Pages/Requests/Requests";
import Login from "./Pages/Login/Login";
import { StoreContext } from "./context/StoreContext";
import FacultySidebar from "./Faculty/Components/FacultySidebar/FacultySidebar";
import FacultyDashboard from "./Faculty/Pages/FacultyDashboard/FacultyDashboard";
import FacultyAttendance from "./Faculty/Pages/FacultyAttendance/FacultyAttendance"
import FacultyGradebook from "./Faculty/Pages/FacultyGradebook/FacultyGradebook"
import FacultyAssignments from "./Faculty/Pages/FacultyAssignments/FacultyAssignments";
import FacultyProfile from "./Faculty/Pages/FacultyProfile/FacultyProfile";

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
            <Route path="/fees/*" element={<Fees />} />
            <Route path="/requests/*" element={<Requests />} />
          </Routes>
        </>
      ) : (
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
      )}
    </div>
  );
};

export default App;
