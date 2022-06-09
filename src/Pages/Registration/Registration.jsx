import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import "./Registration.css";
import ModalWarning from "../../Components/Modal/modalWarning";
import ModalSuccess from "../../Components/Modal/modalSuccess";

const Registration = ({ showRegistration }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [modalWarning, setModalWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  let navigate = useNavigate()

  const registerUser = async (e) => {
    e.preventDefault();

    const newAccount = {
      email,
      password,
      password_confirmation,
    };

    try {
      const response = await API.post("auth", newAccount);
      setSuccessMessage("Your account has been created successfully");
      setModalOpen(true);
    } catch (error) {
      setWarningMessage(error.response.data.errors.full_messages);
      setModalWarning(true);
    }

    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
  };
  return (
    <div className="registration">
      <div class="login-box">
        <h2>Register</h2>
        <form>
          <div class="user-box">
            <input
              type="text"
              name=""
              required=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>
          <div class="user-box">
            <input
              type="password"
              name=""
              required=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          <div class="user-box">
            <input
              type="password"
              name=""
              required=""
              value={password_confirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <label>Confirm Password</label>
          </div>
          <div className="buttons">
            <a onClick={registerUser}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </a>

              {" "}
              <a href="#" onClick={() => navigate("/")}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Cancel
              </a>
          </div>
        </form>
      </div>
      {modalOpen && (
        <ModalSuccess closeModal={setModalOpen} modalContent={successMessage} />
      )}
      {modalWarning && (
        <ModalWarning
          closeWarningModal={setModalWarning}
          modalContentWarning={warningMessage}
        />
      )}
    </div>
  );
};

export default Registration;
