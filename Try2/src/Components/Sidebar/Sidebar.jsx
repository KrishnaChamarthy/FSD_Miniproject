import React, { useContext, useState } from "react";
import "./Sidebar.css";
import Logo from "../../assets/Sidebar/logo2.png";
import Toggle from "../../assets/Sidebar/bx-chevron-right.svg";
import { Link, Navigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Sidebar = ({theme, setTheme}) => {

  const {setToken} = useContext(StoreContext);
  const [close, setClose] = useState("close");

  const handleTheme = () => {
    theme === "dark" ? setTheme("") : setTheme("dark");
  }

  const handleClose = () => {
    close === "close" ? setClose("") : setClose("close");
  }

  const handleLogOut = () => {
    setToken("");
    localStorage.removeItem("token");
    Navigate("/");
  }

  return (
    <nav className={close==="close"? "sidebar close" : "sidebar"}>
      <header>
        <div className="image-text">
          <span className="image">
            <img src={Logo} alt="" />
          </span>

          <div className="text header-text">
            <span className="name">MIT WPU</span>
            <span className="profession">Student Portal</span>
          </div>
        </div>
        <img src={Toggle} alt="" className="toggle" onClick={handleClose}/>
      </header>

      <div className="menu-bar">
        <div className="menu">
          <li  className="search-box">
            <i className="bx bx-search icon"></i>
            <input type="text" placeholder="Search..." />
          </li>
          <ul className="menu-links">
            <li className="nav-link">
              <Link to="/" >
                <i className="bx bx-home-alt icon"></i>
                <span className="text nav-text">Dashboard</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/profile">
              <i className='bx bx-user icon'></i>
                <span className="text nav-text">Profile</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/attendance">
              <i className='bx bx-bar-chart-square icon'></i>
                <span className="text nav-text">Attendance</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/timetable">
              <i className='bx bx-calendar icon' ></i>
                <span className="text nav-text">Time Table</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/circulars">
                <i className="bx bx-bell icon"></i>
                <span className="text nav-text">Circulars</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/result">
                <i className="bx bx-chart icon"></i>
                <span className="text nav-text">Result</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/lms">
                <i className="bx bx-book-open icon"></i>
                <span className="text nav-text">LMS</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/fees" >
                <i className="bx bx-wallet icon"></i>
                <span className="text nav-text">Fees</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="bottom-content">
          <li className="">
            <a href="" onClick={handleLogOut}>
              <i className="bx bx-log-out icon"></i>
              <span className="text nav-text" >Logout</span>
            </a>
          </li>
          <li className="mode">
            <div className="moon-sun">
            <i className={theme===""?"bx bx-moon icon moon" : "bx bx-sun icon sun"}></i>

            </div>
            <span className="mode-text text">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            <div className="toggle-switch">
              <span className="switch" onClick={handleTheme}>

              </span>
            </div>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
