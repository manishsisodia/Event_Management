// pages/Home.js
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import '../Css/Message.css';

function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    //fetch data for running events
    const token = localStorage.getItem('token')
    axios.get("http://localhost:8000/event_management/messages/",{
      headers: {
        'Authorization':`Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data);
        setMessages(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching Messages:', error);
      });

  }, []); // Empty dependency array to ensure the effect runs only once
  
  return (
    <div>
        <Link to="/send_messages">Send Message</Link>
      <h1>Messages</h1>
      <div className="grid">
        {/* Display upcoming events */}
        {messages.map((currentpost) => {
          const {id, sender_email, message_datetime,message } = currentpost;
          return (
            // <Link to={`/event/${id}/`} key={id} className="event-link">
              <div className="card" key={currentpost.id}>
                {/* <img className="img" src={`http://127.0.0.1:8000/${image}`} alt={name} /> */}
                <h2>{sender_email.toUpperCase()}</h2>
                <h4>{message_datetime}</h4>
                {/* <h4>{event_id}</h4> */}
                <p>{message}</p>
                {/* <p>{description.substring(0, 10)}</p> */}
              </div>
            // </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Messages;
