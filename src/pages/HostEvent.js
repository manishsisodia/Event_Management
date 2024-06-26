import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function HostEvent() {
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    start_datetime: '',
    end_datetime: '',
    location: '',
    description: '',
    image: null,
  });

  const [errors, setErrors] = useState({
    type: '',
    name: '',
    start_datetime: '',
    end_datetime: '',
    location: '',
    description: '',
    image: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({
      type: '',
      name: '',
      start_datetime: '',
      end_datetime: '',
      location: '',
      description: '',
      image: '',
    });

    // Validate form fields
    let hasErrors = false;
    const errorFields = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        errorFields[key] = `Please enter ${key.replace('_', ' ')}`;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(errorFields);
      return;
    }

    const formDataWithImage = new FormData();
    formDataWithImage.append('type', formData.type);
    formDataWithImage.append('name', formData.name);
    formDataWithImage.append('start_datetime', formData.start_datetime);
    formDataWithImage.append('end_datetime', formData.end_datetime);
    formDataWithImage.append('location', formData.location);
    formDataWithImage.append('description', formData.description);
    formDataWithImage.append('image', formData.image);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/event_management/event/', formDataWithImage, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Event created successfully:', response.data);
      alert("create event successfully")
      navigate("/");
    } catch (error) {
      if (error.response.status === 409) {
        alert("Event with the same name and date and location already exists");
      } else {
        console.error('Error creating event:', error);
        alert("Failed to create event. Please try again later.");
      }
    }
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div>{errors.type && <span className="error">{errors.type}</span>}</div>
        <div>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="">Select Type</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>
        <div>{errors.name && <span className="error">{errors.name}</span>}</div>
        <div>
          <input type="text" placeholder='event-name' name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>{errors.start_datetime && <span className="error">{errors.start_datetime}</span>}</div>
        <div>
          <input type="datetime-local" placeholder='Start-date-time' name="start_datetime" value={formData.start_datetime} onChange={handleChange} />
        </div>
        <div>{errors.end_datetime && <span className="error">{errors.end_datetime}</span>}</div>
        <div>
          <input type="datetime-local" placeholder='End-date-time' name="end_datetime" value={formData.end_datetime} onChange={handleChange} />
        </div>
        <div>{errors.location && <span className="error">{errors.location}</span>}</div>
        <div>
          <input type="text" placeholder='location' name="location" value={formData.location} onChange={handleChange} />
        </div>
        <div>{errors.description && <span className="error">{errors.description}</span>}</div>
        <div>
          <textarea name="description" placeholder='description' value={formData.description} onChange={handleChange} />
        </div>
        <div>{errors.image && <span className="error">{errors.image}</span>}</div>
        <div>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default HostEvent;


































// import React, { useState, useEffect} from 'react';
// import axios from 'axios';
// import Select from 'react-select'
// import { Link, useNavigate } from 'react-router-dom';

// function HostEvent() {
//   const [formData, setFormData] = useState({
//     type: '',
//     // host_email:'',
//     name: '',
//     start_datetime: '',
//     end_datetime:'',
//     location: '',
//     description: '',
//     image: null, // For file uploads
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formDataWithImage = new FormData();
//     formDataWithImage.append('type', formData.type);
//     // formDataWithImage.append('host_email', formData.host_email);
//     formDataWithImage.append('name', formData.name);
//     formDataWithImage.append('start_datetime', formData.start_datetime);
//     formDataWithImage.append('end_datetime', formData.end_datetime);
//     formDataWithImage.append('location', formData.location);
//     formDataWithImage.append('description', formData.description);
//     formDataWithImage.append('image', formData.image);

//     try {

//       const token=localStorage.getItem('token')
//       console.log(token)

//       const response = await axios.post('http://localhost:8000/event_management/event/', formDataWithImage, {
//         headers: {
//            'Content-Type': 'multipart/form-data',
//             'Authorization':`Bearer ${token}`,
//         },
//       });
//       console.log('Event created successfully:', response.data);
//       alert("create event successfully")
//       navigate("/");
//       // navigate("/create_ticket/")
//       // Handle success, such as redirecting to another page or displaying a success message
//     } catch (error) {
//       if (error.response.status === 409) { // Conflict: event with same name and location already exists
//         alert("Event with the same name and date and location already exists");
//     } else {
//         console.error('Error creating event:', error);
//         alert("Failed to create event. Please try again later.");
//     }
//       // console.error('Error creating event:', error);
//       // alert("failed",error);
//       // Handle error, such as displaying an error message to the user
//     }
//   };
//   return (
//     <div>
//       <h2>Create Event</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <select name="type" value={formData.type} onChange={handleChange}>
//             <option value="">Select Type</option>
//             <option value="Public">Public</option>
//             <option value="Private">Private</option>
//           </select>
//         </div>
//         {/* <div>
//           <input type="text" placeholder='host-email' name="host_email" value={formData.host_email} onChange={handleChange} />
//         </div> */}
//         <div>
//           <input type="text" placeholder='event-name' name="name" value={formData.name} onChange={handleChange} />
//         </div>
//         <div>
//           <input type="datetime-local" placeholder='Start-date-time' name="start_datetime" value={formData.start_datetime} onChange={handleChange} />
//         </div>
//         <div>
//           <input type="datetime-local" placeholder='End-date-time' name="end_datetime" value={formData.end_datetime} onChange={handleChange} />
//         </div>
//         <div>
//           <input type="text" placeholder='location' name="location" value={formData.location} onChange={handleChange} />
//         </div>
//         <div>
//           <textarea name="description" placeholder='description' value={formData.description} onChange={handleChange} />
//         </div>
        
  
//         <div>
//           <input type="file" accept="image/*" onChange={handleFileChange} />
//         </div>
//         <button type="submit">Create Event</button>
//       </form>
//     </div>
//   );
// }

// export default HostEvent;




























//original

// import React, { useState } from 'react';
// import axios from 'axios';

// function HostEvent() {
//   const [formData, setFormData] = useState({
//     type: '',
//     name: '',
//     start_datetime: '',
//     end_datetime:'',
//     location: '',
//     description: '',
//     image: null, // For file uploads
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formDataWithImage = new FormData();
//     formDataWithImage.append('type', formData.type);
//     formDataWithImage.append('name', formData.name);
//     formDataWithImage.append('start_datetime', formData.start_datetime);
//     formDataWithImage.append('end_datetime', formData.end_datetime);
//     formDataWithImage.append('location', formData.location);
//     formDataWithImage.append('description', formData.description);
//     formDataWithImage.append('image', formData.image);

//     try {
//       const response = await axios.post('http://localhost:8000/event_management/event/', formDataWithImage, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log('Event created successfully:', response.data);
//       alert("create event successfully")
//       // Handle success, such as redirecting to another page or displaying a success message
//     } catch (error) {
//       console.error('Error creating event:', error);
//       alert("failed",error);
//       // Handle error, such as displaying an error message to the user
//     }
//   };

//   return (
//     <div>
//       <h2>Create Event</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <select name="type" value={formData.type} onChange={handleChange}>
//             <option value="">Select Type</option>
//             <option value="Public">Public</option>
//             <option value="Private">Private</option>
//           </select>
//         </div>
//         <div>
//           <input type="text" placeholder='event-name' name="name" value={formData.name} onChange={handleChange} />
//         </div>
//         <div>
//           <input type="datetime-local" placeholder='Start-date-time' name="start_datetime" value={formData.start_datetime} onChange={handleChange} />
//         </div>
//         <div>
//           <input type="datetime-local" placeholder='End-date-time' name="end_datetime" value={formData.end_datetime} onChange={handleChange} />
//         </div>
//         <div>
//           <input type="text" placeholder='location' name="location" value={formData.location} onChange={handleChange} />
//         </div>
//         <div>
//           <textarea name="description" placeholder='description' value={formData.description} onChange={handleChange} />
//         </div>
//         <div>
//           <input type="file" accept="image/*" onChange={handleFileChange} />
//         </div>
//         <button type="submit">Create Event</button>
//       </form>
//     </div>
//   );
// }

// export default HostEvent;















































// import React, { useState } from 'react';
// import axios from 'axios';

// function HostEvent() {
//     const [type, setType] = useState("");
//     const [name, setName] = useState("");
//     const [datetime, setDatetime] = useState("");
//     const [location, setLocation] = useState("");
//     const [description, setDescription] = useState("");
//     const [image,setImage] = useState("")
//     const [errors, setErrors] = useState({
//         type: "",
//         name: "",
//         datetime: "",
//         location: "",
//         description: "",
//         image: ""
//     });

//     const validateForm = () => {
//         let isValid = true;
//         const newErrors = {
//             type: "",
//             name: "",
//             datetime: "",
//             location: "",
//             description: "",
//             image: ""
//         };

//         if (!type) {
//             newErrors.type = "event type is required";
//             isValid = false;
//         }
//         if (!name) {
//             newErrors.name = "event name is required";
//             isValid = false;
//         }
//         if (!datetime) {
//             newErrors.datetime = "Date and Time is required";
//             isValid = false;
//         }
//         if (!location) {
//             newErrors.location = "location is required";
//             isValid = false;
//         }
//         if (!description) {
//             newErrors.description = "Description is required";
//             isValid = false;
//         }
//         if (!image) {
//             newErrors.image="Image is required";
//             isValid = false;
//         }

//         setErrors(newErrors);
//         return isValid;
//     };

    

//     const getFormData = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) {
//             return;
//         }

//         try {
//             const formattedDatetime = new Date(datetime).toISOString();
//             console.log(formattedDatetime)
//             console.log(type,name,datetime,location,description)
//             const response = await axios.post("http://localhost:8000/event_management/create_event/", {
//                 type: type,
//                 name: name,
//                 datetime: formattedDatetime,
//                 location: location,
//                 description: description,
//                 image: image
//             });
//             console.log(response.data)
//             alert(" event created successfully");
//             setType("");
//             setName("");
//             setDatetime("");
//             setLocation("");
//             setDescription("");
//             setImage(null)
//         } catch (error) {
//             console.log("Event creation failed", error);
//             alert("Event creation failed: " + error.message);
//         }
//     };

//     return (
//         <div className="App">
//             <h1>Create-Event</h1>
//             <form onSubmit={getFormData}>
//                 <div>
//                     <select name="type" value={type} onChange={(e)=>setType(e.target.value)}>
//                         <option value="">Select Type</option>
//                         <option value="Public">Public</option>
//                         <option value="Private">Private</option>
//                     </select>
//                     {/* <input type="text" placeholder="first_name" value={fname} onChange={(e) => setFname(e.target.value)} /><br></br> */}
//                     {errors.type && <span>{errors.type}</span>}
//                 </div>
//                 <br></br>
//                 <div>
//                     <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} /><br></br>
//                     {errors.name && <span>{errors.name}</span>}
//                 </div>
//                 <br></br>
//                 <div>
//                     <input type="datetime-local" placeholder="yyyy-mm-dd hh:mm:ss" value={datetime} onChange={(e) => setDatetime(e.target.value)} /><br></br>
//                     {errors.datetime && <span>{errors.datetime}</span>}
//                 </div>
//                 <br></br>
//                 <div>
//                     <input type="text" placeholder="location" value={location} onChange={(e) => setLocation(e.target.value)} /><br></br>
//                     {errors.location && <span>{errors.location}</span>}
//                 </div>
//                 <br></br>
//                 <div>
//                     <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} /><br></br>
//                     {errors.description && <span>{errors.description}</span>}
//                 </div>
//                 <br></br>
//                 <div>
//                     <input type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])} /><br></br>
//                     {errors.image && <span>{errors.image}</span>}
//                 </div>
//                 <br></br>
//                 <button type="submit">Create-Event</button>
//             </form>
//         </div>
//     );
// }

// export default HostEvent;







































