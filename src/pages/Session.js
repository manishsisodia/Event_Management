import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import Forgotpasssword from './Forgotpassword';
import { useNavigate } from 'react-router-dom';

function Session() {
    const [current, setCurrent] = useState([]);
    const currentUserEmail = localStorage.getItem('email');
    const {event_id}=useParams()

    useEffect(() => {
        const token=localStorage.getItem('token')
        //fetch data for running events
        axios.get(`http://localhost:8000/event_management/session/?event_id=${event_id}`,{
            headers: {
                'Authorization':`Bearer ${token}`
            }
        })
          .then(response => {
            console.log(response.data);
            setCurrent(response.data.data);
          })
          .catch(error => {
            console.error('Error fetching session:', error);
          });
        }, []);

        // const isHost = currentUserEmail === host_email;

        return (
            <div className="home-container">
                <div>
                    <Link to={`/create_session/${event_id}`}><button>Create Session</button></Link>
                </div>
        
              <h1>Sessions</h1>
              <div className="grid">
                {/* Display sessions */}
                {current.map((currentpost) => {
                  const { id, name,speaker, start_datetime, end_datetime,location } = currentpost;
                  return (
                    <Link to={`/session_action/${id}/`} key={id} className="session-link">
                      <div className="card" key={currentpost.id}>
                        {console.log(currentpost)}
                        {/* <img className="img" src={`${image}`} alt={name} /> */}
                        <h2>{name.toUpperCase()}</h2>
                        <h6>{speaker}</h6>
                        <h4>{start_datetime}</h4>
                        <h4>{end_datetime}</h4>
                        <h3>{location}</h3>
                        {/* <p>{description.substring(0, 10)}</p> */}
                      </div>
                    </Link>
                  );
                })}
              </div>
              </div>
        );
        
}
export default Session;
  