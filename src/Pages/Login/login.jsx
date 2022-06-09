import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import ModalWarning from "../../Components/Modal/modalWarning";
import ModalSuccess from "../../Components/Modal/modalSuccess";
import "./login.css";
import icon from "../../Assets/icon.png";
import LogInNav from "../../Components/Login Nav/LoginNav";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [modalWarning, setModalWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  let navigate = useNavigate();

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const resetCredentials = () => {
    localStorage.setItem("usercredentials",(null))
    localStorage.setItem("userinformation",(null))
  }

  const logInUser = async () => {
    // e.preventDefault();

    const body = { email, password };

    try {
      const {
        headers,
        data: { data },
      } = await API.post("auth/sign_in", body);
      setSuccessMessage("You have successfully logged in");
      setModalOpen(true);
      const { expiry, uid, client } = headers;
      const { id, email } = data;
      localStorage.setItem(
        "usercredentials",
        JSON.stringify({
          expiry,
          uid,
          "access-token": headers["access-token"],
          client,
        })
      );
      localStorage.setItem(
        "userinformation",
        JSON.stringify({
          id,
          email,
        })
      );
      navigate("/profile");
      reset();
    } catch ({ response }) {
      console.log(response.data.errors);
      setWarningMessage(response.data.errors);
      setModalWarning(true);
      reset();
    }
  };
  return (
    <div>
      <div className="login-wrap" onLoad={resetCredentials}>
        <div className="icon-img">
          <img src={icon} alt="icon" />
        </div>
        <div className="login-user">
          <h2>Login</h2>
          <form onKeyDown={e => e.key ==='Enter' && logInUser()}>
            <div className="user-box">
              <input
                type="text"
                name=""
                required=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Username</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                name=""
                required=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
            </div>
            <a href="#" onClick={logInUser}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Log In
            </a>
          </form>
        </div>
        {modalOpen && (
          <ModalSuccess
            closeModal={setModalOpen}
            modalContent={successMessage}
          />
        )}
        {modalWarning && (
          <ModalWarning
            closeWarningModal={setModalWarning}
            modalContentWarning={warningMessage}
          />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
