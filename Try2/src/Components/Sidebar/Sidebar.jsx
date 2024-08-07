import React from "react";
import "./Sidebar.css";
import Logo from "../../assets/Sidebar/logo.png";
import Toggle from "../../assets/Sidebar/bx-chevron-right.svg";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <header>
        <div className="image-text">
          <span className="image">
            <img src={Logo} alt="" />
          </span>

          <div className="text header-text">
            <span className="name">CodingLab</span>
            <span className="profession">Web developer</span>
          </div>
        </div>
        <img src={Toggle} alt="" className="toggle" />
      </header>

      <div className="menu-bar">
        <div className="menu">
          <li className="search-box">
            <i class="bx bx-search icon"></i>
            <input type="search" placeholder="Search..." />
          </li>
          <ul className="menu-links">
            <li className="nav-link">
              <a href="">
                <i class="bx bx-home-alt icon"></i>
                <span className="text nav-text">Dashboard</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="">
                <i class="bx bx-bar-chart-alt-2 icon"></i>
                <span className="text nav-text">Revenue</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="">
                <i class="bx bx-bell icon"></i>
                <span className="text nav-text">Notifications</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="">
                <i class="bx bx-pie-chart-alt icon"></i>
                <span className="text nav-text">Analytics</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="">
                <i class="bx bx-heart icon"></i>
                <span className="text nav-text">Likes</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="">
                <i class="bx bx-wallet icon"></i>
                <span className="text nav-text">Wallets</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="bottom-content">
          <li className="">
            <a href="">
              <i class="bx bx-log-out icon"></i>
              <span className="text nav-text">Logout</span>
            </a>
          </li>
          <li className="mode">
            <div className="moon-sun">
            <i class="bx bx-moon icon moon"></i>
            <i class="bx bx-sun icon sun"></i>

            </div>
            <span className="mode-text text">Dark Mode</span>
            <div className="toggle-switch">
              <span className="switch">

              </span>
            </div>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
