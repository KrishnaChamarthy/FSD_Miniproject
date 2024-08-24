import React from 'react'
import "./DaySchedule.css"

const ScheduleElement = () =>{
  return (
    <div className="schedule-element">
        <div className="schedule-element-title">
          Data Engineering
        </div>
        <div className="schedule-element-time">
          9:30 AM - 10:30 AM
        </div>
    </div>
  )
}

const DaySchedule = () => {
  return (
    <div className='day-schedule'>
      <table className='day-table'>
        <tr>
          <th></th>
          <th className='table-element'>Wed 27</th>
        </tr>
        <tr>
          <td rowSpan={2}>9:00 AM</td>
          <td></td>
        </tr>
        <tr>
          <td className='table-element' rowSpan={2}><ScheduleElement /></td>
        </tr>
        <tr>
          <td rowSpan={2}> 10:00 AM</td>
        </tr>
        <tr>
          <td className='table-element' rowSpan={2}><ScheduleElement /></td>
        </tr>
        <tr>
          <td rowSpan={2}> 11:00 AM</td>
        </tr>
        <tr>
          <td className='table-element' rowSpan={2}><ScheduleElement /></td>
        </tr>
        <tr>
          <td rowSpan={2}> 12:00 AM</td>
        </tr>
      </table>
    </div>
  )
}

export default DaySchedule