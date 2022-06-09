import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Slackmain.css";
import {
  getHeaders,
  getAllUsers,
  getUserInformation,
} from "../../Helpers/credentials";
import API from "../../api";
import ModalForm from "../../Components/Modal/modalForm";
import plus from "../../Assets/plus.png";
import messagelogo from "../../Assets/message.png";
import Receiver from "../../Components/Receiver/receiver";
import Sender from "../../Components/Sender/sender";
import logo from "../../Assets/logo.png";
import useFindUser from "../../Components/Hooks/useFindUser";

const SlackMain = () => {
  const [channels, setChannels] = useState([{ name: "", id: "" }]);
  const [userList, setUserList] = useState([]);
  const [channelMembers, setChannelMembers] = useState([]);
  const [addToChannel, setAddToChannel] = useState("");
  const [resultAddToChannel, setResultAddToChannel] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [currentChannel, setCurrentChannel] = useState();
  const [searchUser, setSearchUser] = useState("");
  const [messageType, setMessageType] = useState("");
  const [messageContainer, setMessageContainer] = useState([]);
  const [composeMessage, setComposeMessage] = useState("");
  const [dms, setDms] = useState([]);
  const { showEmail, email, setEmail } = useFindUser();
  const [selectedName, setSelectedName] = useState("");

  const [modalFormOpen, setModalFormOpen] = useState(false);

  let navigate = useNavigate();

  const getUserDetails = async () => {
    const { data } = await getAllUsers();
    setUserList(data);
  };

  const handleAddChannel = () => {
    setModalFormOpen(true);
  };

  const displayChannels = async () => {
    try {
      const { data } = await API.get("channels", {
        headers: getHeaders(),
      });
      data.data === undefined
        ? setChannels([{ name: "", id: "" }])
        : setChannels(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const findUser = () => {
    // const findResult = userList.find((findEmail) => {
    //   return findEmail.uid == searchUser;
    // });

    // findResult == undefined
    //   ? setDms([{ id: 0, uid: "User does not exist" }])
    //   : setDms([findResult]);

    // setEmail(searchUser);

    // setDms(showEmail);

    // setSearchUser("");

    if (showEmail.id == 0) {
      setDms([{ id: 0, uid: "User does not exist" }]);
    } else {
      setDms(showEmail);
    }

    setEmail("")
  };

  const findUserChannel = () => {
    const findResult = userList.find((findEmail) => {
      return findEmail.uid == addToChannel;
    });

    findResult == undefined
      ? setResultAddToChannel([{ id: 0, uid: "User does not exist" }])
      : setResultAddToChannel([findResult]);
  };

  const openChannel = async (id, channelType) => {
    setCurrentChannel(id);
    // setMessageType("Channel");
    receiveChannelMessage(id, channelType);

    try {
      const {
        data: { data },
      } = await API.get(`channels/${id}`, {
        headers: getHeaders(),
      });

      const { channel_members } = data;
      const allMembers = channel_members.map((member) => {
        return member.user_id;
      });
      let uidContainer = [];
      allMembers.forEach((memID) => {
        const addDetails = userList.find((userID) => {
          return userID.id == memID;
        });
        uidContainer.push(addDetails);
      });
      setChannelMembers([...uidContainer]);
    } catch (error) {}
  };

  const receiveChannelMessage = async (id, channelType) => {
    try {
      const {
        data: { data },
      } = await API.get(
        `messages?receiver_id=${id}&receiver_class=${channelType}`,
        {
          headers: getHeaders(),
        }
      );
      let containMessage = [];
      console.log(data);
      data.forEach((dt) => {
        containMessage.push({
          message: dt.body,
          timestamp: dt.created_at,
          sender_id: dt.sender.id,
          sender_email: dt.sender.uid,
        });
      });
      setMessageContainer([...containMessage]);
    } catch (error) {}
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const messageBody = {
      receiver_id: currentChannel,
      receiver_class: messageType,
      body: composeMessage,
    };

    try {
      const { data } = await API.post("messages", messageBody, {
        headers: getHeaders(),
      });
      messageType == "Channel"
        ? openChannel(currentChannel, "Channel")
        : receiveChannelMessage(currentChannel, "User");
      setComposeMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const addToExistingChannel = async (selectedUser, ch) => {
    const body = {
      id: currentChannel,
      member_id: selectedUser,
    };
    try {
      const { data } = await API.post("channel/add_member", body, {
        headers: getHeaders(),
      });
      console.log(data);
      data.errors ? alert(data.errors) : setAddToChannel("");
      setResultAddToChannel([]);
      openChannel(currentChannel, ch);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    displayChannels();
  }, [modalFormOpen]);

  useEffect(() => {
    getUserDetails();
    const cur_user = getUserInformation();
    setCurrentUser(cur_user.id);
  }, []);

  const logout = () => {
    navigate("/");
  };

  return (
    <div>
      <div id="main">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="navButton">
          <a onClick={logout}>LOGOUT</a>
        </div>
      </div>
      <div className="section-one">
        <div className="box">
          <div className="tblList">
            <table className="lists">
              <thead>
                <tr>
                  <th>CHANNELS</th>
                </tr>
              </thead>
              <tbody>
                {channels.map(({ name, id }) => {
                  return (
                    <tr key={id + name}>
                      <td
                        onClick={() => {
                          openChannel(id, "Channel");
                          setMessageType("Channel");
                          setSelectedName(name);
                        }}
                      >
                        {name}
                      </td>
                    </tr>
                  );
                })}
                <td>
                  <img src={plus} alt="error" />
                  <a onClick={handleAddChannel}>Add Channel</a>
                </td>
              </tbody>
            </table>
          </div>

          <div className="hr"></div>

          <div className="tblList">
            <table className="lists">
              <thead>
                <tr>
                  <th>DIRECT MESSAGE</th>
                </tr>
              </thead>
              <tbody>
                {dms.map(({ id, uid }) => {
                  return (
                    <tr key={id + uid}>
                      <td
                        onClick={() => {
                          receiveChannelMessage(id, "User");
                          setCurrentChannel(id);
                          setMessageType("User");
                          setChannelMembers([]);
                          setSelectedName(uid);
                        }}
                      >
                        {uid}
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td className="bg_search">
                    <input
                      className="search_users"
                      type="text"
                      placeholder="Enter user email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && findUser()}
                    />
                    <button className="search_button1" onClick={findUser}>
                      Search
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="section-two">
        <div>
          <p>{selectedName}</p>
        </div>
        <ul id="chat">
          {messageContainer.map(
            ({ message, timestamp, sender_id, sender_email }) => {
              return sender_id == currentUser ? (
                <Sender
                  message={message}
                  timestamp={timestamp}
                  sender_id={sender_id}
                  sender_email={sender_email}
                />
              ) : (
                <Receiver
                  message={message}
                  timestamp={timestamp}
                  sender_id={sender_id}
                  sender_email={sender_email}
                />
              );
            }
          )}
        </ul>

        <div className="msgFooter">
          <textarea
            placeholder="Type your message"
            value={composeMessage}
            onChange={(e) => {
              setComposeMessage(e.target.value);
            }}
          ></textarea>
          <a onClick={sendMessage}>Send</a>
        </div>
      </div>

      <div className="section-three align-center">
        <div className="box">
          <div className="tblList">
            {messageType == "Channel" ? (
              <table className="lists a">
                <thead>
                  <tr>
                    <th>CHANNEL MEMBERS</th>
                  </tr>
                </thead>
                <tbody>
                  {channelMembers.map(({ id, uid }) => {
                    return (
                      <tr key={id + uid}>
                        <td>
                          {uid}
                          <div class="tooltip">
                            <img
                              src={messagelogo}
                              alt="message"
                              className="message_button"
                              onClick={() => {
                                receiveChannelMessage(id, "User");
                                setCurrentChannel(id);
                                setMessageType("User");
                                setChannelMembers([]);
                                setSelectedName(uid);
                                // setEmail(uid);
                              }}
                            />
                            <span class="tooltiptext">Send message</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td>
                      <input
                        className="search_users"
                        type="text"
                        placeholder="Enter user email"
                        value={addToChannel}
                        onChange={(e) => setAddToChannel(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && findUserChannel()
                        }
                      />
                      <button
                        className="search_button"
                        onClick={findUserChannel}
                      >
                        Search
                      </button>
                    </td>
                  </tr>
                  {resultAddToChannel.map(({ id, uid }) => {
                    return (
                      <tr key={id + uid}>
                        <td>
                          {uid}
                          {id == 0 ? (
                            <></>
                          ) : (
                            <div class="tooltip">
                              <img
                                src={plus}
                                alt="error"
                                className="add_button"
                                onClick={() =>
                                  addToExistingChannel(id, "Channel")
                                }
                              />
                              <span class="tooltiptext">Add to chanel</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      {modalFormOpen && (
        <ModalForm showForm={setModalFormOpen} userList={userList} />
      )}
    </div>
  );
};

export default SlackMain;
