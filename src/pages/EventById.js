import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import '../Css/EventById.css'; // Import your CSS file for styling

function EventById() {
  const [event, setEvent] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [uploadedfile, setUploadedfile] = useState([]);
  const { event_id } = useParams();
  const navigate = useNavigate();
  const currentUserEmail = localStorage.getItem('email'); // Assuming email is stored in localStorage
  const [teamMembers, setTeamMembers] = useState([]);
  const [hostEmail, setHostEmail] = useState('');

  const fetchEventData = () => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:8000/event_management/event/?id=${event_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setEvent(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching event:', error);
      });
  };

  const fetchFeedbackData = () => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:8000/event_management/feedback/?id=${event_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setFeedback(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching feedback data:', error);
      });
  };

  const fetchUploadedfile = () => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:8000/event_management/upload_image/?event_id=${event_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log("uploaded", response.data);
        setUploadedfile(response.data.data); // Corrected line
        
      })
      .catch(error => {
        console.error('Error fetching uploaded files:', error);
      });
  };

  const fetchTeamMembers = async () => {
    try {
      const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/event_management/invite/?event_id=${event_id}`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data[0])
        setTeamMembers(response.data);
        setHostEmail(response.host_email);
    } catch (error) {
        console.error('Error fetching team members:', error);
    }
};
  

  // const fetchUploadedfile = () => {
  //   const token = localStorage.getItem('token');
  //   axios.get(`http://localhost:8000/event_management/upload_image/?event_id=${event_id}`, {
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //     }
  //   })
  //     .then(response => {
  //       console.log("uploaded", response.data)
  //       setUploadedfile(response.data.data.map(item => item.image));
  //     })
  //     .catch(error => {
  //       console.error('Error fetching uploaded files:', error);
  //     });
  // };

  useEffect(() => {
    fetchEventData();
    fetchFeedbackData();
    fetchUploadedfile();
    fetchTeamMembers();
  }, [event_id]);

  const handleDelete = () => {
    const confirmation = window.confirm("Are you sure you want to delete this event?");
    if (confirmation) {
        const token = localStorage.getItem('token');
        axios.delete(`http://localhost:8000/event_management/event/?id=${event_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Event deleted successfully');
                navigate("/"); // Navigate to the homepage route
                alert("Event deleted successfully");
            })
            .catch(error => {
                console.error('Error deleting event:', error);
                alert("You are not authorized", error);
            });
    }
};

  // const handleDelete = () => {
  //   const token = localStorage.getItem('token');
  //   axios.delete(`http://localhost:8000/event_management/event/?id=${event_id}`, {
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //     }
  //   })
  //     .then(response => {
  //       console.log('Event deleted successfully');
  //       navigate("/"); // Navigate to the homepage route
  //       alert("Event deleted successfully");
  //     })
  //     .catch(error => {
  //       console.error('Error deleting event:', error);
  //       alert("You are not authorized", error);
  //     });
  // };

  // useEffect(() => {
  //   if (!event) {
  //     navigate("/login");
  //   }
  // }, [event, navigate]);
  

  if (!event) {
    // navigate("/login");
    // return <Navigate to="/login"/>
    // return null;
    return <div>Please login first</div>;
  }

  const { id, name, start_datetime, end_datetime, location, description, image, host_email } = event[0];
  const eventEnded = new Date(end_datetime) < new Date();
  const isHost = currentUserEmail === host_email;
 
  return (
    // event &&
    <div key={id}>
      <div className="buttons-container">
        {isHost && <Link to={`/create_ticket/${event_id}`}><button>Create Ticket</button></Link>}
        {isHost && !eventEnded && <Link to={`/update_event/${event_id}`}><button>UPDATE-EVENT</button></Link>}
        {isHost && <button onClick={handleDelete}>DELETE-EVENT</button>}
        {isHost && !eventEnded && <Link to={`/invite/${event_id}`}><button>Invite</button></Link>}
        {isHost && !eventEnded && <Link to={`/notification/${event_id}`}><button>Notification</button></Link>}
        <Link to={`/session/${event_id}`}><button>Session</button></Link>
        {eventEnded && <Link to={`/feedback/${event_id}`}><button>Feedback</button></Link>}
        {eventEnded && <Link to={`/upload_image/${event_id}`}><button>Upload Images</button></Link>}
      </div>

      <div>
        <h1>{name?.toUpperCase()}</h1>
        <img className="img" src={`${image}`} alt={name} />
        <h4>{start_datetime}</h4>
        <h4>{end_datetime}</h4>
        <h3>{location}</h3>
        <p>{description}</p>
        <div>
          {!isHost && !eventEnded && <Link to={`/ticket/${id}`}><button>TICKET</button></Link>}
        </div>
        <br></br><br></br>
      <div>
        {console.log("ttttt",event[0].host_email)}
           {teamMembers.length > 0 &&  <h2>Team Members</h2>}
           <p><b>Host Email: </b>{event[0].host_email}</p>
            <ul>
                {teamMembers.map(member => (
                    <li key={member.id}>
                        <strong>{member.role}: </strong>{member.invitee_email}
                    </li>
                ))}
            </ul>
        </div>
      <br></br><br></br>
      
        {feedback.length > 0 && <h1>FEEDBACK</h1>}
        <div className="grid">
          {feedback.map((currentpost) => {
            const { id, email, feedback } = currentpost;
            return (
              <div className="card" key={currentpost.id}>
                <h2>{email.toUpperCase()}</h2>
                <p>{feedback}</p>
              </div>
            );
          })}
        </div>
      </div>
      {/* <br></br><br></br>
      <div>
        {console.log("ttttt",event[0].host_email)}
           {teamMembers.length > 0 &&  <h2>Team Members</h2>}
           <p><b>Host Email: </b>{event[0].host_email}</p>
            <ul>
                {teamMembers.map(member => (
                    <li key={member.id}>
                        <strong>{member.role}: </strong>{member.invitee_email}
                    </li>
                ))}
            </ul>
        </div> */}
      <br></br><br></br>
      {uploadedfile.length > 0 && <h2>IMAGES</h2>}
      <div className="grid">
  {uploadedfile.map((item, index) => (
    <div className="card" key={index}>
      {item.image_urls.map((imageUrl, idx) => (
        <img className="img" src={imageUrl} alt={`Image ${idx}`} key={idx} />
      ))}
    </div>
  ))}
</div>

      {/* <div className="grid">
        {uploadedfile.map((imageUrl, index) => {
          return (
            <div className="card" key={index}>
              {console.log("index url",index,imageUrl)}
              <img className="img" src={`${imageUrl}`} alt={`Image ${index}`} />
            </div>
          );
        })}
      </div> */}
    </div>
  );
}

export default EventById;













































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import '../Css/EventById.css'; // Import your CSS file for styling

// function EventById() {
//   const [event, setEvent] = useState(null);
//   const [feedback, setFeedback] = useState([]);
//   const [uploadedfile, setUploadedfile] = useState([]);
//   const { event_id } = useParams();
//   const navigate = useNavigate();
//   const currentUserEmail = localStorage.getItem('email'); // Assuming email is stored in localStorage

//   const fetchEventData = () => {
//     const token = localStorage.getItem('token');
//     axios.get(`http://localhost:8000/event_management/event/?id=${event_id}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then(response => {
//         setEvent(response.data.data);
//       })
//       .catch(error => {
//         console.error('Error fetching event:', error);
//       });
//   };

//   const fetchFeedbackData = () => {
//     const token = localStorage.getItem('token');
//     axios.get(`http://localhost:8000/event_management/feedback/?id=${event_id}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then(response => {
//         setFeedback(response.data.data);
//       })
//       .catch(error => {
//         console.error('Error fetching feedback data:', error);
//       });
//   };

//   const fetchUploadedfile = () => {
//     const token = localStorage.getItem('token');
//     axios.get(`http://localhost:8000/event_management/upload_image/?event_id=${event_id}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then(response => {
//         console.log("uploaded", response.data)
//         setUploadedfile(response.data.data);
//       })
//       .catch(error => {
//         console.error('Error fetching uploaded files:', error);
//       });
//   };

//   useEffect(() => {
//     fetchEventData();
//     fetchFeedbackData();
//     fetchUploadedfile();
//   }, [event_id]);

//   const handleDelete = () => {
//     const token = localStorage.getItem('token');
//     axios.delete(`http://localhost:8000/event_management/event/?id=${event_id}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then(response => {
//         console.log('Event deleted successfully');
//         navigate("/"); // Navigate to the homepage route
//         alert("Event deleted successfully");
//       })
//       .catch(error => {
//         console.error('Error deleting event:', error);
//         alert("You are not authorized", error);
//       });
//   };

//   if (!event) {
//     return <div>Loading...</div>;
//   }

//   const { id, name, start_datetime, end_datetime, location, description, image, host_email } = event[0];
//   const eventEnded = new Date(end_datetime) < new Date();
//   const isHost = currentUserEmail === host_email;

//   return (
//     <div key={id}>
//       <div className="buttons-container">
//         {isHost && <Link to={`/create_ticket/${event_id}`}><button>Create Ticket</button></Link>}
//         {isHost && !eventEnded && <Link to={`/update_event/${event_id}`}><button>UPDATE-EVENT</button></Link>}
//         {isHost && <button onClick={handleDelete}>DELETE-EVENT</button>}
//         {isHost && !eventEnded && <Link to={`/invite/${event_id}`}><button>Invite</button></Link>}
//         {isHost && !eventEnded && <Link to={`/notification/${event_id}`}><button>Notification</button></Link>}
//         <Link to={`/session/${event_id}`}><button>Session</button></Link>
//         {eventEnded && <Link to={`/feedback/${event_id}`}><button>Feedback</button></Link>}
//         {eventEnded && <Link to={`/upload_image/${event_id}`}><button>Upload Images</button></Link>}
//       </div>

//       <div>
//         <h1>{name?.toUpperCase()}</h1>
//         <img className="img" src={`${image}`} alt={name} />
//         <h4>{start_datetime}</h4>
//         <h4>{end_datetime}</h4>
//         <h3>{location}</h3>
//         <p>{description}</p>
//         <div>
//           {!eventEnded && <Link to={`/ticket/${id}`}><button>TICKET</button></Link>}
//         </div>
//         {feedback.length > 0 && <h1>FEEDBACK</h1>}
//         <div className="grid">
//           {feedback.map((currentpost) => {
//             const { id, email, feedback } = currentpost;
//             return (
//               <div className="card" key={currentpost.id}>
//                 <h2>{email.toUpperCase()}</h2>
//                 <p>{feedback}</p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//       <br></br>
//       <h2>IMAGES</h2>
//       <div className="grid">
//         {uploadedfile.map((uploadedfile, index) => {
//           return (
//             <div className="card" key={index}>
//               <img className="img" src={`${uploadedfile}`} alt={`Image ${index}`} />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default EventById;















































// //original
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import '../Css/EventById.css'; // Import your CSS file for styling

// function EventById() {
//   const [event, setEvent] = useState(null);
//   const [feedback, setFeedback] = useState([]);
//   const [uploadedfile,setUploadedfile] = useState([]);
//   const { event_id } = useParams();
//   const navigate = useNavigate();
//   const currentUserEmail = localStorage.getItem('email'); // Assuming email is stored in localStorage

//   const fetchEventData = () => {
//     const token = localStorage.getItem('token');
//     axios.get(`http://localhost:8000/event_management/event/?id=${event_id}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then(response => {
//         setEvent(response.data.data);
//       })
//       .catch(error => {
//         console.error('Error fetching event:', error);
//       });
//   };

//   const fetchFeedbackData = () => {
//     const token = localStorage.getItem('token');
//     axios.get(`http://localhost:8000/event_management/feedback/?id=${event_id}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then(response => {
//         setFeedback(response.data.data);
//       })
//       .catch(error => {
//         console.error('Error fetching feedback data:', error);
//       });
//   };

//   const fetchUploadedfile = () => {
//     const token = localStorage.getItem('token');
//     axios.get(`http://localhost:8000/event_management/upload_image/?event_id=${event_id}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then(response => {
//         console.log("uploaded",response.data)
//         setUploadedfile(response.data.data);
//       })
//       .catch(error => {
//         console.error('Error fetching feedback data:', error);
//       });
//   };


//   useEffect(() => {
//     fetchEventData();
//     fetchFeedbackData();
//     fetchUploadedfile();
//   }, [event_id]);

//   const handleDelete = () => {
//     const token = localStorage.getItem('token');
//     axios.delete(`http://localhost:8000/event_management/event/?id=${event_id}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then(response => {
//         console.log('Event deleted successfully');
//         navigate("/"); // Navigate to the homepage route
//         alert("Event deleted successfully");
//       })
//       .catch(error => {
//         console.error('Error deleting event:', error);
//         alert("You are not authorized", error);
//       });
//   };

//   if (!event) {
//     return <div>Loading...</div>;
//   }

//   const { id, name, start_datetime, end_datetime, location, description, image, host_email } = event[0];
//   const eventEnded = new Date(end_datetime) < new Date();
//   const isHost = currentUserEmail === host_email;

//   return (
//     <div key={id}>
//       <div className="buttons-container">
//         {isHost && <Link to={`/create_ticket/${event_id}`}><button>Create Ticket</button></Link>}
//         {isHost && !eventEnded && <Link to={`/update_event/${event_id}`}><button>UPDATE-EVENT</button></Link>}
//         {isHost && <button onClick={handleDelete}>DELETE-EVENT</button>}
//         {isHost && !eventEnded && <Link to={`/invite/${event_id}`}><button>Invite</button></Link>}
//         {isHost && !eventEnded && <Link to={`/notification/${event_id}`}><button>Notification</button></Link>}
//         <Link to={`/session/${event_id}`}><button>Session</button></Link>
//         {eventEnded && <Link to={`/feedback/${event_id}`}><button>Feedback</button></Link>}
//         {eventEnded && <Link to={`/upload_image/${event_id}`}><button>Upload Images</button></Link>}
//       </div>

//       {/* <Link to={`/session/${event_id}`}><button>Session</button></Link> */}

//       <div>
//         <h1>{name?.toUpperCase()}</h1>
//         <img className="img" src={`${image}`} alt={name} />
//         <h4>{start_datetime}</h4>
//         <h4>{end_datetime}</h4>
//         <h3>{location}</h3>
//         <p>{description}</p>
//         <div>
//           {!eventEnded && <Link to={`/ticket/${id}`}><button>TICKET</button></Link>}
//         </div>
//         {feedback.length > 0 && <h1>FEEDBACK</h1>}
//         <div className="grid">
//           {feedback.map((currentpost) => {
//             const { id, email, feedback } = currentpost;
//             return (
//               <div className="card" key={currentpost.id}>
//                 <h2>{email.toUpperCase()}</h2>
//                 <p>{feedback}</p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//       <br></br>
//       <h2>IMAGES</h2>
//       <div className="grid">
//         {uploadedfile.map((uploadedfile) => {
//           const { id,image } = uploadedfile;
//           return (
//             // <Link to={`/event/${id}/`} key={id} className="event-link">
//               <div className="card" key={uploadedfile.id}>
//                 <img className="img" src={`${image}`} alt={name} />
//               </div>
//             // </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default EventById;









































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import '../Css/EventById.css'; // Import your CSS file for styling

// function EventById() {
//   const [event, setEvent] = useState(null);
//   const [feedback, setFeedback] = useState([]);
//   const [uploadedfile, setUploadedfile] = useState([]);
//   const { event_id } = useParams();
//   const navigate = useNavigate();
//   const currentUserEmail = localStorage.getItem('email'); // Assuming email is stored in localStorage

//   const fetchEventData = () => {
//     const token = localStorage.getItem('token');
//     axios.get(`http://localhost:8000/event_management/event/?id=${event_id}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then(response => {
//         setEvent(response.data.data);
//       })
//       .catch(error => {
//         console.error('Error fetching event:', error);
//       });
//   };

//   const fetchFeedbackData = () => {
//     const token = localStorage.getItem('token');
//     axios.get(`http://localhost:8000/event_management/feedback/?id=${event_id}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then(response => {
//         setFeedback(response.data.data);
//       })
//       .catch(error => {
//         console.error('Error fetching feedback data:', error);
//       });
//   };

//   const fetchUploadedfile = () => {
//     const token = localStorage.getItem('token');
//     axios.get(`http://localhost:8000/event_management/upload_image/?event_id=${event_id}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then(response => {
//         setUploadedfile(response.data.data);
//       })
//       .catch(error => {
//         console.error('Error fetching uploaded images:', error);
//       });
//   };


//   useEffect(() => {
//     fetchEventData();
//     fetchFeedbackData();
//     fetchUploadedfile();
//   }, [event_id]);

//   const handleDelete = () => {
//     const token = localStorage.getItem('token');
//     axios.delete(`http://localhost:8000/event_management/event/?id=${event_id}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then(response => {
//         console.log('Event deleted successfully');
//         navigate("/"); // Navigate to the homepage route
//         alert("Event deleted successfully");
//       })
//       .catch(error => {
//         console.error('Error deleting event:', error);
//         alert("You are not authorized", error);
//       });
//   };

//   if (!event || !uploadedfile) {
//     return <div>Loading...</div>;
//   }

//   const { id, name, start_datetime, end_datetime, location, description, image, host_email } = event[0];
//   const eventEnded = new Date(end_datetime) < new Date();
//   const isHost = currentUserEmail === host_email;

//   return (
//     <div key={id}>
//       <div className="buttons-container">
//         {isHost && <Link to={`/create_ticket/${event_id}`}><button>Create Ticket</button></Link>}
//         {isHost && !eventEnded && <Link to={`/update_event/${event_id}`}><button>UPDATE-EVENT</button></Link>}
//         {isHost && <button onClick={handleDelete}>DELETE-EVENT</button>}
//         {isHost && !eventEnded && <Link to={`/invite/${event_id}`}><button>Invite</button></Link>}
//         {isHost && !eventEnded && <Link to={`/notification/${event_id}`}><button>Notification</button></Link>}
//         <Link to={`/session/${event_id}`}><button>Session</button></Link>
//         {eventEnded && <Link to={`/feedback/${event_id}`}><button>Feedback</button></Link>}
//         {eventEnded && <Link to={`/upload_image/${event_id}`}><button>Upload Images</button></Link>}
//       </div>

//       <div>
//         <h1>{name?.toUpperCase()}</h1>
//         <img className="img" src={`${image}`} alt={name} />
//         <h4>{start_datetime}</h4>
//         <h4>{end_datetime}</h4>
//         <h3>{location}</h3>
//         <p>{description}</p>
//         <div>
//           {!eventEnded && <Link to={`/ticket/${id}`}><button>TICKET</button></Link>}
//         </div>
//         {feedback.length > 0 && <h1>FEEDBACK</h1>}
//         <div className="grid">
//           {feedback.map((currentpost) => {
//             const { id, email, feedback } = currentpost;
//             return (
//               <div className="card" key={currentpost.id}>
//                 <h2>{email.toUpperCase()}</h2>
//                 <p>{feedback}</p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//       <br></br>
//       <h2>IMAGES</h2>
//       <div className="grid">
//         {uploadedfile.map((uploadedfile) => {
//           const { id, image } = uploadedfile;
//           return (
//             <div className="card" key={id}>
//               {image.map(imageId => (
//                 <img className="img" src={`http://localhost:8000/static/event_images/${imageId}/`} alt={name} />
//               ))}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default EventById;




























//original
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import '../Css/EventById.css'; // Import your CSS file for styling

// function EventById() {
//   const [event, setEvent] = useState(null);
//   const [feedback, setFeedback] = useState([]);
//   const [uploadedfile,setUploadedfile] = useState([]);
//   const { event_id } = useParams();
//   const navigate = useNavigate();
//   const currentUserEmail = localStorage.getItem('email'); // Assuming email is stored in localStorage

//   const fetchEventData = () => {
//     const token = localStorage.getItem('token');
//     axios.get(`http://localhost:8000/event_management/event/?id=${event_id}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then(response => {
//         setEvent(response.data.data);
//       })
//       .catch(error => {
//         console.error('Error fetching event:', error);
//       });
//   };

//   const fetchFeedbackData = () => {
//     const token = localStorage.getItem('token');
//     axios.get(`http://localhost:8000/event_management/feedback/?id=${event_id}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then(response => {
//         setFeedback(response.data.data);
//       })
//       .catch(error => {
//         console.error('Error fetching feedback data:', error);
//       });
//   };

//   const fetchUploadedfile = () => {
//     const token = localStorage.getItem('token');
//     axios.get(`http://localhost:8000/event_management/upload_image/?event_id=${event_id}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then(response => {
//         console.log("uploaded",response.data)
//         setUploadedfile(response.data.data);
//       })
//       .catch(error => {
//         console.error('Error fetching feedback data:', error);
//       });
//   };


//   useEffect(() => {
//     fetchEventData();
//     fetchFeedbackData();
//     fetchUploadedfile();
//   }, [event_id]);

//   const handleDelete = () => {
//     const token = localStorage.getItem('token');
//     axios.delete(`http://localhost:8000/event_management/event/?id=${event_id}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then(response => {
//         console.log('Event deleted successfully');
//         navigate("/"); // Navigate to the homepage route
//         alert("Event deleted successfully");
//       })
//       .catch(error => {
//         console.error('Error deleting event:', error);
//         alert("You are not authorized", error);
//       });
//   };

//   if (!event) {
//     return <div>Loading...</div>;
//   }

//   const { id, name, start_datetime, end_datetime, location, description, image, host_email } = event[0];
//   const eventEnded = new Date(end_datetime) < new Date();
//   const isHost = currentUserEmail === host_email;

//   return (
//     <div key={id}>
//       <div className="buttons-container">
//         {isHost && <Link to={`/create_ticket/${event_id}`}><button>Create Ticket</button></Link>}
//         {isHost && !eventEnded && <Link to={`/update_event/${event_id}`}><button>UPDATE-EVENT</button></Link>}
//         {isHost && <button onClick={handleDelete}>DELETE-EVENT</button>}
//         {isHost && !eventEnded && <Link to={`/invite/${event_id}`}><button>Invite</button></Link>}
//         {isHost && !eventEnded && <Link to={`/notification/${event_id}`}><button>Notification</button></Link>}
//         <Link to={`/session/${event_id}`}><button>Session</button></Link>
//         {eventEnded && <Link to={`/feedback/${event_id}`}><button>Feedback</button></Link>}
//         {eventEnded && <Link to={`/upload_image/${event_id}`}><button>Upload Images</button></Link>}
//       </div>

//       {/* <Link to={`/session/${event_id}`}><button>Session</button></Link> */}

//       <div>
//         <h1>{name?.toUpperCase()}</h1>
//         <img className="img" src={`${image}`} alt={name} />
//         <h4>{start_datetime}</h4>
//         <h4>{end_datetime}</h4>
//         <h3>{location}</h3>
//         <p>{description}</p>
//         <div>
//           {!eventEnded && <Link to={`/ticket/${id}`}><button>TICKET</button></Link>}
//         </div>
//         {feedback.length > 0 && <h1>FEEDBACK</h1>}
//         <div className="grid">
//           {feedback.map((currentpost) => {
//             const { id, email, feedback } = currentpost;
//             return (
//               <div className="card" key={currentpost.id}>
//                 <h2>{email.toUpperCase()}</h2>
//                 <p>{feedback}</p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//       <br></br>
//       <h2>IMAGES</h2>
//       <div className="grid">
//         {uploadedfile.map((uploadedfile) => {
//           const { id,image } = uploadedfile;
//           return (
//             // <Link to={`/event/${id}/`} key={id} className="event-link">
//               <div className="card" key={uploadedfile.id}>
//                 <img className="img" src={`${image}`} alt={name} />
//               </div>
//             // </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default EventById;






































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useParams, useNavigate } from 'react-router-dom';

// function EventById() {
//   const [event, setEvent] = useState(null);
//   const [feedback, setFeedback] = useState([]);
//   const { event_id } = useParams();
//   const navigate = useNavigate();
//   const currentUserEmail = localStorage.getItem('email'); // Assuming email is stored in localStorage

//   const fetchEventData = () => {
//     const token = localStorage.getItem('token');
//     axios.get(`http://localhost:8000/event_management/event/?id=${event_id}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then(response => {
//         setEvent(response.data.data);
//       })
//       .catch(error => {
//         console.error('Error fetching event:', error);
//       });
//   };

//   const fetchFeedbackData = () => {
//     const token = localStorage.getItem('token');
//     axios.get(`http://localhost:8000/event_management/feedback/?id=${event_id}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then(response => {
//         setFeedback(response.data.data);
//       })
//       .catch(error => {
//         console.error('Error fetching feedback data:', error);
//       });
//   };

//   useEffect(() => {
//     fetchEventData();
//     fetchFeedbackData();
//   }, [event_id]);

//   const handleDelete = () => {
//     const token = localStorage.getItem('token');
//     axios.delete(`http://localhost:8000/event_management/event/?id=${event_id}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then(response => {
//         console.log('Event deleted successfully');
//         navigate("/"); // Navigate to the homepage route
//         alert("Event deleted successfully");
//       })
//       .catch(error => {
//         console.error('Error deleting event:', error);
//         alert("You are not authorized", error);
//       });
//   };

//   if (!event) {
//     return <div>Loading...</div>;
//   }

//   const { id, name, start_datetime, end_datetime, location, description, image, host_email } = event[0];
//   const eventEnded = new Date(end_datetime) < new Date();
//   const isHost = currentUserEmail === host_email;

//   return (
//     <div key={id}>
//       <div>
//         {isHost && <Link to={`/create_ticket/${event_id}`}><button>Create Ticket</button></Link>}
//       </div>
//       <br></br>
//       {isHost && !eventEnded && (
//         <div>
//           <Link to={`/update_event/${event_id}`}><button>UPDATE-EVENT</button></Link>
//         </div>
//       )}
//       <br></br>
//       {isHost && (
//         <div>
//           <button onClick={handleDelete}>DELETE-EVENT</button>
//         </div>
//       )}
//       <br />
//       {isHost && !eventEnded && (
//         <div>
//           <Link to={`/invite/${event_id}`}><button>Invite</button></Link>
//         </div>
//       )}
//       <br></br>
//       {isHost && !eventEnded && (
//         <div>
//           <Link to={`/notification/${event_id}`}><button>Notification</button></Link>
//         </div>
//       )}
      
//       <br></br>
//       {eventEnded && (
//         <div>
//           <Link to={`/feedback/${event_id}`}><button>Feedback</button></Link>
//         </div>
//       )}
//       <br></br>
//       <div>
//         <h1>{name?.toUpperCase()}</h1>
//         <img className="img" src={`${image}`} alt={name} />
//         <h4>{start_datetime}</h4>
//         <h4>{end_datetime}</h4>
//         <h3>{location}</h3>
//         <p>{description}</p>
//         <div>
//           <Link to={`/ticket/${id}`}><button>TICKET</button></Link>
//         </div>
//         {/* {eventEnded && ( */}
//         {feedback.length > 0 && <h1>FEEDBACK</h1>}
//         {/* <h1>FEEDBACK</h1> */}
//         <div className="grid">
//           {feedback.map((currentpost) => {
//             const { id, email, feedback } = currentpost;
//             return (
//               <div className="card" key={currentpost.id}>
//                 <h2>{email.toUpperCase()}</h2>
//                 <br></br>
//                 <p>{feedback}</p>
//               </div>
//             );
//           })}
//         </div>
      
//       </div>
//     </div>
//   );
// }

// export default EventById;





































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// // import jwt_decode from 'jwt-decode'; // Import jwt-decode library
// import jwt_decode from 'jwt-decode';


// function EventById() {
//   // const [hostEmail, setHostEmail] = useState('');
//   const [event, setEvent] = useState(null);
//   const [feedback, setFeedback ] = useState([]);
  
//   const { event_id } = useParams();
//   const navigate = useNavigate();

//   const currentUserEmail = localStorage.getItem('email');
//   const fetchEventData = () => {
//     const token = localStorage.getItem('token')
//     axios.get(`http://localhost:8000/event_management/event/?id=${event_id}`,{
//       headers: {
//         'Authorization':`Bearer ${token}`
//       }
//     })
//       .then(response => {
//         console.log("event by id", response.data);
//         setEvent(response.data.data);
//       })
//       .catch(error => {
//         console.error('Error fetching event:', error);
//       });
//   };

//   const fetchFeedbackData = () => {
//     const token = localStorage.getItem('token')
//     axios.get(`http://localhost:8000/event_management/feedback/?id=${event_id}`,{
//       headers: {
//         'Authorization':`Bearer ${token}`
//       }
//     })
//       .then(response => {
//         console.log("feedback data", response.data);
//         setFeedback(response.data.data);
//       })
//       .catch(error => {
//         console.error('Error fetching feedback data:', error);
//       });
//   };


//   useEffect(() => {
//     fetchEventData();
//     fetchFeedbackData();
//   }, [event_id]);

//   const handleDelete = () => {
//     const token = localStorage.getItem('token')
//     axios.delete(`http://localhost:8000/event_management/event/?id=${event_id}`, {
//     //   data: { host_email: hostEmail }
//     // },
  
//     headers: {
//       'Authorization':`Bearer ${token}`
//     }
//   })
//       .then(response => {
//         console.log('Event deleted successfully');
//         navigate("/"); // Navigate to the homepage route
//         alert("Event deleted successfully");
//       })
//       .catch(error => {
//         console.error('Error deleting event:', error);
//         alert("You are not Authorize",error)
//       });
//   };

//   if (!event) {
//     // navigate("/login");
//     return <div>Loading...</div>;
//   }
//   const token=localStorage.getItem('token')
//   // console.log("token",token)
//   // const decodedToken = jwt_decode(token);
//   // const currentUserEmail = decodedToken.email; // Assuming email is included in the JWT token
//   // const isHost = currentUserEmail === host_email;
//   console.log("current_email",localStorage.getItem('email'))
//   console.log("event---",event[0].host_email)
//   const { id, name, start_datetime, end_datetime, location, description, image } = event[0];

//   const eventEnded = new Date(end_datetime) < new Date();

//   return (
//     <div key={id}>
//       <div>
//           <Link to={`/create_ticket/${event_id}`}>Create Ticket</Link>
//         </div>
//       {/* <div>
//         <Link to={`/update_event/${event_id}`}>UPDATE-EVENT</Link>
//       </div> */}
//       {!eventEnded && (
//         <div>
//           <Link to={`/update_event/${event_id}`}>UPDATE-EVENT</Link>
//         </div>
//       )}
//       <br />
//       {eventEnded && (
//         <div>
//           <Link to={`/feedback/${event_id}`}>Feedback</Link>
//         </div>
//       )}
      
//       <div>
//         <label htmlFor="hostEmail">Host Email:</label>
//         {/* <input type="email" id="hostEmail" value={hostEmail} onChange={(e) => setHostEmail(e.target.value)} /> */}
//         <button onClick={handleDelete}>DELETE-EVENT</button>
//       </div>
//       <h1>{name?.toUpperCase()}</h1>
//       {/* {console.log(image)} */}
//       <img className="img" src={`${image}`} alt={name} />
//       <h4>{start_datetime}</h4>
//       <h4>{end_datetime}</h4>
//       <h3>{location}</h3>
//       <p>{description}</p>
//       <div>
//         <Link to={`/ticket/${id}`}>TICKET</Link>
//       </div>
//       {/* <div>
//         <Link to={`/book_ticket/${id}`}>BOOK-TICKET</Link>
//       </div> */}

// <h1>FEEDBACK</h1>
//       <div className="grid">
//         {/* Display upcoming events */}
//         {feedback.map((currentpost) => {
//           const { id, email, feedback } = currentpost;
//           return (
//             // <Link to={`/event/${id}/`} key={id} className="event-link">
//               <div className="card" key={currentpost.id}>
//                 {/* <img className="img" src={`http://127.0.0.1:8000/${image}`} alt={name} /> */}
//                 <h2>{email.toUpperCase()}</h2>
//                 <p>{feedback}</p>
//               </div>
//             // </Link>
//           );
//         })}
//       </div>



//     </div>
//   );
// }

// export default EventById;




































// // pages/EventById.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Import Axios
// import { Link, useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import '../Css/Homepage.css';

// function EventById() {
//   const [event, setEvent] = useState(null);
//   const { event_id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log(event_id)
//     axios.get(`http://localhost:8000/event_management/event/?id=${event_id}`)
//       .then(response => {
        
//         console.log("event by id",response.data);
//         setEvent(response.data.data);
//       })
//       .catch(error => {
//         console.error('Error fetching event:', error);
//       });
//   }, [event_id]); // fetch data when id change
  
//   if (!event) {
//     return <div>Loading...</div>;
//   }

//   const { id, name, start_datetime,end_datetime, location, description, image } = event[0];
 
//   const handleDelete = () => {
//     axios.delete(`http://localhost:8000/event_management/event/?id=${event_id}`)
//       .then(response => {
//         console.log('Event deleted successfully');
//         navigate("/"); // Navigate to the homepage route
//         alert("event deleted successfully")
        
//       })
//       .catch(error => {
//         console.error('Error deleting event:', error);
//       });
//   };



//   return (
//     <div key={id}>
//         {/* use ? to show if name is not undefined */}
//         <div>
//           <Link to={`/update_event/${event_id}`}>UPDATE-EVENT</Link>
//         </div>
//         <br></br>
//         <div>
//             <button onClick={handleDelete}>DELETE-EVENT</button>
//           </div>
//         {/* <div>
//           <Link to={`/delete_event`+id}>DELETE-EVENT</Link>
//         </div> */}
//       <h1>{name?.toUpperCase()}</h1>   
//       <img className="img" src={`http://127.0.0.1:8000/`+image} alt={name} />
//       <h4>{start_datetime}</h4>
//       <h4>{end_datetime}</h4>
//       <h3>{location}</h3>
//       <p>{description}</p>
//       <div>
//         <Link to={`/book_ticket/`+id}>BOOK-TICKET</Link>
//      </div>
    
//     </div>
    
//   );
// }

// export default EventById;
