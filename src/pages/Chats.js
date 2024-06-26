// pages/Home.js
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import '../Css/Homepage.css';

function Chats() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    //fetch data for running events
    const token = localStorage.getItem('token')
    axios.get("http://localhost:8000/event_management/chat/",{
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
        <Link to="/send_chat">Send Chat</Link>
      <h1>Chats</h1>
      <div className="grid">
        {/* Display upcoming events */}
        {messages.map((currentpost) => {
          const {id, sender_email,send_to, chat_time,message } = currentpost;
          return (
            // <Link to={`/event/${id}/`} key={id} className="event-link">
              <div className="card" key={currentpost.id}>
                {/* <img className="img" src={`http://127.0.0.1:8000/${image}`} alt={name} /> */}
                <h2>{sender_email.toUpperCase()}</h2>
                <h4>{chat_time}</h4>
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

export default Chats;
