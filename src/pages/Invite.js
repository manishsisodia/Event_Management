import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Invite() {
    const [inviteeEmail, setInviteeEmail] = useState("");
    const [role, setRole] = useState("");
    const [inviteeEmailError, setInviteeEmailError] = useState("");
    const [roleError, setRoleError] = useState("");
    const { event_id } = useParams();

    const getFormData = async (e) => {
        e.preventDefault();

        // Clear previous error messages
        setInviteeEmailError("");
        setRoleError("");

        // Validate form fields
        let hasErrors = false;

        if (!inviteeEmail) {
            setInviteeEmailError("Please enter invitee email");
            hasErrors = true;
        }

        if (!role) {
            setRoleError("Please select a role");
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post("http://localhost:8000/event_management/invite/", {
                invitee_email: inviteeEmail,
                event_id: event_id,
                role: role
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization':`Bearer ${token}`,
                }
            });
            alert("Invitation email sent to " + inviteeEmail);
            setInviteeEmail("");
            setRole("");
        } catch (error) {
            console.error("Invitation failed", error);
            alert("Invitation failed");
        }
    };

    return (
        <div className="App">
            <h1>Send Invitation</h1>
            <form onSubmit={getFormData}>
                <input type="text" placeholder="Invitee Email" value={inviteeEmail} onChange={(e) => setInviteeEmail(e.target.value)} />
                {inviteeEmailError && <span className="error">{inviteeEmailError}</span>}
                <br /><br />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">Select Role</option>
                    <option value="Attendee">Attendee</option>
                    <option value="Organizer">Organizer</option>
                    <option value="Volunteer">Volunteer</option>
                    <option value="Crew_Member">Crew Member</option>
                </select>
                {roleError && <span className="error">{roleError}</span>}
                <br /><br />
                <button type="submit">Invite</button>
            </form>
        </div>
    );
}

export default Invite;






































// import React, {useState} from 'react'
// import axios from 'axios'
// import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
// import Forgotpasssword from './Forgotpassword';
// import { useNavigate } from 'react-router-dom';

// function Invite() {
//     // const [host_email,setHostEmail]=useState("");
//     const [invitee_email,setEnviteeEmail]=useState("");
//     // const [event_id,setEvent_id]=useState("");
//     const [role,setRole]=useState("");
//     // const [password,setPassword]=useState("");
//     // const navigate = useNavigate(); // Access the history object
//     const {event_id} = useParams()
//     const getFormData = async (e)=>
//     {
//         e.preventDefault()
//         console.log(role)
//         // console.log(email,password)
//         try
//         {
          
//             const token=localStorage.getItem('token')
//             console.log(token)
//             const response=await axios.post("http://localhost:8000/event_management/invite/",
//             {
//                 // host_email:host_email,
//                 invitee_email:invitee_email,
//                 event_id:event_id,
//                 role:role
//             },
//           {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//                'Authorization':`Bearer ${token}`,
//            }
//           })
//             alert("invitation email is send to "+invitee_email)
//             // alert(email +  "login successful")
//             // setEmail("");
//             // setPassword("");
//             // navigate("/"); // Navigate to the homepage route
//         }
//         catch (error)
//         {
//             console.log("invitation  failed",error)
//             alert("invalid credentials",error)
//         }
        
//     }
//     return (
//       <div className="App">
//         <h1>Send Invitation</h1>
//         <form onSubmit={getFormData}>
//           {/* <input type="text" placeholder="Host-email" value={host_email} onChange={(e)=>setHostEmail(e.target.value)}></input><br></br><br></br> */}
//           <input type="text" placeholder="invitee-email" value={invitee_email} onChange={(e)=>setEnviteeEmail(e.target.value)}></input><br></br><br></br>
//           {/* <input type="text" placeholder="Event-id" value={event_id} onChange={(e)=>setEvent_id(e.target.value)}></input><br></br><br></br> */}
//           {/* <input type="text" placeholder="Role" value={role} onChange={(e)=>setRole(e.target.value)}></input><br></br><br></br> */}
//           <div>
//           <select value={role} onChange={(e) => setRole(e.target.value)}>
//           <option value="">Select Role</option>
//             <option value="Attendee">Attendee</option>
//             <option value="Organizer">Organizer</option>
//             <option value="Volunteer">Volunteer</option>
//             <option value="Crew_Member">Crew Member</option>
//             {/* <option value="Host">Host</option> */}
//         </select>
        

//         </div>
//         <br></br>
//           <button type="submit">Invite</button>
          
//         </form>
//       </div>
//     );
//   }
  
// export default Invite;
  