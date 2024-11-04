import React, { useContext } from 'react';
import './WeekSchedule.css';
import { StoreContext } from "../../context/StoreContext";

const ScheduleElement = ({ courseCode, time }) => {
  return (
    <div className="schedule-element-week">
      <div className="schedule-element-course-code">{courseCode}</div>
      <div className="schedule-element-time">{time}</div>
    </div>
  );
};

const generateTimeSlots = (start, end, interval) => {
  const times = [];
  let current = start;
  while (current <= end) {
    const hours = Math.floor(current / 60);
    const minutes = current % 60;
    const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
    times.push(formattedTime);
    current += interval;
  }

  return times;
};

const parseTime = (timeString) => {
  const period = timeString.slice(-2);
  const [hours, minutes] = timeString.slice(0, -2).split(':').map(Number);

  let convertedHours = hours;
  if (period === 'PM' && hours !== 12) {
    convertedHours += 12;
  } else if (period === 'AM' && hours === 12) {
    convertedHours = 0;
  }

  return convertedHours * 60 + minutes;
};

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const WeekSchedule = () => {
  const timeSlots = generateTimeSlots(8 * 60, 17 * 60, 30);
  const { timetable } = useContext(StoreContext);
  
  const timetableByDay = daysOfWeek.reduce((acc, day) => {
    acc[day] = [];
    return acc;
  }, {});

  timetable.forEach(event => {
    const day = event.day_of_week;
    if (timetableByDay[day]) {
      timetableByDay[day].push({
        start: parseTime(event.start_time),
        end: parseTime(event.end_time),
        courseCode: event.course_code,
        formattedTime: `${event.start_time} - ${event.end_time}`
      });
    }
  });

  const coveredRows = daysOfWeek.reduce((acc, day) => {
    acc[day] = Array(timeSlots.length).fill(false);
    return acc;
  }, {});

  return (
    <div className="week-schedule">
      <table className="week-table">
        <thead>
          <tr>
            <th className="time-column">Time</th>
            {daysOfWeek.map((day, index) => (
              <th key={index} className="day-column">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time, rowIndex) => (
            <tr key={rowIndex}>
              <td className="time-column">{time}</td>
              {daysOfWeek.map((day, dayIndex) => {
                if (coveredRows[day][rowIndex]) {
                  return <></>;
                }

                const events = timetableByDay[day];
                const event = events.find(e => e.start <= parseTime(time) && e.end > parseTime(time));
                console.log(event);
                
                if (event) {
                  const rowSpan = (event.end - event.start) / 30;

                  for (let i = 0; i < rowSpan; i++) {
                    coveredRows[day][rowIndex + i] = true;
                  }

                  return (
                    <td key={dayIndex} rowSpan={rowSpan} className="day-column">
                      <ScheduleElement courseCode={event.courseCode} time={event.formattedTime} />
                    </td>
                  );
                } else {
                  return <td key={dayIndex} className="day-column"></td>;
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default WeekSchedule;
