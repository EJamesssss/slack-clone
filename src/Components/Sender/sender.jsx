import React from "react";

const Sender = ({message, timestamp, sender_email}) => {
  const dt = new Date(timestamp)
  return (
    <div>
      <li className="me">
        <div className="entete">
          <h2>{sender_email}</h2>
          <h3>{dt.toLocaleString()}</h3>
          <span className="status blue"></span>
        </div>
        {/* <div className="triangle"></div> */}
        <div className="message">
            {message}
        </div>
      </li>
    </div>
  );
};

export default Sender;
