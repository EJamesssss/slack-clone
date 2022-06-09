import React from 'react';

const Receiver = ({message, timestamp, sender_email}) => {
    const dt = new Date(timestamp)
    return (
        <div>
            <li className="you">
                <div className="entete">
                    <span className="status green"></span>
                    <h2>{sender_email}</h2>
                    <h3>{dt.toLocaleString()}</h3>
                </div>
                {/* <div className="triangle"></div> */}
                <div className="message">
                    {message}
                </div>
            </li>
        </div>
    )
}

export default Receiver;

