import React, { useState } from 'react';
import axios from 'axios';

function Forgotpassword() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const getFormData = async (e) => {
        e.preventDefault();

        // Clear previous error message
        setEmailError("");

        // Validate form field
        if (!email) {
            setEmailError("Please enter your email");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/event_management/forgot_password/", {
                email: email
            });
            alert("Email sent to " + email);
            setEmail("");
        } catch (error) {
            console.error("Forgot password failed", error);
            alert("Invalid credentials");
        }
    };

    return (
        <div className="App">
            <h1>Forgot Password</h1>
            <form onSubmit={getFormData}>
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {emailError && <span className="error">{emailError}</span>}
                <br /><br />
                <button type="submit">Send Mail</button>
            </form>
        </div>
    );
}

export default Forgotpassword;



































// import React, {useState} from 'react'
// import axios from 'axios'
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// function Forgotpassword() {
//     const [email,setEmail]=useState("");
//     const getFormData = async (e)=>
//     {
//         e.preventDefault()
//         console.log(email)
//         try
//         {
//             const response=await axios.post("http://localhost:8000/event_management/forgot_password/",
//             {
//                 email:email
//             })
//             alert("email send on " + email);
//             setEmail("")
//         }
//         catch (error)
//         {
//             console.log("forgot-password failed",error)
//             alert("invalid credentials")
//         }
        
//     }
//     return (
//       <div className="App">
//         <h1>Forgot Password</h1>
//         <form onSubmit={getFormData}>
//           <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}></input><br></br><br></br>
//           <button type="submit">Send-Mail</button>
//         </form>
//       </div>
//     );
//   }
  
// export default Forgotpassword;
  




























// import React, {useState, useEffect} from 'react'
// import axios from 'axios'



// function Forgotpasssword() {
//     const [email,setEmail]=useState("")

//     useEffect(()=> {
//         axios.post("http://localhost:8000/event_management/forgot_password/")
//         .then(response=> {

//             setEmail(response.data.data)
//         })
//         .catch(error => {
//             console.error('Error fetching events:', error);
//         });
//     }, []);

//     return (
//         <div>
//             <form onSubmit={F}
//             <input type='text' placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}></input><br></br><br></br>
//             <button type='submit'>Send-Mail</button>
//         </div>
//     )
// }


// export default Forgotpasssword;