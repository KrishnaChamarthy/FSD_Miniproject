import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import Dashboard from './Pages/Dashboard/Dashboard'
import Profile from "./Pages/Profile/Profile"
import Attendance from "./Pages/Attendance/Attendance"
import TimeTable from './Pages/TimeTable/TimeTable'
import Circulars from './Pages/Circulars/Circulars'
import Result from './Pages/Result/Result'
import LMS from './Pages/LMS/LMS'
import Fees from './Pages/Fees/Fees'
import Requests from './Pages/Requests/Requests'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <div className='app'>
      <Sidebar activePage={activePage} setActivePage={setActivePage}/>
      <Navbar />
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
