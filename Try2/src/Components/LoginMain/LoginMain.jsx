import React, { useContext, useState } from 'react'
import "./LoginMain.css"
import StudentLoginIcon from "../../assets/log.svg";
import TeacherLoginIcon from "../../assets/register.svg";
import Logo from "../../assets/Sidebar/logo2.png"
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const LoginMain = () => {

  const [studentLogin, setStudentLogin] = useState(true);
  const {url, setToken} = useContext(StoreContext);
  const [data, setData] = useState({
    email: "",
    password:""
  });

  const handleLoginChange = () => {
    setStudentLogin(!studentLogin);
  }

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({
      ...data,
      [name]: value
    }))
    console.log(data);
    
  }

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (studentLogin){
      newUrl += "/api/student/login";
    }
    else{
      newUrl += "/api/faculty/login";
    }

    const response = await axios.post(newUrl, data);
    if (response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      Navigate("/")
    }
    else{
      alert(response.data.message);
    }

  }

  return (
    <div class={studentLogin ? "login-container" : "login-container sign-up-mode"}>
      <div class="forms-container">
        <div class="signin-signup">
          <form onSubmit={onLogin} class="sign-in-form">
            <img src={Logo} alt="" />
            <h2 class="title">Student Login</h2>
            <div class="input-field">
              <i class="fas fa-envelope"></i>
              <input type="text" onChange={onChangeHandler} placeholder="Email" name='email'/>
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input type="password" onChange={onChangeHandler} placeholder="Password" name='password'/>
            </div>
            <input type="submit" value="Login" class="btn solid" />
          </form>
          <form onSubmit={onLogin} class="sign-up-form">
            <img src={Logo} alt="" />
            <h2 class="title">Faculty Login</h2>
            <div class="input-field">
              <i class="fas fa-envelope"></i>
              <input type="email" onChange={onChangeHandler} placeholder="Email" name='email'/>
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input type="password" onChange={onChangeHandler} placeholder="Password" name='password'/>
            </div>
            <input type="submit" class="btn" value="Login" />
          </form>
        </div>
      </div>

      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>Faculty ?</h3>
            <p>
              For Faculty and Admin Login, click here!
            </p>
            <button class="btn transparent" onClick={() => {handleLoginChange()}}>
              Faculty Login
            </button>
          </div>
          <img src={StudentLoginIcon} class="image" alt="" />
        </div>
        <div class="panel right-panel">
          <div class="content">
            <h3>Student ?</h3>
            <p>
              For MIT-WPU Student Login, click here!
            </p>
            <button class="btn transparent" onClick={() => {
              handleLoginChange()
            }}>
              Student Login
            </button>
          </div>
          <img src={TeacherLoginIcon} class="image" alt="" />
        </div>
      </div>
    </div>
  )
}

export default LoginMain