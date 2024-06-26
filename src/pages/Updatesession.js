import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Updatesession() {
    const [name, setName] = useState("");
    const [speaker, setSpeaker] = useState("");
    const [start_datetime, setStart_datetime] = useState("");
    const [end_datetime, setEnd_datetime] = useState("");
    const [location, setLocation] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const getFormData = async (e) => {
        e.preventDefault();

        // Validate form fields
        const validationErrors = {};
        let hasErrors = false;

        if (!name.trim()) {
            validationErrors.name = "Name is required";
            hasErrors = true;
        }

        if (!speaker.trim()) {
            validationErrors.speaker = "Speaker is required";
            hasErrors = true;
        }

        if (!start_datetime.trim()) {
            validationErrors.start_datetime = "Start date-time is required";
            hasErrors = true;
        }

        if (!end_datetime.trim()) {
            validationErrors.end_datetime = "End date-time is required";
            hasErrors = true;
        }

        if (!location.trim()) {
            validationErrors.location = "Location is required";
            hasErrors = true;
        }

        if (hasErrors) {
            setErrors(validationErrors);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(`http://localhost:8000/event_management/session/?id=${id}`, {
                name: name,
                speaker: speaker,
                start_datetime: start_datetime,
                end_datetime: end_datetime,
                location: location,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert("Session updated successfully");
            navigate("/");
        } catch (error) {
            console.error("Failed to update session:", error);
            alert("Failed to update session. Please try again.");
        }
    };

    return (
        <div className="App">
            <h1>Update Session</h1>
            <form onSubmit={getFormData}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                {errors.name && <span className="error">{errors.name}</span>}
                <br/><br/>
                <input type="text" placeholder="Speaker" value={speaker} onChange={(e) => setSpeaker(e.target.value)} />
                {errors.speaker && <span className="error">{errors.speaker}</span>}
                <br/><br/>
                <input type="datetime-local" placeholder="Start Date-Time" value={start_datetime} onChange={(e) => setStart_datetime(e.target.value)} />
                {errors.start_datetime && <span className="error">{errors.start_datetime}</span>}
                <br/><br/>
                <input type="datetime-local" placeholder="End Date-Time" value={end_datetime} onChange={(e) => setEnd_datetime(e.target.value)} />
                {errors.end_datetime && <span className="error">{errors.end_datetime}</span>}
                <br/><br/>
                <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                {errors.location && <span className="error">{errors.location}</span>}
                <br/><br/>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default Updatesession;





































// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate, useParams } from 'react-router-dom';

// function Updatesession() {
//     // const [host_email, setHost_email] = useState("");
//     const [name, setName] = useState("");
//     const [speaker, setSpeaker] = useState("");
//     const [start_datetime, setStart_datetime] = useState("");
//     const [end_datetime, setEnd_datetime] = useState("");
//     const [location,setLocation] = useState("");
//     const {id}=useParams();
//     const navigate = useNavigate();

//     const getFormData = async (e) => {
//         e.preventDefault();
//         // console.log(host_email,name,speaker)
//         const token=localStorage.getItem('token')
//         console.log(token)
//         try {
//             const response = await axios.patch(`http://localhost:8000/event_management/session/?id=${id}`, {
//                 // host_email: host_email,
//                 name: name,
//                 speaker:speaker,
//                 start_datetime:start_datetime,
//                 end_datetime:end_datetime,
//                 location:location,
//                 // event_id:event_id
//             },
//             {
//                 headers: {
//                     'Authorization':`Bearer ${token}`
//                 }
//             });
//             // Extract the token from the response data
//             // const token = response.data.access;

//             // Store the token securely (e.g., in local storage)
//             // localStorage.setItem('token', token);
//             // localStorage.setItem('email',response.data.email)
//             // setIsLoggedIn(true);
//             // localStorage.setItem('token', response.data.token);  // Store token in localStorage
//             // console.log("login---",response.data)
//             // console.log("token",token)
//             alert("session updated successfully")
            
//             navigate("/");
//         } catch (error) {
//             console.log(" failed", error);
//             alert("Invalid credentials");
//         }
//     }

//     return (
//         <div className="App">
//             <h1>Update Session</h1>
//             <form onSubmit={getFormData}>
//                 <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}></input><br></br><br></br>
//                 <input type="text" placeholder="speaker" value={speaker} onChange={(e) => setSpeaker(e.target.value)}></input><br></br><br></br>
//                 <input type="datetime-local" placeholder="start date-time" value={start_datetime} onChange={(e) => setStart_datetime(e.target.value)}></input><br></br><br></br>
//                 <input type="datetime-local" placeholder="end date-time" value={end_datetime} onChange={(e) => setEnd_datetime(e.target.value)}></input><br></br><br></br>
//                 <input type="text" placeholder="location" value={location} onChange={(e) => setLocation(e.target.value)}></input><br></br><br></br>
//                 {/* <input type="text" placeholder="creater-email" value={host_email} onChange={(e) => setHost_email(e.target.value)}></input><br></br><br></br> */}
//                 <button type="submit">Update</button>
//             </form>
//         </div>
//     );
// }

// export default Updatesession;