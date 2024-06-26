import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Notification() {
    const [message, setMessage] = useState("");
    const [messageError, setMessageError] = useState("");
    const { event_id } = useParams();

    const sendFormData = async (e) => {
        e.preventDefault();

        // Clear previous error messages
        setMessageError("");

        // Validate form fields
        if (!message) {
            setMessageError("Please enter a message");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post("http://localhost:8000/event_management/notification/", {
                event_id: event_id,
                message: message
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert("Message sent successfully");
        } catch (error) {
            console.error("Failed to send message", error);
            alert("Failed to send message: " + error);
        }
    }

    return (
        <div>
            <h2>Send Notifications Here</h2>
            <form onSubmit={sendFormData}>
                <input type='text' placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
                {messageError && <span className="error">{messageError}</span>}
                <br /><br />
                <button type='submit'>Send</button>
            </form>
        </div>
    );
}

export default Notification;










































// import React, { useState } from 'react'
// import axios from 'axios'
// import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

// function Notification() {
//     // const [host_email,setHostEmail] = useState("");
//     // const [event_id, setEventId] = useState("");
//     const [message,setMessage] = useState("");
//     const {event_id} = useParams()

//     const sendformdata = async (e)=>
//     {
//         e.preventDefault()
//         // console.log(host_email,event_id,message)
//         try
//         {
//             const token =localStorage.getItem("token")
//             const response = await axios.post("http://localhost:8000/event_management/notification/",
//             {
//                 // host_email:host_email,
//                 event_id:event_id,
//                 message:message
//             },
//         {
//             headers: {
//                 'Authorization':`Bearer ${token}`
//             }
//         })
//             alert("message send successfully")
//         }
//         catch (error)
//         {
//             console.log("failed...",error);
//             alert("failed.."+error);
//         }
//     }

//     return (
//         <div>
//             <h2>Send Notifications Here</h2>
//             <form onSubmit={sendformdata}>
//                 {/* Host-Email<input type='text' name='host_email' value={host_email} onChange={(e)=>setHostEmail(e.target.value)}></input><br></br><br></br> */}
//                 {/* Event-Id<input type='text' name='event_id' value={event_id} onChange={(e)=>setEventId(e.target.value)}></input><br></br><br></br> */}
//                 message<input type='text' name='message' value={message} onChange={(e)=>setMessage(e.target.value)}></input><br></br><br></br>
//                 <button type='submit'>Send</button>
//             </form>
//         </div>
//     );
// }

// export default Notification;