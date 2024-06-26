import React from "react";
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
// import '../Css/EventById.css';

function  SessionAction() {

    const {id}=useParams()

    const handleDelete = () => {
        const token = localStorage.getItem('token');
        axios.delete(`http://localhost:8000/event_management/session/?id=${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            console.log('Session deleted successfully');
            // navigate("/"); // Navigate to the homepage route
            alert("Session deleted successfully");
          })
          .catch(error => {
            console.error('Error deleting event:', error);
            alert("You are not authorized", error);
          });
      };
    
    
    return(
        <div>
            <Link to={`/update_session/${id}`}><button>UPDATE-Session</button></Link>
            <br></br><br></br>
            <button onClick={handleDelete}>DELETE-Session</button>

        </div>
    );
    
    
}

export default SessionAction