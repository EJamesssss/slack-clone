import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/login";
import LoginNav from "./Components/Login Nav/LoginNav";
import SlackMain from "./Pages/Messaging Section/Slackmain";
import Registration from "./Pages/Registration/Registration";

const SlackApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginNav />} >
          <Route index element={<Login />} />
          <Route path="/register" element={<Registration />}></Route>
        </Route>
        <Route path="/profile" element={<SlackMain />} />
      </Routes>
    </Router>
  );
};

export default SlackApp;
