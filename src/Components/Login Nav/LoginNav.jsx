import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./LoginNav.css";
import logo from "../../Assets/slacklogo.png";
import Registration from "../../Pages/Registration/Registration";
import "../../Pages/Login/login.css"

const LogInNav = () => {
  const [isLogIn, setIsLogIn] = useState(true);

  const handleRegister = () => {
    setIsLogIn(false)
  }

  return (
    <div id="mainDiv">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="nav">
        
        <h2><Link to="/register">REGISTER</Link></h2>
        {/* {!isLogIn && <Registration showRegistration={setIsLogIn}/>} */}
      </div>
      <Outlet />
    </div>
  );
};

export default LogInNav;
