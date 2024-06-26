// pages/Home.js
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import '../Css/Homepage.css';

function Eventscreatebyme() {
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get("http://localhost:8000/event_management/events_create_by_me/",{
        headers: {
            'Authorization':`Bearer ${token}`
        }
    })
      .then(response => {
        console.log(response.data);
        setEvents(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        // alert("Failed!!")
      });

  }, []); // Empty dependency array to ensure the effect runs only once
  
  return (
    <div>

      <h1>My Events</h1>
      <div className="grid">
        {/* Display upcoming events */}
        {events.map((post) => {
          const { id, name, start_datetime, end_datetime, location, description, image } = post;
          return (
            <Link to={`/event/${id}/`} key={id} className="event-link">
              <div className="card" key={post.id}>
                <img className="img" src={`${image}`} alt={name} />
                <h2>{name.toUpperCase()}</h2>
                <h4>{start_datetime}</h4>
                <h4>{end_datetime}</h4>
                <h3>{location}</h3>
                <p>{description.substring(0, 10)}</p>
              </div>
            </Link>
            
          );
        })}
      </div>
    </div>
  );
}

export default Eventscreatebyme;