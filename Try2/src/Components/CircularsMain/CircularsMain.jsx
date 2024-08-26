import React from 'react'
import "./CircularsMain.css"

const CircularsMain = () => {
  return (
    <div className='circulars-container'>
         <header>
        <div className="header-text">
          Circulars
          <br />
          <span>View Circulars/Notices.</span>
        </div>
        <div className="header-search">
          <i className="bx bx-search"></i>
          <input type="text" placeholder="Search anything..." />
        </div>
        <div className="header-bell">
          <i className="bx bx-bell"></i>
        </div>
      </header>
      <div className="circulars-body">
      <div className="circulars-element circulars-summary">
          <div className="element-title">Summary</div>
            <ul className="circulars-summary-content">
            <li className="important">
            <i class="material-icons-outlined">report_problem</i>
              <div className="circulars-label">Important</div>
              <div className="circulars-amount">5</div>
            </li>
            <li className="unread">
            <i class="material-icons-outlined">mark_email_unread</i>
            <div className="circulars-label">Unread</div>
              <div className="circulars-amount">20</div>
            </li>
            </ul>
        </div>
        <div className="circulars-element circulars-categories">
          <div className="element-title">Circulars Categories</div>
          <ul className="circulars-categories-content">
            <li className="academic">
            <i class="material-icons-outlined">school</i>
            <div className="circulars-label">Academic</div>
              <div className="circulars-amount">5</div>
            </li>
            <li className="administrative">
              <i class="material-icons-outlined">history_edu</i>
              <div className="circulars-label">Administrative</div>
              <div className="circulars-amount">5</div>
            </li>
            <li className="events">
              <i class="material-icons-outlined">emoji_events</i>
              <div className="circulars-label">Events</div>
              <div className="circulars-amount">5</div>
            </li>
            <li className="holidays">
              <i class="bx bx-calendar-event"></i>
              <div className="circulars-label">Holidays</div>
              <div className="circulars-amount">5</div>
            </li>
            <li className="exams">
            <i class="material-icons-outlined">quiz</i>
              <div className="circulars-label">Exams</div>
              <div className="circulars-amount">5</div>
            </li>
          </ul>
        </div>
        <div className="circulars-element circulars-list">
            <div className="element-title">Circulars</div>
            <table className='circulars-table'>
            <tr>
              <th className='id'>Circular ID</th>
              <th className='sub'>Circular Subject</th>
              <th className='cat'>Category</th>
              <th className='date'>Date</th>
              <th className='read'></th>
            </tr>
            <tr>
              <td>Notice_01</td>
              <td>Academic</td>
              <td><div className="academic-category">Academic</div></td>
              <td>26/08/24</td>
              <td><div className="unread"></div></td>
            </tr>
            <tr>
              <td>Circular_01</td>
              <td>Administrative</td>
              <td><div className="administrative-category">Administrative</div></td>
              <td>26/08/24</td>
              <td><div className="unread"></div></td>
            </tr>
            <tr>
              <td>Notice_02</td>
              <td>Events</td>
              <td><div className="events-category">Events</div></td>
              <td>26/08/24</td>
              <td></td>
            </tr>
            <tr>
              <td>Notice_03</td>
              <td>Holidays</td>
              <td><div className="holidays-category">Holidays</div></td>
              <td>26/08/24</td>
              <td><div className="unread"></div></td>
            </tr>
            <tr>
              <td>Circular_02</td>
              <td>Exams</td>
              <td><div className="exams-category">Exams</div></td>
              <td>26/08/24</td>
              <td></td>
            </tr>
          </table>
        </div>
      </div>
      
    </div>
  ) 
}

export default CircularsMain