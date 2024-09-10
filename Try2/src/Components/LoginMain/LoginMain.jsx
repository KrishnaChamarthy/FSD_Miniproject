import React, { useContext, useState } from 'react';
import "./LoginMain.css";
import StudentLoginIcon from "../../assets/log.svg";
import TeacherLoginIcon from "../../assets/register.svg";
import Logo from "../../assets/Sidebar/logo2.png";
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginMain = () => {
  const [studentLogin, setStudentLogin] = useState(true);
  const { url, setToken, setUser } = useContext(StoreContext); // Use setUser from context
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleLoginChange = () => {
    setStudentLogin(!studentLogin);
  }

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((data) => ({
      ...data,
      [name]: value
    }));    
  }

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (studentLogin) {
      newUrl += "/api/student/login";
    } else {
      newUrl += "/api/faculty/login";
    }

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setUser(studentLogin ? "student" : "faculty");
        navigate("/"); 
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    }
  }

  return (
    <div className={studentLogin ? "login-container" : "login-container sign-up-mode"}>
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={onLogin} className={studentLogin ? "sign-in-form" : "sign-up-form"}>
            <img src={Logo} alt="" />
            <h2 className="title">{studentLogin ? "Student Login" : "Faculty Login"}</h2>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                onChange={onChangeHandler}
                placeholder="Email"
                name='email'
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                onChange={onChangeHandler}
                placeholder="Password"
                name='password'
                required
              />
            </div>
            <input type="submit" value="Login" className="btn solid" />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Faculty ?</h3>
            <p>
              For Faculty and Admin Login, click here!
            </p>
            <button className="btn transparent" onClick={handleLoginChange}>
              Faculty Login
            </button>
          </div>
          <img src={StudentLoginIcon} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Student ?</h3>
            <p>
              For MIT-WPU Student Login, click here!
            </p>
            <button className="btn transparent" onClick={handleLoginChange}>
              Student Login
            </button>
          </div>
          <img src={TeacherLoginIcon} className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default LoginMain;
