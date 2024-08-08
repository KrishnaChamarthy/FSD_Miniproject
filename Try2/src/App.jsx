import React, { useState } from 'react'
import Sidebar from './Components/Sidebar/Sidebar'
import {Route, Routes} from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard'
import Profile from "./Pages/Profile/Profile"
import Attendance from "./Pages/Attendance/Attendance"
import TimeTable from './Pages/TimeTable/TimeTable'
import Circulars from './Pages/Circulars/Circulars'
import Result from './Pages/Result/Result'
import LMS from './Pages/LMS/LMS'
import Fees from './Pages/Fees/Fees'
import Requests from './Pages/Requests/Requests'
const App = () => {
  const [theme, setTheme] = useState("");

  return (
    <div className={theme==="dark" ? "app dark" : "app"}>
      <Sidebar setTheme={setTheme} theme={theme}/>
      <Routes>
        <Route path='/' element={<Dashboard />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/attendance' element={<Attendance />}/>
        <Route path='/timetable' element={<TimeTable />}/>
        <Route path='/circulars' element={<Circulars />}/>
        <Route path='/result' element={<Result />}/>
        <Route path='/lms' element={<LMS />}/>
        <Route path='/fees' element={<Fees />}/>
        <Route path='/requests' element={<Requests />}/>
      </Routes>
    </div>
  )
}

export default App
