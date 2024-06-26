import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

function Rsvp() {
    const [rsvp, setRsvp] = useState("");
    const [rsvpError, setRsvpError] = useState("");
    const { event_id } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const invitee_email = searchParams.get('invitee_email');
    const role = searchParams.get('role');
    const navigate = useNavigate();
    
    const getFormData = async (e) => {
        e.preventDefault();

        // Clear previous error messages
        setRsvpError("");

        // Validate form fields
        if (!rsvp) {
            setRsvpError("Please select an option");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8000/event_management/rsvp/${event_id}/?invitee_email=${invitee_email}&role=${role}`, {
                event_id: event_id,
                invitee_email: invitee_email,
                role: role,
                rsvp: rsvp
            });
            console.log(response.data);
            alert("RSVP Sent successfully ");
        } catch (error) {
            console.error("Failed to send RSVP.", error);
            navigate("/login")
            alert("Failed to send RSVP: " + error);
        }
    }
    
    return (
        <div className="App">
            <h1>RSVP</h1>
            <form onSubmit={getFormData}>
                <br></br>
                <div>
                    <select value={rsvp} onChange={(e) => setRsvp(e.target.value)}>
                        <option value="">Select Choice</option>
                        <option value="True">Confirm</option>
                        <option value="False">Decline</option>
                    </select>
                    {rsvpError && <span className="error">{rsvpError}</span>}
                </div><br></br><br></br>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Rsvp;





































// import React, { useState } from 'react';
// import axios from 'axios';
// import { useParams, useLocation, Navigate, useNavigate } from 'react-router-dom';

// function Rsvp() {
//     const [rsvp, setRsvp] = useState("");
//     const { event_id } = useParams();
//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);
//     const invitee_email = searchParams.get('invitee_email');
//     const role = searchParams.get('role');
//     const navigate = useNavigate()
    
//     const getFormData = async (e) => {
//         e.preventDefault();
//         console.log(invitee_email)
        
//         try {
//             // const token=localStorage.getItem('token')
//             const response = await axios.post(`http://localhost:8000/event_management/rsvp/${event_id}/?invitee_email=${invitee_email}&role=${role}`,
//                 // headers: {
//                 //     'Authorization':`Bearer ${token}`
//                 // }
//              {
//                 event_id:event_id,
//                 invitee_email: invitee_email,
//                 role: role,
//                 rsvp: rsvp
//             });
//             console.log(response.data);
//             alert("RSVP Sent successfully ");
//         } catch (error) {
//             console.error("Failed to send RSVP.", error);
//             navigate("/login")
//             alert("Failed to send RSVP: " + error);
//         }
//     }
    
//     return (
//         <div className="App">
//             <h1>RSVP</h1>
//             <form onSubmit={getFormData}>
//                 <br></br>
//                 <div>
//                     <select value={rsvp} onChange={(e) => setRsvp(e.target.value)}>
//                         <option value="">Select Choice</option>
//                         <option value="True">Confirm</option>
//                         <option value="False">Decline</option>
//                     </select>
//                 </div><br></br><br></br>
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// }

// export default Rsvp;
































// import React, { useState } from 'react';
// import axios from 'axios';
// import { useParams, useLocation } from 'react-router-dom';

// function Rsvp() {
//     const [rsvp, setRsvp] = useState("");
//     const { event_id } = useParams();
//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);
//     const email = searchParams.get('email');
//     const role = searchParams.get('role');
    
//     const getFormData = async (e) => {
//         e.preventDefault();
//         console.log(event_id,email,role)
        
//         try {
//             const response = await axios.post(`http://localhost:8000/event_management/rsvp/${event_id}/`, {
//                 event_id: event_id,
//                 email: email,
//                 role: role,
//                 rsvp: rsvp
//             });
//             console.log(response.data);
//             alert("RSVP Sent successfully ");
//         } catch (error) {
//             console.error("Failed to send RSVP.", error);
//             alert("Failed to send RSVP: " + error);
//         }
//     }
    
//     return (
//         <div className="App">
//             <h1>RSVP</h1>
//             <form onSubmit={getFormData}>
//                 <br></br>
//                 <div>
//                     <select value={rsvp} onChange={(e) => setRsvp(e.target.value)}>
//                         <option value="">Select Choice</option>
//                         <option value="True">Confirm</option>
//                         <option value="False">Decline</option>
//                     </select>
//                 </div><br></br><br></br>
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// }

// export default Rsvp;




































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation, useParams } from 'react-router-dom';

// function Rsvp() {
//     const [rsvp, setRsvp] = useState("");
//     const { event_id } = useParams();
//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);
//     const email = searchParams.get('email');
//     const role = searchParams.get('role');
    
//     // useEffect(() => {
//     //     console.log("ticket_id=", ticket_id);
//     // }, [ticket_id]); // Log ticket_id whenever it changes
    
//     const getFormData = async (e) => {
//         e.preventDefault();
        
//         console.log("event id=", event_id);
//         console.log("email=", email);
//         console.log("role",role);

//         try {
//             const response = await axios.post(`http://localhost:8000/event_management/rsvp/${event_id}/?email=${email}&role=${role}/`, {
//                 event_id: event_id,
//                 email: email,
//                 role:role,
//                 rsvp:rsvp
//             });
//             console.log(response.data);
//             alert("RSVP Sent successfully ");
//             // setEmail("");
//         } catch (error) {
//             console.error("Failed to send RSVP.", error);
//             alert("Failed to send RSVP: " + error);
//         }
//     }
    
//     return (
//         <div className="App">
//             <h1>RSVP</h1>
//             <form onSubmit={getFormData}>
//                 <br></br>
//                 <div>
//                     <select value={rsvp} onChange={(e) => setRsvp(e.target.value)}>
//                         <option value="">Select Choice</option>
//                         <option value="True">Confirm</option>
//                         <option value="False">Decline</option>
//                     </select>
//                 </div><br></br><br></br>
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// }

// export default Rsvp;