import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Changepassword() {
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [rePasswordError, setRePasswordError] = useState("");
    const navigate = useNavigate();
    const { token } = useParams(); // Extract the token from the URL
    
    const getFormData = async (e) => {
        e.preventDefault();

        // Clear previous error messages
        setPasswordError("");
        setRePasswordError("");

        // Validate password
        if (!password) {
            setPasswordError("Please enter a password");
            return;
        }

        // Validate confirm password
        if (!rePassword) {
            setRePasswordError("Please confirm your password");
            return;
        }

        // Check if passwords match
        if (password !== rePassword) {
            setRePasswordError("Passwords do not match");
            return;
        }
        
        try {
            const response = await axios.post(`http://localhost:8000/event_management/change_password/${token}/`, {
                password: password,
                Re_password: rePassword
            });
            alert("Change password successful");
            // Optionally, clear the input fields
            setPassword("");
            setRePassword("");
            navigate("/login");
        } catch (error) {
            console.error("Password change failed", error);
            alert("Failed to change password. Please try again later.");
            // navigate("/login");
        }
    }
    
    return (
        <div className="App">
            <h1>Change Password</h1>
            <form onSubmit={getFormData}>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {passwordError && <span className="error">{passwordError}</span>}
                <br /><br />
                <input type="password" placeholder="Confirm Password" value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
                {rePasswordError && <span className="error">{rePasswordError}</span>}
                <br /><br />
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
}

export default Changepassword;


































// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';

// function Changepassword() {
//     const [password, setPassword] = useState("");
//     const [Re_password, setRePassword] = useState("");
//     const navigate = useNavigate();
//     const { token } = useParams(); // Extract the token from the URL
    
//     const getFormData = async (e) => {
//         e.preventDefault();
//         if (password !== Re_password) {
//             alert("Passwords do not match");
//             return;
//         }
        
//         try {
//             const response = await axios.post(`http://localhost:8000/event_management/change_password/${token}/`, {
//                 password: password,
//                 Re_password: Re_password
//             });
//             alert("Change password successful");
//             // Optionally, clear the input fields
//             setPassword("");
//             setRePassword("");
//             navigate("/login");
//         } catch (error) {
//             console.error("Password change failed", error);
//             alert("Failed to change password. Please try again later.");
//             // navigate("/login");
//         }
//     }
    
//     return (
//         <div className="App">
//             <h1>Change Password</h1>
//             <form onSubmit={getFormData}>
//                 <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
//                 <input type="password" placeholder="Confirm Password" value={Re_password} onChange={(e) => setRePassword(e.target.value)} /><br /><br />
//                 <button type="submit">Change Password</button>
//             </form>
//         </div>
//     );
// }

// export default Changepassword;







































// import React, { useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// function Changepassword() {
//     const [password, setPassword] = useState("");
//     const [Re_password, setRe_Password] = useState("");
//     const { token } = useParams(); // Extract the token from the URL
    
//     const getFormData = async (e) => {
//         e.preventDefault();
//         console.log(password, Re_password);
//         try {
//             const response = await axios.post(`http://localhost:8000/event_management/change_password/${token}`, {
//                 password: password,
//                 Re_password: Re_password
//             });
//             alert("Change password successful");
//         } catch (error) {
//             console.log("Password change failed", error);
//             alert("Invalid credentials");
//         }
//     }
    
//     return (
//         <div className="App">
//             <h1>Change Password</h1>
//             <form onSubmit={getFormData}>
//                 <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
//                 <input type="text" placeholder="Confirm Password" value={Re_password} onChange={(e) => setRe_Password(e.target.value)} /><br /><br />
//                 <button type="submit">Change Password</button>
//             </form>
//         </div>
//     );
// }

// export default Changepassword;



































// import React, {useState} from 'react'
// import axios from 'axios'
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import Forgotpasssword from './Forgotpassword';
// import { useParams } from 'react-router-dom';

// function Changepassword() {
//     const [password,setpassword]=useState("");
//     const [Re_password,setRe_Password]=useState("");
//     const getFormData = async (e)=>
//     {
//         e.preventDefault()
//         console.log(password,Re_password)
//         const { token } = useParams();
//         try
//         {
//             const response=await axios.post("http://localhost:8000/event_management/"+{token},
//             {
//                 password:password,
//                 Re_password:Re_password
//             })
//             alert("Change password successfully")
//         }
//         catch (error)
//         {
//             console.log("Password change failed",error)
//             alert("invalid credentials")
//         }
        
//     }
//     return (
//       <div className="App">
//         <h1>Change-Password</h1>
//         <form onSubmit={getFormData}>
//           <input type="text" placeholder="password" value={password} onChange={(e)=>setpassword(e.target.value)}></input><br></br><br></br>
//           <input type="text" placeholder="confirm-password" value={Re_password} onChange={(e)=>setRe_Password(e.target.value)}></input><br></br><br></br>
//           <button type="submit">Change-Password</button>
//           {/* <Routes>
//             <Route path="/Forgot_password" element={<Forgotpassword />} />
//           </Routes> */}
//           {/* <Link to="/forgot_password">Forgot_Password</Link> */}
          
//         </form>
//       </div>
//     );
//   }
  
// export default Changepassword;
  