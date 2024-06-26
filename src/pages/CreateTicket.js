import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function CreateTicket() {
    const [type, setType] = useState("");
    const [cost, setCost] = useState("");
    const [typeError, setTypeError] = useState("");
    const [costError, setCostError] = useState("");
    const { event_id } = useParams();
    const navigate = useNavigate();

    const getFormData = async (e) => {
        e.preventDefault();

        // Clear previous error messages
        setTypeError("");
        setCostError("");

        // Validate form fields
        let hasErrors = false;

        if (!type) {
            setTypeError("Please enter a ticket type");
            hasErrors = true;
        }

        if (!cost) {
            setCostError("Please enter a cost");
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:8000/event_management/create_ticket/`, {
                type: type,
                event_id: event_id,
                cost: cost
            },
            {
                headers: {
                    'Authorization':`Bearer ${token}`,
                }
            });
            console.log(response.data);
            alert("Ticket is generated successfully and Mail is sent to ");
            navigate(`/ticket/${event_id}/`);
        } catch (error) {
            console.error("Failed to create tickets.", error);
            alert("Failed: " + error);
        }
    }
    
    return (
        <div className="App">
            <h1>Create Ticket For The Event</h1>
            <form onSubmit={getFormData}>
                <br></br>
                <input type="text" placeholder="Ticket-Type" value={type} onChange={(e) => setType(e.target.value)} /><br /><br />
                {typeError && <span className="error">{typeError}</span>}
                <input type="text" placeholder="Cost" value={cost} onChange={(e) => setCost(e.target.value)} /><br /><br />
                {costError && <span className="error">{costError}</span>}
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateTicket;

































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useLocation, useParams} from 'react-router-dom';

// function CreateTicket() {
//     // const [email, setEmail] = useState("");
//     const [type, setType] = useState("");
//     // const [event_id,setEvent_id] = useState("");
//     const [cost, setCost] = useState("");
//     const { event_id } = useParams();
//     const navigate=useNavigate();
//     // const { event_id } = useParams();
//     // const location = useLocation();
//     // const searchParams = new URLSearchParams(location.search);
//     // const ticket_id = searchParams.get('ticket_id');
    
//     // useEffect(() => {
//     //     console.log("ticket_id=", ticket_id);
//     // }, [ticket_id]); // Log ticket_id whenever it changes
    
//     const getFormData = async (e) => {
//         e.preventDefault();
        
        
//         // console.log("event id=", event_id);
//         // console.log("ticket_id=", ticket_id);

//         try {
            
//             const token=localStorage.getItem('token')
//             console.log(token)
//             const response = await axios.post(`http://localhost:8000/event_management/create_ticket/`, {
//                 // email: email,
//                 type:type,
//                 event_id: event_id,
//                 cost:cost
//             },
//             {
//                 headers: {
//                     'Authorization':`Bearer ${token}`,
//                 }
//             }           
//         );
//             console.log(response.data);
//             alert("Ticket is generated successfully and Mail is sent to ");
//             navigate(`/ticket/${event_id}/`);
//             // navigate("/");
//             // setEmail("");
//         } catch (error) {
//             console.error("Failed to create tickets.", error);
//             alert("Failed: " + error);
//         }
//     }
    
//     return (
//         <div className="App">
//             <h1>Create Ticket For The Event</h1>
//             <form onSubmit={getFormData}>
//                 <br></br>
//                {/* Host-Email: <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br /> */}
//                 <input type="text" placeholder="Ticket-Type" value={type} onChange={(e) => setType(e.target.value)} /><br /><br />
//                 {/* <input type="text" placeholder="Event-Id" value={event_id} onChange={(e) => setEvent_id(e.target.value)} /><br /><br /> */}
//                 <input type="text" placeholder="Cost" value={cost} onChange={(e) => setCost(e.target.value)} /><br /><br />
//                 <button type="submit">Create</button>
//             </form>
//         </div>
//     );
// }

// export default CreateTicket;