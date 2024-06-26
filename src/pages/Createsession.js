import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Createsession() {
    const [name, setName] = useState("");
    const [speaker, setSpeaker] = useState("");
    const [start_datetime, setStart_datetime] = useState("");
    const [end_datetime, setEnd_datetime] = useState("");
    const [location, setLocation] = useState("");
    const [nameError, setNameError] = useState("");
    const [speakerError, setSpeakerError] = useState("");
    const [startDatetimeError, setStartDatetimeError] = useState("");
    const [endDatetimeError, setEndDatetimeError] = useState("");
    const [locationError, setLocationError] = useState("");
    const { event_id } = useParams();
    const host_email = localStorage.getItem('email');
    const navigate = useNavigate();

    const getFormData = async (e) => {
        e.preventDefault();

        // Clear previous error messages
        setNameError("");
        setSpeakerError("");
        setStartDatetimeError("");
        setEndDatetimeError("");
        setLocationError("");

        // Validate form fields
        let hasErrors = false;

        if (!name) {
            setNameError("Please enter a name");
            hasErrors = true;
        }

        if (!speaker) {
            setSpeakerError("Please enter a speaker");
            hasErrors = true;
        }

        if (!start_datetime) {
            setStartDatetimeError("Please enter a start date-time");
            hasErrors = true;
        }

        if (!end_datetime) {
            setEndDatetimeError("Please enter an end date-time");
            hasErrors = true;
        }

        if (!location) {
            setLocationError("Please enter a location");
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:8000/event_management/session/?event_id=${event_id}`, {
                host_email: host_email,
                name: name,
                speaker: speaker,
                start_datetime: start_datetime,
                end_datetime: end_datetime,
                location: location,
                event_id: event_id
            },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            alert("Session created successfully");
            navigate(`/session/${event_id}`);
        } catch (error) {
            console.error("Failed to create session", error);
            alert("Failed to create session. Please try again later.");
        }
    };

    return (
        <div className="App">
            <h1>Create Session</h1>
            <form onSubmit={getFormData}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                {nameError && <span className="error">{nameError}</span>}
                <br /><br />
                <input type="text" placeholder="Speaker" value={speaker} onChange={(e) => setSpeaker(e.target.value)} />
                {speakerError && <span className="error">{speakerError}</span>}
                <br /><br />
                <input type="datetime-local" placeholder="Start Date-Time" value={start_datetime} onChange={(e) => setStart_datetime(e.target.value)} />
                {startDatetimeError && <span className="error">{startDatetimeError}</span>}
                <br /><br />
                <input type="datetime-local" placeholder="End Date-Time" value={end_datetime} onChange={(e) => setEnd_datetime(e.target.value)} />
                {endDatetimeError && <span className="error">{endDatetimeError}</span>}
                <br /><br />
                <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                {locationError && <span className="error">{locationError}</span>}
                <br /><br />
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default Createsession;




































// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate, useParams } from 'react-router-dom';

// function Createsession() {
//     // const [host_email, setHost_email] = useState("");
//     const [name, setName] = useState("");
//     const [speaker, setSpeaker] = useState("");
//     const [start_datetime, setStart_datetime] = useState("");
//     const [end_datetime, setEnd_datetime] = useState("");
//     const [location,setLocation] = useState("");
//     const {event_id}=useParams();
//     const host_email=localStorage.getItem('email')
//     const navigate = useNavigate();

//     const getFormData = async (e) => {
//         e.preventDefault();
//         console.log(host_email,name,speaker)
//         try {
//             const token=localStorage.getItem('token')
//             const response = await axios.post(`http://localhost:8000/event_management/session/?event_id=${event_id}`, {
//                 host_email: host_email,
//                 name: name,
//                 speaker:speaker,
//                 start_datetime:start_datetime,
//                 end_datetime:end_datetime,
//                 location:location,
//                 event_id:event_id
//             },
//         {
//             headers: {
//                 'Authorization':`Bearer ${token}`
//             }
//         });
//             // Extract the token from the response data
//             // const token = response.data.access;

//             // Store the token securely (e.g., in local storage)
//             // localStorage.setItem('token', token);
//             // localStorage.setItem('email',response.data.email)
//             // setIsLoggedIn(true);
//             // localStorage.setItem('token', response.data.token);  // Store token in localStorage
//             // console.log("login---",response.data)
//             // console.log("token",token)
//             alert("session created successfully")
//             navigate(`/session/${event_id}`);
            
            
//         } catch (error) {
//             console.log(" failed", error);
//             alert("Invalid credentials");
//             // navigate("/");
//         }
//     }

//     return (
//         <div className="App">
//             <h1>Create Session</h1>
//             <form onSubmit={getFormData}>
//                 <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}></input><br></br><br></br>
//                 <input type="text" placeholder="speaker" value={speaker} onChange={(e) => setSpeaker(e.target.value)}></input><br></br><br></br>
//                 <input type="datetime-local" placeholder="start date-time" value={start_datetime} onChange={(e) => setStart_datetime(e.target.value)}></input><br></br><br></br>
//                 <input type="datetime-local" placeholder="end date-time" value={end_datetime} onChange={(e) => setEnd_datetime(e.target.value)}></input><br></br><br></br>
//                 <input type="text" placeholder="location" value={location} onChange={(e) => setLocation(e.target.value)}></input><br></br><br></br>
//                 {/* <input type="text" placeholder="creater-email" value={host_email} onChange={(e) => setHost_email(e.target.value)}></input><br></br><br></br> */}
//                 <button type="submit">Create</button>
//             </form>
//         </div>
//     );
// }

// export default Createsession;