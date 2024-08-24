import React from 'react';
import './WeekSchedule.css';

// Component to render an individual schedule element
const ScheduleElement = ({ title, time }) => {
  return (
    <div className="schedule-element-week">
      <div className="schedule-element-title">{title}</div>
      <div className="schedule-element-time">{time}</div>
    </div>
  );
};

// Helper function to generate time slots at regular intervals (e.g., 30 minutes)
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

// Array of schedule details for the week
const weeklySchedule = {
  Monday: [
    { time: '9:00 AM', title: 'Data Engineering', scheduleTime: '9:00 AM - 10:00 AM', duration: 1 },
    { time: '10:00 AM', title: 'Machine Learning', scheduleTime: '10:00 AM - 12:00 PM', duration: 2 },
  ],
  Tuesday: [
    { time: '9:00 AM', title: 'Cloud Computing', scheduleTime: '9:00 AM - 10:00 AM', duration: 1 },
    { time: '10:00 AM', title: 'Database Systems', scheduleTime: '10:00 AM - 12:00 PM', duration: 2 },
  ],
  Wednesday: [
    { time: '9:00 AM', title: 'AI Ethics', scheduleTime: '9:00 AM - 10:00 AM', duration: 1 },
    { time: '10:00 AM', title: 'Cybersecurity', scheduleTime: '10:00 AM - 12:00 PM', duration: 2 },
  ],
  Thursday: [
    { time: '9:00 AM', title: 'Machine Learning', scheduleTime: '9:00 AM - 10:00 AM', duration: 1 },
    { time: '10:00 AM', title: 'Data Engineering', scheduleTime: '10:00 AM - 12:00 PM', duration: 2 },
  ],
  Friday: [
    { time: '9:00 AM', title: 'Cloud Computing', scheduleTime: '9:00 AM - 10:00 AM', duration: 1 },
    { time: '10:00 AM', title: 'Database Systems', scheduleTime: '10:00 AM - 12:00 PM', duration: 2 },
  ],
};

const WeekSchedule = () => {
  // Generate time slots at 30-minute intervals from 9:00 AM to 5:00 PM
  const timeSlots = generateTimeSlots(9 * 60, 17 * 60, 30); // from 9:00 AM (9*60) to 5:00 PM (17*60)

  return (
    <div className="week-schedule">
      <table className="week-table">
        <thead>
          <tr>
            <th className="time-column">Time</th>
            {Object.keys(weeklySchedule).map((day, index) => (
              <th key={index} className="day-column">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time, index) => (
            <tr key={index}>
              <td className="time-column">{time}</td>
              {Object.keys(weeklySchedule).map((day, dayIndex) => {
                const event = weeklySchedule[day].find(slot => slot.time === time);

                if (event) {
                  // If there's an event, calculate the rowSpan based on the duration
                  const rowSpan = event.duration * (60 / 30); // 60 minutes divided by the interval (30 minutes)

                  return (
                    <td key={dayIndex} rowSpan={rowSpan} className="day-column">
                      <ScheduleElement title={event.title} time={event.scheduleTime} />
                    </td>
                  );
                } else {
                  // Only render an empty cell if there is no event that spans into this slot
                  const isCoveredBySpan = weeklySchedule[day].some(slot => {
                    const slotStart = parseInt(slot.time.split(':')[0], 10) * 60 + parseInt(slot.time.split(':')[1], 10);
                    const slotEnd = slotStart + slot.duration * 60;
                    const currentTime = parseInt(time.split(':')[0], 10) * 60 + parseInt(time.split(':')[1], 10);

                    return currentTime > slotStart && currentTime < slotEnd;
                  });

                  return !isCoveredBySpan ? <td key={dayIndex} className="day-column"></td> : null;
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
