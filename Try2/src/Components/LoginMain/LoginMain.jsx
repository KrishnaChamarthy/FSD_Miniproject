import React, { useState } from 'react'
import "./LoginMain.css"
import StudentLoginIcon from "../../assets/log.svg";
import TeacherLoginIcon from "../../assets/register.svg";
import Logo from "../../assets/Sidebar/logo2.png"

const LoginMain = () => {

  const [studentLogin, setStudentLogin] = useState(true);

  const handleLoginChange = () => {
    setStudentLogin(!studentLogin);
  }

  return (
    <div class={studentLogin ? "login-container" : "login-container sign-up-mode"}>
      <div class="forms-container">
        <div class="signin-signup">
          <form action="#" class="sign-in-form">
            <img src={Logo} alt="" />
            <h2 class="title">Student Login</h2>
            <div class="input-field">
              <i class="fas fa-envelope"></i>
              <input type="text" placeholder="Email" />
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Login" class="btn solid" />
          </form>
          <form action="#" class="sign-up-form">
            <img src={Logo} alt="" />
            <h2 class="title">Faculty Login</h2>
            <div class="input-field">
              <i class="fas fa-envelope"></i>
              <input type="email" placeholder="Email" />
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
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