import React, { useContext, useState } from "react";
import Logo from "../../../assets/Sidebar/logo2.png";
import Toggle from "../../../assets/Sidebar/bx-chevron-right.svg";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../../context/StoreContext";

const AdminSideBar = ({ theme, setTheme }) => {
  const { setToken, setUser } = useContext(StoreContext);
  const [close, setClose] = useState("close");
  const navigate = useNavigate();

  const handleTheme = () => {
    theme === "dark" ? setTheme("") : setTheme("dark");
  };

  const handleClose = () => {
    close === "close" ? setClose("") : setClose("close");
  };

  const handleLogOut = () => {
    setToken("");
    setUser("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className={close === "close" ? "sidebar close" : "sidebar"}>
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
        <img src={Toggle} alt="" className="toggle" onClick={handleClose} />
      </header>

      <div className="menu-bar">
        <div className="menu">
          <li className="search-box">
            <i className="bx bx-search icon"></i>
            <input type="text" placeholder="Search..." />
          </li>
          <ul className="menu-links">
            <li className="nav-link">
              <Link to="/">
                <i className="bx bx-bell icon"></i>
                <span className="text nav-text">Circulars</span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/students">
                <i className="bx bx-user icon"></i>
                <span className="text nav-text">Students</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="bottom-content">
          <li className="">
            <a href="" onClick={handleLogOut}>
              <i className="bx bx-log-out icon"></i>
              <span className="text nav-text">Logout</span>
            </a>
          </li>
          <li className="mode">
            <div className="moon-sun">
              <i
                className={
                  theme === "" ? "bx bx-moon icon moon" : "bx bx-sun icon sun"
                }
              ></i>
            </div>
            <span className="mode-text text">
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </span>
            <div className="toggle-switch">
              <span className="switch" onClick={handleTheme}></span>
            </div>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default AdminSideBar;
