import React from 'react';
import "./modal.css";
import error from "../../Assets/error.png";

const ModalWarning = ({ closeWarningModal, modalContentWarning }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="titleWarning">
                    <img src={error} alt="error" />
                </div>
                <div className="input-group-modal">
                    <h1>Ooops !</h1>
                    {modalContentWarning.map((message) => {
                        return (
                            <p>{message}</p>
                        )
                    })}
                </div>
                <div className="footer"  onClick={() => closeWarningModal(false)}>
                    <h1>OK</h1>
                </div>
            </div>
        </div>
    )
}

export default ModalWarning;