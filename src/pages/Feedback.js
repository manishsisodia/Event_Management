import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Feedback() {
    const [feedback, setFeedback] = useState("");
    const [feedbackError, setFeedbackError] = useState("");
    const { event_id } = useParams();
    const navigate = useNavigate();

    const getFormData = async (e) => {
        e.preventDefault();

        // Clear previous error message
        setFeedbackError("");

        // Validate form field
        if (!feedback) {
            setFeedbackError("Please enter feedback");
            return;
        }

        try {
            const token = localStorage.getItem('token')
            const response = await axios.post(`http://localhost:8000/event_management/feedback/?id=${event_id}`, {
                feedback: feedback
            },
            {
                headers: {
                    'Authorization':`Bearer ${token}`
                }
            });
            console.log(response.data);
            alert("Feedback posted successfully");
            setFeedback("");
            navigate(`/event/${event_id}/`);
        } catch (error) {
            console.error("Feedback failed", error);
            alert("Failed to post feedback");
        }
    }

    return (
        <div className="App">
            <h1>Give FEEDBACK</h1>
            <form onSubmit={getFormData}>
                <input type="text" placeholder="Feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                {feedbackError && <span className="error">{feedbackError}</span>}
                <br /><br />
                <button type="submit">Post</button>
            </form>
        </div>
    );
}

export default Feedback;



































// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate, useParams } from 'react-router-dom';

// function Feedback() {
//     // const [email, setEmail] = useState("");
//     const [feedback, setFeedback] = useState("");
//     const { event_id } = useParams();
//     const navigate = useNavigate();

//     const getFormData = async (e) => {
//         e.preventDefault();
//         try {
//             const token = localStorage.getItem('token')
//             const response = await axios.post(`http://localhost:8000/event_management/feedback/?id=${event_id}`, {
//                 // email: email,
//                 feedback: feedback
//             },
//             {
//             headers: {
//                 'Authorization':`Bearer ${token}`
//             }
//         });
//             // Extract the token from the response data
//             // const token = response.data.access;

//             // Store the token securely (e.g., in local storage)
//             // localStorage.setItem('token', token);

//             // localStorage.setItem('token', response.data.token);  // Store token in localStorage
//             console.log(response.data)
//             // console.log("token",token)
//             // setEmail("");
//             setFeedback("");
//             navigate(`/event/${event_id}/`);
//         } catch (error) {
//             console.log("Feedback failed", error);
//             alert("Feedback failed");
//         }
//     }

//     return (
//         <div className="App">
//             <h1>Give FEEDBACK</h1>
//             <form onSubmit={getFormData}>
//                 {/* <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}></input><br></br><br></br> */}
//                 <input type="text" placeholder="feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)}></input><br></br><br></br>
//                 <button type="submit">Post</button>
//                 {/* <Link to="/forgot_password">Forgot Password</Link> */}
//             </form>
//         </div>
//     );
// }

// export default Feedback;