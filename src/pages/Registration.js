import React, { useState } from 'react';
import axios from 'axios';
import '../Css/Registration.css'
import { useNavigate, useLocation, useParams } from 'react-router-dom';
// import Select from 'react-select'

function Registration() {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();
    // const [role, setRole]=useState("attendee");
    // const [selectedRoles,setSelectedRoles]=useState([])
    // const roles=[
    //     { value: "attendee", label:"Attendee" },
    //     { value: "organizer", label:"Organizer" },
    //     { value: "host", label:"Host" },
    //     { value: "volunteer", label:"Volunteer" },
    //     { value: "crew_member", label:"Crew_Member" }
    // ];
    
    const [errors, setErrors] = useState({
        fname: "",
        lname: "",
        phone: "",
        email: "",
        password: "",
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            fname: "",
            lname: "",
            phone: "",
            email: "",
            password: ""
        };

        if (!fname) {
            newErrors.fname = "First name is required";
            isValid = false;
        }
        else if(fname.length<3) {
          newErrors.fname="First name must be 3 characters long"
        }
        if (!lname) {
            newErrors.lname = "Last name is required";
            isValid = false;
        }
        if (!phone) {
            newErrors.phone = "Phone number is required";
            isValid = false;
        } else if (phone.length !== 10 || !/^\d+$/.test(phone)) {
            newErrors.phone = "Phone number must be 10 digits long and contain only digits";
            isValid = false;
        }
        if (!email) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid";
            isValid = false;
        }
        if (!password) {
            newErrors.password = "Password is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const getFormData = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/event_management/register/", {
                first_name: fname,
                last_name: lname,
                phone_number: phone,
                email: email,
                password: password,
                // role: selectedRoles.map(role=>role.value)
            });
            // console.log(selectedRoles)
            alert(email + " registered successfully");
            setFname("");
            setLname("");
            setPhone("");
            setEmail("");
            setPassword("");
            navigate("/login");
            // setRole("attendee");
        } catch (error) {
            console.log("registration failed", error);
            alert("Registration failed: " + error.message);
        }
    };

    

    return (
        <div className="App">
            <h1>Sign-Up</h1>
            <form onSubmit={getFormData}>
                <div>
                    <input type="text" placeholder="first_name" value={fname} onChange={(e) => setFname(e.target.value)} /><br></br>
                    {errors.fname && <span>{errors.fname}</span>}
                </div>
                <br></br>
                <div>
                    <input type="text" placeholder="last_name" value={lname} onChange={(e) => setLname(e.target.value)} /><br></br>
                    {errors.lname && <span>{errors.lname}</span>}
                </div>
                <br></br>
                <div>
                    <input type="text" placeholder="phone_number" value={phone} onChange={(e) => setPhone(e.target.value)} /><br></br>
                    {errors.phone && <span>{errors.phone}</span>}
                </div>
                <br></br>
                <div>
                    <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br></br>
                    {errors.email && <span>{errors.email}</span>}
                </div>
                <br></br>
                <div>
                    <input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br></br>
                    {errors.password && <span>{errors.password}</span>}
                </div>
                <br></br>
                {/* <div>
                    <Select
                        options={roles.map(role=>({value:role.value, label:role.label}))}
                        value={selectedRoles}
                        onChange={(selectedRoles)=>setSelectedRoles(selectedRoles)}
                        isMulti={true}
                    />
                </div> */}
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Registration;





























// import React, {useState} from 'react'
// import axios from 'axios'

// function Registration() {
//     const [fname,setFname]=useState("");
//     const [lname,setLname]=useState("");
//     const [phone,setPhone]=useState("");
//     const [email,setEmail]=useState("");
//     const [password,setPassword]=useState("");
//     const getFormData = async (e)=>
//     {
//         e.preventDefault()
//         console.log(fname," --",lname,phone,email,password)
//         try
//         {
//             const response=await axios.post("http://localhost:8000/event_management/register/",
//             {
//                 first_name:fname,
//                 last_name:lname,
//                 phone_number:phone,
//                 email:email,
//                 password:password
//             })
//             alert(email + "registerd successfully")
//         }
//         catch (error)
//         {
//             console.log("registration failed",error)
//             alert(error)
//         }
//     }
//     return (
//       <div className="App">
//         <h1>Welcome to Event Management</h1>
//         <form onSubmit={getFormData}>
//           <input type="text" placeholder="first_name" value={fname} onChange={(e)=>setFname(e.target.value)}></input><br></br><br></br>
//           <input type="text" placeholder="last_name" value={lname} onChange={(e)=>setLname(e.target.value)}></input><br></br><br></br>
//           <input type="text" placeholder="phone_number" value={phone} onChange={(e)=>setPhone(e.target.value)}></input><br></br><br></br>
//           <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}></input><br></br><br></br>
//           <input type="text" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}></input><br></br><br></br>
//           <button type="submit">Register</button>
//         </form>
//       </div>
//     );
//   }
  
//   export default Registration;
  