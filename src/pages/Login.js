import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const getFormData = async (e) => {
        e.preventDefault();

        // Clear previous error messages
        setEmailError("");
        setPasswordError("");

        // Validate form fields
        let hasErrors = false;

        if (!email) {
            setEmailError("Please enter your email");
            hasErrors = true;
        }

        if (!password) {
            setPasswordError("Please enter your password");
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/event_management/login/", {
                email: email,
                password: password
            });
            // Extract the token from the response data
            const token = response.data.access;

            // Store the token securely (e.g., in local storage)
            localStorage.setItem('token', token);
            localStorage.setItem('email', response.data.email);

            setEmail("");
            setPassword("");

            navigate("/");
            window.location.reload(); // Refresh the page after successful login
        } catch (error) {
            console.error("Login failed", error);
            alert("Invalid credentials");
        }
    }

    return (
        <div className="App">
            <h1>Login</h1>
            <form onSubmit={getFormData}>
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {emailError && <span className="error">{emailError}</span>}
                <br /><br />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {passwordError && <span className="error">{passwordError}</span>}
                <br /><br />
                <button type="submit">Login</button>
                <Link to="/forgot_password">Forgot Password</Link>
            </form>
        </div>
    );
}

export default Login;







































// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';

// function Login() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     const getFormData = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("http://localhost:8000/event_management/login/", {
//                 email: email,
//                 password: password
//             });
//             // Extract the token from the response data
//             const token = response.data.access;

//             // Store the token securely (e.g., in local storage)
//             localStorage.setItem('token', token);
//             localStorage.setItem('email',response.data.email)
//             // setIsLoggedIn(true);
//             // localStorage.setItem('token', response.data.token);  // Store token in localStorage
//             console.log("login---",response.data)
//             console.log("token",token)
//             setEmail("");
//             setPassword("");
            
//             navigate("/");
//             window.location.reload(); // Refresh the page after successful login
//         } catch (error) {
//             console.log("Login failed", error);
//             alert("Invalid credentials");
//         }
//     }

//     return (
//         <div className="App">
//             <h1>Login</h1>
//             <form onSubmit={getFormData}>
//                 <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}></input><br></br><br></br>
//                 <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></input><br></br><br></br>
//                 <button type="submit">Login</button>
//                 <Link to="/forgot_password">Forgot Password</Link>
//             </form>
//         </div>
//     );
// }

// export default Login;
































// import React, {useState} from 'react'
// import axios from 'axios'
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import Forgotpasssword from './Forgotpassword';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//     const [email,setEmail]=useState("");
//     const [password,setPassword]=useState("");
//     const navigate = useNavigate(); // Access the history object
//     const getFormData = async (e)=>
//     {
//         e.preventDefault()
//         console.log(email,password)
//         try
//         {
//             const response=await axios.post("http://localhost:8000/event_management/login/",
//             {
//                 email:email,
//                 password:password
//             })
//             // alert(email +  "login successful")
//             setEmail("");
//             setPassword("");
//             navigate("/"); // Navigate to the homepage route
//         }
//         catch (error)
//         {
//             console.log("Login failed",error)
//             alert("invalid credentials")
//         }
        
//     }
//     return (
//       <div className="App">
//         <h1>Login</h1>
//         <form onSubmit={getFormData}>
//           <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}></input><br></br><br></br>
//           <input type="text" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}></input><br></br><br></br>
//           <button type="submit">Login</button>
//           {/* <Routes>
//             <Route path="/Forgot_password" element={<Forgotpassword />} />
//           </Routes> */}
//           <Link to="/forgot_password">Forgot_Password</Link>
          
//         </form>
//       </div>
//     );
//   }
  
// export default Login;
  