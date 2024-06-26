import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Sendmessage() {
    const [message, setMessage] = useState("");
    const [messageError, setMessageError] = useState("");
    const navigate = useNavigate();

    const getFormData = async (e) => {
        e.preventDefault();
        
        // Clear previous error message
        setMessageError("");

        // Validate the message field
        if (!message) {
            setMessageError("Please enter a message");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post("http://localhost:8000/event_management/messages/", {
                message: message
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            console.log(response.data);
            alert("Message sent successfully");
            navigate("/messages/");
        } catch (error) {
            console.log("Message send failed", error);
            alert("Failed to send message");
        }
    }

    return (
        <div className="App">
            <h1>Send Message Here</h1>
            <form onSubmit={getFormData}>
                <input type="text" placeholder="Write here..." value={message} onChange={(e) => setMessage(e.target.value)}></input>
                {messageError && <span className="error">{messageError}</span>}
                <br/><br/>
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Sendmessage;





































// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';

// function Sendmessage() {
//     // const [sender_email, setSenderEmail] = useState("");
//     // const [message_datetime, setMsgDate] = useState("");
//     // const [event_id,setEvent_id] = useState("");
//     const [message,setMessage] = useState("");
//     const navigate = useNavigate();

//     const getFormData = async (e) => {
//         e.preventDefault();
//         // console.log(sender_email,message)
//         try {
//             const token = localStorage.getItem('token')
//             const response = await axios.post("http://localhost:8000/event_management/messages/", {
//                 // sender_email: sender_email,
//                 // message_datetime:message_datetime,
//                 // event_id:event_id,
//                 message:message
//             },
//             {
//                 headers: {
//                     'Authorization':`Bearer ${token}`
//                 }
//             }
//         );
            
//             // Extract the token from the response data
//             // const token = response.data.access;

//             // Store the token securely (e.g., in local storage)
//             // localStorage.setItem('token', token);

//             // localStorage.setItem('token', response.data.token);  // Store token in localStorage
//             console.log(response.data)
//             // console.log("token",token)
//             // setEmail("");
//             // setPassword("");
//             // navigate("/");
//             alert("send successfully")
//             navigate("/messages/")
//         } catch (error) {
//             console.log("Message send  failed", error);
//             alert("Invalid credentials",error);
//         }
//     }

//     return (
//         <div className="App">
//             <h1>Send Message Here</h1>
//             <form onSubmit={getFormData}>
//                 {/* <input type="text" placeholder="email" value={sender_email} onChange={(e) => setSenderEmail(e.target.value)}></input><br></br><br></br> */}
//                 {/* <input type="datetime-local" placeholder="datetime" value={message_datetime} onChange={(e) => setMsgDate(e.target.value)}></input><br></br><br></br>
//                 <input type="text" placeholder="event_id" value={event_id} onChange={(e) => setEvent_id(e.target.value)}></input><br></br><br></br> */}
//                 <input type="text" placeholder="Write here..." value={message} onChange={(e) => setMessage(e.target.value)}></input><br></br><br></br>
//                 <button type="submit">Send</button>
//             </form>
//         </div>
//     );
// }

// export default Sendmessage;