import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

function BookTicket() {
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const { event_id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const ticket_id = searchParams.get('ticket_id');
    
    useEffect(() => {
        console.log("ticket_id=", ticket_id);
    }, [ticket_id]); // Log ticket_id whenever it changes
    
    const getFormData = async (e) => {
        e.preventDefault();

        if (!name) {
            setNameError("Please select a name");
            return;
        } else {
            setNameError("");
        }
        
        console.log("event id=", event_id);
        console.log("ticket_id=", ticket_id);

        try {
            const token = localStorage.getItem('token')
            const response = await axios.post(`http://localhost:8000/event_management/book_ticket/${event_id}/?ticket_id=${ticket_id}`, {
                event_id: event_id,
                name: name,
                ticket_id: ticket_id
            },
        {
            headers: {
                'Authorization':`Bearer ${token}`
            }
        });
            console.log(response.data);
            alert("Mail is sent to " + name);
            setName("");
            navigate("/");
        } catch (error) {
            console.error("Failed to book tickets.", error);
            alert("Ticket already booked from this email Id: " + error);
            // navigate("/");
        }
    }
    
    return (
        <div className="App">
            <h1>Ticket-Booking</h1>
            <form onSubmit={getFormData}>
                <br></br>
                <div>
                    <select value={name} onChange={(e) => setName(e.target.value)}>
                        <option value="">Select</option>
                        <option value="Student">Student</option>
                        <option value="Researcher">Researcher</option>
                        <option value="Industry_Professionals">Industry_Professionals</option>
                        <option value="Other">Other</option>
                    </select>
                    {nameError && <span className="error">{nameError}</span>}
                </div>
                <br></br>
                <button type="submit">Payment</button>
            </form>
        </div>
    );
}

export default BookTicket;




































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useLocation, useParams } from 'react-router-dom';

// function BookTicket() {
//     const [name, setName] = useState("");
//     const { event_id } = useParams();
//     const location = useLocation();
//     const navigate = useNavigate();
//     const searchParams = new URLSearchParams(location.search);
//     const ticket_id = searchParams.get('ticket_id');
    
//     useEffect(() => {
//         console.log("ticket_id=", ticket_id);
//     }, [ticket_id]); // Log ticket_id whenever it changes
    
//     const getFormData = async (e) => {
//         e.preventDefault();
        
//         console.log("event id=", event_id);
//         console.log("ticket_id=", ticket_id);

//         try {
//             const token = localStorage.getItem('token')
//             const response = await axios.post(`http://localhost:8000/event_management/book_ticket/${event_id}/?ticket_id=${ticket_id}`, {
//                 event_id: event_id,
//                 name: name,
//                 ticket_id: ticket_id
//             },
//         {
//             headers: {
//                 'Authorization':`Bearer ${token}`
//             }
//         });
//             console.log(response.data);
//             alert("Mail is sent to " + name);
//             setName("");
//             navigate("/");
//         } catch (error) {
//             console.error("Failed to book tickets.", error);
//             alert("Ticket already booked from this email Id: " + error);
//             // navigate("/");
//         }
//     }
    
//     return (
//         <div className="App">
//             <h1>Ticket-Booking</h1>
//             <form onSubmit={getFormData}>
//                 <br></br>
//                 <div>
//             <select value={name} onChange={(e) => setName(e.target.value)}>
//             <option value="">Select</option>
//                 <option value="Student">Student</option>
//                 <option value="Researcher">Researcher</option>
//                 <option value="Industry_Professionals">Industry_Professionals</option>
//                 <option value="Other">Other</option>
//                 {/* <option value="Host">Host</option> */}
//             </select>
            

//             </div>
//         <br></br>
//                 {/* <input type="text" placeholder="your name" value={name} onChange={(e) => setName(e.target.value)} /><br /><br /> */}
//                 <button type="submit">Payment</button>
//             </form>
//         </div>
//     );
// }

// export default BookTicket;































// import React, { useState, useEffect} from 'react';
// import axios from 'axios';
// import { useLocation, useParams} from 'react-router-dom';

// function BookTicket() {
//     const [email, setEmail] = useState("");
//     const { event_id } = useParams();
//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);
//     const ticket_id = searchParams.get('ticket_id');
    
//     const getFormData = async (e) => {
//         e.preventDefault();
        
//         console.log("event id=", event_id);
//         console.log("ticket_id=", ticket_id);

//         try {
//             const response = await axios.post(`http://localhost:8000/event_management/book_ticket/${event_id}/?ticket_id=${ticket_id}`, {
//                 event_id: event_id,
//                 email: email,
//                 ticket_id: ticket_id
//             });
//             console.log(response.data);
//             alert("Mail is sent to " + email);
//             setEmail("");
//         } catch (error) {
//             console.error("Failed to book tickets.", error);
//             alert("Ticket already booked from this email Id: " + error);
//         }
//     }
    
//     return (
//         <div className="App">
//             <h1>Ticket-Booking</h1>
//             <form onSubmit={getFormData}>
//                 <br></br>
//                 <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />
//                 <button type="submit">Payment</button>
//             </form>
//         </div>
//     );
// }

// export default BookTicket;



































// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useParams } from 'react-router-dom';

// // function BookTicket() {
// //     // const [event_id, setEventId] = useState("");
// //     const [email, setEmail] = useState("");
// //     const { event_id, ticket_id } = useParams(); // Extract the token from the URL
    
// //     const getFormData = async (e) => {
// //         e.preventDefault();
        
// //         console.log("event id=",event_id);
// //         console.log("ticket_id=",ticket_id);

// //         try {
// //             const response = await axios.post(`http://localhost:8000/event_management/book_ticket/${event_id}/?ticket_id=${ticket_id}`, {
// //                 event_id: event_id,
// //                 email: email,
// //                 ticket_id:ticket_id
// //                 // cost: 220,
// //             });
// //             console.log(response.data)
// //             alert("mail is send on "+ email);
// //             // Optionally, clear the input fields
// //             setEmail("");
// //             // setRePassword("");
// //         } catch (error) {
// //             console.error("Failed to book tickets.", error);
// //             alert("Ticket booked already from this email Id"+error);
// //         }
// //     }
    
// //     return (
// //         <div className="App">
// //             <h1>Ticket-Booking</h1>
// //             <form onSubmit={getFormData}>
// //                 <br></br>
// //                 <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />
// //                 {/* General<br></br>
// //                 <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />
// //                  */}
// //                 {/* <input type="password" placeholder="Confirm Password" value={Re_password} onChange={(e) => setRePassword(e.target.value)} /><br /><br /> */}
// //                 <button type="submit">Payment</button>
// //             </form>
// //         </div>
// //     );
// // }

// // export default BookTicket;