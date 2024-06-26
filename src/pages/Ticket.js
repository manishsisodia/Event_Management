// pages/Home.js
// import { Link } from 'react-router-dom';
import { Link, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import '../Css/Homepage.css';

function Ticket() {
  const [tickets, setTickets] = useState([]);
  const { event_id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token')
    // Fetch data from backend when the component mounts
    axios.get(`http://localhost:8000/event_management/create_ticket/?id=${event_id}`,{
      headers: {
        'Authorization':`Bearer ${token}`
      }
    })
      .then(response => {
        // Assuming your response data is an array of events
        console.log(response.data);
        if (response.data){
            setTickets(response.data.data);
        }
        else {
            setTickets([])
        }
      })
      .catch(error => {
        console.error('Error fetching tickets:', error);
      });
  }, []); // Empty dependency array to ensure the effect runs only once
  
  return (
    <div>
      <h1>BOOK YOUR SEAT NOW</h1>
      <div className="grid">
        {tickets.map((post)=> {
          const {id,type, cost } = post;
          return (
            <Link to={`/book_ticket/${event_id}/?ticket_id=${id}`} key={id} className="book_ticket-link">
              <div className= "card" key={post.id}>
                {/* <img className="img" src={`http://127.0.0.1:8000/`+image} />
                <h2>{name.toUpperCase()}</h2>
                <h4>{start_datetime}</h4>
                <h4>{end_datetime}</h4>
                <h3>{location}</h3>
                <p>{description.substring(0,10)}</p>
                 */}
                <h2>{type}</h2>
                <h3>{cost} INR</h3>
              </div>
              {/* <div>
                <Link to={`/book_ticket/${id}`}>BOOK-TICKET</Link>
            </div> */}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Ticket;
