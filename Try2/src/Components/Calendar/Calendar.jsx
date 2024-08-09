import React, { useEffect, useState } from "react";
import "./Calendar.css";

const Calendar = () => {

    const [date, setDate] = useState(new Date());

    const months = ["January","February","March","April","May","June","July",
        "August","September","October","November","December"]

        const updateCalendar = () => {
            let currYear = date.getFullYear();
            let currMonth = date.getMonth();
            let today = new Date();
            let currentDate = today.getDate();
            let isCurrentMonth = currYear === today.getFullYear() && currMonth === today.getMonth();
    
            let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
            let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
            let lastDateOfPrevMonth = new Date(currYear, currMonth, 0).getDate();
    
            const days = [];
    
            for (let i = firstDayOfMonth; i > 0; i--) {
                days.push(<li key={`prev-${i}`} className="inactive">{lastDateOfPrevMonth - i + 1}</li>);
            }
    
            for (let i = 1; i <= lastDateOfMonth; i++) {
                const isActive = isCurrentMonth && i === currentDate ? "active" : "";
                days.push(<li key={i} className={isActive}>{i}</li>);
            }
    
            const remainingDays = 35 - days.length; 
            for (let i = 1; i <= remainingDays; i++) {
                days.push(<li key={`next-${i}`} className="inactive">{i}</li>);
            }
    
            return days;
        };
    
        const handlePrevMonth = () => {
            setDate(prevDate => {
                const prevMonth = prevDate.getMonth() - 1;
                return new Date(prevDate.getFullYear(), prevMonth, 1);
            });
        };
    
        const handleNextMonth = () => {
            setDate(prevDate => {
                const nextMonth = prevDate.getMonth() + 1;
                return new Date(prevDate.getFullYear(), nextMonth, 1);
            });
        };

  return (
    <div className="wrapper">
      <header>
        <p className="current-date">{months[date.getMonth()] + " " + date.getFullYear()}</p>
        <div className="icons">
          <i className="bx bx-chevron-left icon" onClick={handlePrevMonth}></i>
          <i className="bx bx-chevron-right icon" onClick={handleNextMonth}></i>
        </div>
      </header>
      <div className="calender">
        <ul className="weeks">
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <ul className="days">
            {updateCalendar()}
          {/* <li className="inactive">28</li>
          <li className="inactive">29</li>
          <li className="inactive">30</li>
          <li className="inactive">31</li>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>10</li>
          <li>11</li>
          <li>12</li>
          <li>13</li>
          <li>14</li>
          <li>15</li>
          <li>16</li>
          <li className="active">17</li>
          <li>18</li>
          <li>19</li>
          <li>20</li>
          <li>21</li>
          <li>22</li>
          <li>23</li>
          <li>24</li>
          <li>25</li>
          <li>26</li>
          <li>27</li>
          <li>28</li>
          <li>29</li>
          <li>30</li>
          <li className="inactive">1</li> */}
        </ul>
      </div>
    </div>
  );
};

export default Calendar;
