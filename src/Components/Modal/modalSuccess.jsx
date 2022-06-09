import React from 'react';
import "./modal.css";
import success from "../../Assets/success.png";

const ModalSuccess = ({ closeModal, modalContent }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="titleWarning">
                    <img src={success} alt="error" />
                </div>
                <div className="input-group-modal">
                    <h1>Great !</h1>
                    <p>{modalContent}</p>
                </div>
                <div className="footer-success"  onClick={() => closeModal(false)}>
                    <h1>OK</h1>
                </div>
            </div>
        </div>
    )
}

export default ModalSuccess;

