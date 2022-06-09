import React, { useState } from "react";
import API from "../../api";
import { getHeaders } from "../../Helpers/credentials";
import "./modal.css";
import ModalWarning from "./modalWarning";
import ModalSuccess from "./modalSuccess";

const ModalForm = ({ showForm, userList }) => {
  const [channelName, setChannelName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [addMember, setAddMember] = useState([]);
  const [fetchUserID, setFetchUserID] = useState([]);

  const [modalWarning, setModalWarning] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const modals = (modalDisplay, modalContent) => {
    setModalWarning(modalDisplay);
    setWarningMessage(modalContent);
  };

  const success = (modalDisplay, modalContent) => {
    setModalSuccess(modalDisplay)
    setWarningMessage(modalContent)
  }

  const bulkAdd = (e) => {
    e.preventDefault();

    const getUID = userList.find((user) => {
      return user.uid == userEmail;
    });

    console.log(getUID);

    function addUserDetails() {
      const checkExisting = addMember.includes(getUID.id);
      if (checkExisting) {
        modals(true, ["User already added to this channel"]);
      } else {
        setAddMember([...addMember, getUID.id]);
        setFetchUserID([...fetchUserID, getUID.uid]);
        setUserEmail("");
      }
    }

    getUID == undefined
      ? modals(true, ["User does not exist"])
      : addUserDetails();
  };

  const addChannel = async (e) => {
    e.preventDefault();

    const reqBody = {
      name: channelName,
      user_ids: addMember,
    };

    try {
      const { data } = await API.post("channels", reqBody, {
        headers: getHeaders(),
      });
      console.log(data);
      success(true,`Successfully created ${channelName}`)
      setChannelName("");
      setAddMember([]);
      setFetchUserID([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="form-title">
          <h2>Create Channel</h2>
          <h2 className="closoButton" onClick={() => showForm(false)}>
            X
          </h2>
        </div>
        {fetchUserID.map ((fetchUID) => {
          return (
            <p>
          {fetchUID}
        </p>
          )
        } ) }
        <div className="input-group-modal">
          <form>
            <input
              type="text"
              placeholder="Enter Channel Name"
              required=""
              value={channelName}
              onChange={(e) => {
                setChannelName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Enter User email"
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
            />
          </form>
        </div>
        <div className="formFooter">
          <button onClick={bulkAdd}> Add Member </button>
          <button onClick={addChannel}> Create Channel </button>
        </div>
      </div>
      {modalSuccess && (
        <ModalSuccess
          closeModal={setModalSuccess}
          modalContent={warningMessage}
        />
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

export default ModalForm;
