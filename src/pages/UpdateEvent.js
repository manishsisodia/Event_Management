import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateEvent() {
    const { event_id } = useParams();
    const navigate = useNavigate();
    
    // Initialize formData with an object containing all form fields
    const [formData, setFormData] = useState({
        type: '',
        name: '',
        start_datetime: '',
        end_datetime: '',
        location: '',
        description: '',
        image: null
    });

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8000/event_management/event/?id=${event_id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const eventData = response.data.data[0]; // Assuming the API response is an array and you want the first item
                console.log(eventData);
                setFormData(eventData);
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };

        fetchEventDetails();
    }, [event_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare form data with image
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
            const response = await axios.put(`http://localhost:8000/event_management/event/?id=${event_id}`, formDataWithImage, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Event updated successfully:', response.data);
            alert("Event updated successfully");
            navigate(`/event/${event_id}`);
        } catch (error) {
            console.error('Error updating event:', error);
            alert("Please check all the fields.Failed to update event. Please try again.");
        }
    };

    return (
        <div>
            <h2>Update Event</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <select name="type" value={formData.type} onChange={handleChange}>
                        <option value="">Select Type</option>
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                    </select>
                </div>
                <div>
                    <input type="text" placeholder="Enter name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <input type="datetime-local" placeholder='Start Date and Time' name="start_datetime" value={formData.start_datetime} onChange={handleChange} />
                </div>
                <div>
                    <input type="datetime-local" placeholder='End Date and Time' name="end_datetime" value={formData.end_datetime} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" placeholder='Location' name="location" value={formData.location} onChange={handleChange} />
                </div>
                <div>
                    <textarea name="description" placeholder='Description' value={formData.description} onChange={handleChange} />
                </div>
                <div>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </div>
                <button type="submit">Update Event</button>
            </form>
        </div>
    );
}

export default UpdateEvent;









































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// function UpdateEvent() {
//     const { event_id } = useParams();
//     const navigate = useNavigate();
    
//     // Initialize formData with an object containing all form fields
//     const [formData, setFormData] = useState({
//         type: '',
//         name: '',
//         start_datetime: '',
//         end_datetime: '',
//         location: '',
//         description: '',
//         image: null
//     });

//     // Initialize error messages state
//     const [errors, setErrors] = useState({
//         type: '',
//         name: '',
//         start_datetime: '',
//         end_datetime: '',
//         location: '',
//         description: ''
//     });

//     useEffect(() => {
//         const fetchEventDetails = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await axios.get(`http://localhost:8000/event_management/event/?id=${event_id}`, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });
//                 const eventData = response.data.data[0]; // Assuming the API response is an array and you want the first item
//                 console.log(eventData);
//                 setFormData(eventData);
//             } catch (error) {
//                 console.error('Error fetching event details:', error);
//             }
//         };

//         fetchEventDetails();
//     }, [event_id]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleFileChange = (e) => {
//         setFormData({ ...formData, image: e.target.files[0] });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Validate form fields
//         const errors = {};
//         let hasErrors = false;

//         Object.entries(formData).forEach(([key, value]) => {
//             if (key !== 'image' && typeof value === 'string' && value === '') {
//                 errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
//                 hasErrors = true;
//             }
//         });

//         if (hasErrors) {
//             setErrors(errors);
//             return;
//         }

//         // Prepare form data with image
//         const formDataWithImage = new FormData();
//         formDataWithImage.append('type', formData.type);
//         formDataWithImage.append('name', formData.name);
//         formDataWithImage.append('start_datetime', formData.start_datetime);
//         formDataWithImage.append('end_datetime', formData.end_datetime);
//         formDataWithImage.append('location', formData.location);
//         formDataWithImage.append('description', formData.description);
//         formDataWithImage.append('image', formData.image);

//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.put(`http://localhost:8000/event_management/event/?id=${event_id}`, formDataWithImage, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             console.log('Event updated successfully:', response.data);
//             alert("Event updated successfully");
//             navigate(`/event/${event_id}`);
//         } catch (error) {
//             console.error('Error updating event:', error);
//             alert("Failed to update event. Please try again.");
//         }
//     };

//     return (
//         <div>
//             <h2>Update Event</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <select name="type" value={formData.type} onChange={handleChange}>
//                         <option value="">Select Type</option>
//                         <option value="Public">Public</option>
//                         <option value="Private">Private</option>
//                     </select>
//                     {errors.type && <span className="error">{errors.type}</span>}
//                 </div>
//                 <div>
//                     <input type="text" placeholder="Enter name" name="name" value={formData.name} onChange={handleChange} />
//                     {errors.name && <span className="error">{errors.name}</span>}
//                 </div>
//                 <div>
//                     <input type="datetime-local" placeholder='Start Date and Time' name="start_datetime" value={formData.start_datetime} onChange={handleChange} />
//                     {errors.start_datetime && <span className="error">{errors.start_datetime}</span>}
//                 </div>
//                 <div>
//                     <input type="datetime-local" placeholder='End Date and Time' name="end_datetime" value={formData.end_datetime} onChange={handleChange} />
//                     {errors.end_datetime && <span className="error">{errors.end_datetime}</span>}
//                 </div>
//                 <div>
//                     <input type="text" placeholder='Location' name="location" value={formData.location} onChange={handleChange} />
//                     {errors.location && <span className="error">{errors.location}</span>}
//                 </div>
//                 <div>
//                     <textarea name="description" placeholder='Description' value={formData.description} onChange={handleChange} />
//                     {errors.description && <span className="error">{errors.description}</span>}
//                 </div>
//                 <div>
//                     <input type="file" accept="image/*" onChange={handleFileChange} />
//                 </div>
//                 <button type="submit">Update Event</button>
//             </form>
//         </div>
//     );
// }

// export default UpdateEvent;






































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// function UpdateEvent() {
//     const { event_id } = useParams();
//     const navigate = useNavigate();
    
//     // Initialize formData with an object containing all form fields
//     const [formData, setFormData] = useState({
//         type: '',
//         name: '',
//         start_datetime: '',
//         end_datetime: '',
//         location: '',
//         description: '',
//         image: null
//     });

//     // Initialize error messages state
//     const [errors, setErrors] = useState({
//         type: '',
//         name: '',
//         start_datetime: '',
//         end_datetime: '',
//         location: '',
//         description: ''
//     });

//     useEffect(() => {
//         const fetchEventDetails = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await axios.get(`http://localhost:8000/event_management/event/?id=${event_id}`, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });
//                 const eventData = response.data.data[0]; // Assuming the API response is an array and you want the first item
//                 console.log(eventData);
//                 setFormData(eventData);
//             } catch (error) {
//                 console.error('Error fetching event details:', error);
//             }
//         };

//         fetchEventDetails();
//     }, [event_id]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleFileChange = (e) => {
//         setFormData({ ...formData, image: e.target.files[0] });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Validate form fields
//         const errors = {};
//         let hasErrors = false;

//         Object.entries(formData).forEach(([key, value]) => {
//             if (key !== 'image' && typeof value === 'string' && !value.trim()) {
//                 errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
//                 hasErrors = true;
//             }
//         });
//         // Object.entries(formData).forEach(([key, value]) => {
//         //     if (key !== 'image' && !value.trim()) {
//         //         errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
//         //         hasErrors = true;
//         //     }
//         // });

//         if (hasErrors) {
//             setErrors(errors);
//             return;
//         }

//         // Prepare form data with image
//         const formDataWithImage = new FormData();
//         formDataWithImage.append('type', formData.type);
//         formDataWithImage.append('name', formData.name);
//         formDataWithImage.append('start_datetime', formData.start_datetime);
//         formDataWithImage.append('end_datetime', formData.end_datetime);
//         formDataWithImage.append('location', formData.location);
//         formDataWithImage.append('description', formData.description);
//         formDataWithImage.append('image', formData.image);

//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.put(`http://localhost:8000/event_management/event/?id=${event_id}`, formDataWithImage, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             console.log('Event updated successfully:', response.data);
//             alert("Event updated successfully");
//             navigate(`/event/${event_id}`);
//         } catch (error) {
//             console.error('Error updating event:', error);
//             alert("Failed to update event. Please try again.");
//         }
//     };

//     return (
//         <div>
//             <h2>Update Event</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <select name="type" value={formData.type} onChange={handleChange}>
//                         <option value="">Select Type</option>
//                         <option value="Public">Public</option>
//                         <option value="Private">Private</option>
//                     </select>
//                     {errors.type && <span className="error">{errors.type}</span>}
//                 </div>
//                 <div>
//                     <input type="text" placeholder="Enter name" name="name" value={formData.name} onChange={handleChange} />
//                     {errors.name && <span className="error">{errors.name}</span>}
//                 </div>
//                 <div>
//                     <input type="datetime-local" placeholder='Start Date and Time' name="start_datetime" value={formData.start_datetime} onChange={handleChange} />
//                     {errors.start_datetime && <span className="error">{errors.start_datetime}</span>}
//                 </div>
//                 <div>
//                     <input type="datetime-local" placeholder='End Date and Time' name="end_datetime" value={formData.end_datetime} onChange={handleChange} />
//                     {errors.end_datetime && <span className="error">{errors.end_datetime}</span>}
//                 </div>
//                 <div>
//                     <input type="text" placeholder='Location' name="location" value={formData.location} onChange={handleChange} />
//                     {errors.location && <span className="error">{errors.location}</span>}
//                 </div>
//                 <div>
//                     <textarea name="description" placeholder='Description' value={formData.description} onChange={handleChange} />
//                     {errors.description && <span className="error">{errors.description}</span>}
//                 </div>
//                 <div>
//                     <input type="file" accept="image/*" onChange={handleFileChange} />
//                 </div>
//                 <button type="submit">Update Event</button>
//             </form>
//         </div>
//     );
// }

// export default UpdateEvent;























































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// function UpdateEvent() {
//     const { event_id } = useParams();
//     const navigate = useNavigate();
    
//     // Initialize formData with an object containing all form fields
//     const [formData, setFormData] = useState({
//         type: '',
//         name: '',
//         start_datetime: '',
//         end_datetime: '',
//         location: '',
//         description: '',
//         image: null
//     });

//     useEffect(() => {
//         const fetchEventDetails = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await axios.get(`http://localhost:8000/event_management/event/?id=${event_id}`, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });
//                 const eventData = response.data.data[0]; // Assuming the API response is an array and you want the first item
//                 console.log(eventData);
//                 setFormData(eventData);
//             } catch (error) {
//                 console.error('Error fetching event details:', error);
//             }
//         };

//         fetchEventDetails();
//     }, [event_id]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleFileChange = (e) => {
//         setFormData({ ...formData, image: e.target.files[0] });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Prepare form data with image
//         const formDataWithImage = new FormData();
//         formDataWithImage.append('type', formData.type);
//         formDataWithImage.append('name', formData.name);
//         formDataWithImage.append('start_datetime', formData.start_datetime);
//         formDataWithImage.append('end_datetime', formData.end_datetime);
//         formDataWithImage.append('location', formData.location);
//         formDataWithImage.append('description', formData.description);
//         formDataWithImage.append('image', formData.image);

//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.put(`http://localhost:8000/event_management/event/?id=${event_id}`, formDataWithImage, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             console.log('Event updated successfully:', response.data);
//             alert("Event updated successfully");
//             navigate(`/event/${event_id}`);
//         } catch (error) {
//             console.error('Error updating event:', error);
//             alert("Failed to update event. Please try again.");
//         }
//     };

//     return (
//         <div>
//             <h2>Update Event</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <select name="type" value={formData.type} onChange={handleChange}>
//                         <option value="">Select Type</option>
//                         <option value="Public">Public</option>
//                         <option value="Private">Private</option>
//                     </select>
//                 </div>
//                 <div>
//                     <input type="text" placeholder="Enter name" name="name" value={formData.name} onChange={handleChange} />
//                 </div>
//                 <div>
//                     <input type="datetime-local" placeholder='Start Date and Time' name="start_datetime" value={formData.start_datetime} onChange={handleChange} />
//                 </div>
//                 <div>
//                     <input type="datetime-local" placeholder='End Date and Time' name="end_datetime" value={formData.end_datetime} onChange={handleChange} />
//                 </div>
//                 <div>
//                     <input type="text" placeholder='Location' name="location" value={formData.location} onChange={handleChange} />
//                 </div>
//                 <div>
//                     <textarea name="description" placeholder='Description' value={formData.description} onChange={handleChange} />
//                 </div>
//                 <div>
//                     <input type="file" accept="image/*" onChange={handleFileChange} />
//                 </div>
//                 <button type="submit">Update Event</button>
//             </form>
//         </div>
//     );
// }

// export default UpdateEvent;





































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// function UpdateEvent() {
//     const { event_id } = useParams();
//     const navigate = useNavigate();
//     // const [formData, setFormData] = useState();
//     const [formData, setFormData] = useState({
//         type: '',
//         name: '',
//         start_datetime: '',
//         end_datetime: '',
//         location: '',
//         description: '',
//         image: null // Assuming you want to upload an image
//     });

//     useEffect(() => {
//         const fetchEventDetails = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await axios.get(`http://localhost:8000/event_management/event/?id=${event_id}`, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });
//                 const eventData = response.data;
//                 console.log(eventData);
//                 setFormData(eventData);
//             } catch (error) {
//                 console.error('Error fetching event details:', error);
//             }
//         };

//         fetchEventDetails();
//     }, [event_id]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleFileChange = (e) => {
//         setFormData({ ...formData, image: e.target.files[0] });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formDataWithImage = new FormData();
//         formDataWithImage.append('type', formData.type);
//         formDataWithImage.append('name', formData.name);
//         formDataWithImage.append('start_datetime', formData.start_datetime);
//         formDataWithImage.append('end_datetime', formData.end_datetime);
//         formDataWithImage.append('location', formData.location);
//         formDataWithImage.append('description', formData.description);
//         formDataWithImage.append('image', formData.image);

//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.put(`http://localhost:8000/event_management/event/?id=${event_id}`, formDataWithImage, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             console.log('Event updated successfully:', response.data);
//             alert("Event updated successfully");
//             navigate(`/event/${event_id}`);
//         } catch (error) {
//             console.error('Error updating event:', error);
//             alert("Failed to update event. Please try again.");
//         }
//     };

//     return (
//         <div>
//             <h2>Update Event</h2>
//             {
//               console.log("first",formData?.data[0])
//             }
//            { formData &&
              
//            <form onSubmit={handleSubmit}>
//                 <div>
//                     <select name="type" value={formData?.data[0].type} onChange={handleChange}>
//                         <option value="">Select Type</option>
//                         <option value="Public">Public</option>
//                         <option value="Private">Private</option>
//                     </select>
//                 </div>
//                 <div>
//                   {console.log(formData.name)}
//                     <input type="text" placeholder="enter name" name="name" value={formData?.data[0].name} onChange={handleChange} />
//                 </div>
//                 <div>
//                     <input type="datetime-local" placeholder='Start Date and Time' name="start_datetime" value={formData?.data[0].start_datetime} onChange={handleChange} />
//                 </div>
//                 <div>
//                     <input type="datetime-local" placeholder='End Date and Time' name="end_datetime" value={formData?.data[0].end_datetime} onChange={handleChange} />
//                 </div>
//                 <div>
//                     <input type="text" placeholder='Location' name="location" value={formData?.data[0].location} onChange={handleChange} />
//                 </div>
//                 <div>
//                     <textarea name="description" placeholder='Description' value={formData?.data[0].description} onChange={handleChange} />
//                 </div>
//                 <div>
//                     <input type="file" accept="image/*" onChange={handleFileChange} />
//                 </div>
//                 <button type="submit">Update Event</button>
//             </form>}
//         </div>
//     );
// }

// export default UpdateEvent;












































// import React, { useState, useEffect} from 'react';
// import axios from 'axios';
// import Select from 'react-select'
// import { Link, useParams, useNavigate} from 'react-router-dom';

// function UpdateEvent() {
//     const { event_id } = useParams();
//     const navigate=useNavigate();
//     const [formData, setFormData] = useState({
//         type: '',
//         // host_email:'',
//         name: '',
//         start_datetime: '',
//         end_datetime:'',
//         location: '',
//         description: '',
//         image: null, // For file uploads
//     });

//     useEffect(() => {
//         // Fetch event data based on event_id
//         const fetchEventData = async () => {
//             try {
//               const token=localStorage.getItem('token')
//                 const response = await axios.get(`http://localhost:8000/event_management/event/?id=${event_id}`,{
//                   headers: {
//                     'Content-Type': 'multipart/form-data',
//                     'Authorization':`Bearer ${token}`
//                   }
//                 });
//                 const eventData = response.data; // Assuming the response data contains the event details
//                 setFormData({
//                     type: eventData.type,
//                     // host_email: eventData.host_email,
//                     name: eventData.name,
//                     start_datetime: eventData.start_datetime,
//                     end_datetime: eventData.end_datetime,
//                     location: eventData.location,
//                     description: eventData.description,
//                     image: null, // Assuming the image data is not available in the response
//                 });
//             } catch (error) {
//                 console.error('Error fetching event data:', error);
//             }
//         };

//         fetchEventData();
//     }, [event_id]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleFileChange = (e) => {
//         setFormData({ ...formData, image: e.target.files[0] });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // Remaining code for form submission
//         const formDataWithImage = new FormData();
//         formDataWithImage.append('type', formData.type);
//         formDataWithImage.append('name', formData.name);
//         formDataWithImage.append('start_datetime', formData.start_datetime);
//         formDataWithImage.append('end_datetime', formData.end_datetime);
//         formDataWithImage.append('location', formData.location);
//         formDataWithImage.append('description', formData.description);
//         formDataWithImage.append('image', formData.image);

//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.put(`http://localhost:8000/event_management/event/?id=${event_id}`, formDataWithImage, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             console.log('Event updated successfully:', response.data);
//             alert("Event updated successfully");
//             navigate(`/event/${event_id}`);
//         } catch (error) {
//             console.error('Error updating event:', error);
//             alert("Failed to update event. Please try again.");
//         }
//     };

//     return (
//         <div>
//             <h2>Update Event</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <select name="type" value={formData.type} onChange={handleChange}>
//                         <option value="">Select Type</option>
//                         <option value="Public">Public</option>
//                         <option value="Private">Private</option>
//                     </select>
//                 </div>
//                 {/* <div>
//                     <input type="text" placeholder='host-email' name="host_email" value={formData.host_email} onChange={handleChange} />
//                 </div> */}
//                 <div>
//                     <input type="text" placeholder='event-name' name="name" value={formData.name} onChange={handleChange} />
//                 </div>
//                 <div>
//                     <input type="datetime-local" placeholder='Start-date-time' name="start_datetime" value={formData.start_datetime} onChange={handleChange} />
//                 </div>
//                 <div>
//                     <input type="datetime-local" placeholder='End-date-time' name="end_datetime" value={formData.end_datetime} onChange={handleChange} />
//                 </div>
//                 <div>
//                     <input type="text" placeholder='location' name="location" value={formData.location} onChange={handleChange} />
//                 </div>
//                 <div>
//                     <textarea name="description" placeholder='description' value={formData.description} onChange={handleChange} />
//                 </div>


//                 <div>
//                     <input type="file" accept="image/*" onChange={handleFileChange} />
//                 </div>
//                 <button type="submit">Update Event</button>
//             </form>
//         </div>
//     );
// }

// export default UpdateEvent;





































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// function UpdateEvent() {
//     const { event_id } = useParams();
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         type: '',
//         name: '',
//         start_datetime: '',
//         end_datetime: '',
//         location: '',
//         description: '',
//         image: null, // For file uploads
//     });

//     useEffect(() => {
//         const fetchEventDetails = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await axios.get(`http://localhost:8000/event_management/event/?id=${event_id}`, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });
//                 const eventData = response.data;
//                 setFormData(eventData);
//             } catch (error) {
//                 console.error('Error fetching event details:', error);
//             }
//         };

//         fetchEventDetails();
//     }, [event_id]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleFileChange = (e) => {
//         setFormData({ ...formData, image: e.target.files[0] });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formDataWithImage = new FormData();
//         formDataWithImage.append('type', formData.type);
//         formDataWithImage.append('name', formData.name);
//         formDataWithImage.append('start_datetime', formData.start_datetime);
//         formDataWithImage.append('end_datetime', formData.end_datetime);
//         formDataWithImage.append('location', formData.location);
//         formDataWithImage.append('description', formData.description);
//         formDataWithImage.append('image', formData.image);

//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.put(`http://localhost:8000/event_management/event/?id=${event_id}`, formDataWithImage, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             console.log('Event updated successfully:', response.data);
//             alert("Event updated successfully");
//             navigate(`/event/${event_id}`);
//         } catch (error) {
//             console.error('Error updating event:', error);
//             alert("Failed to update event. Please try again.");
//         }
//     };

//     return (
//         <div>
//             <h2>Update Event</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <select name="type" value={formData.type} onChange={handleChange}>
//                         <option value="">Select Type</option>
//                         <option value="Public">Public</option>
//                         <option value="Private">Private</option>
//                     </select>
//                 </div>
//                 <div>
//                     <input type="text" placeholder='Event Name' name="name" value={formData.name} onChange={handleChange} />
//                 </div>
//                 <div>
//                     <input type="datetime-local" placeholder='Start Date and Time' name="start_datetime" value={formData.start_datetime} onChange={handleChange} />
//                 </div>
//                 <div>
//                     <input type="datetime-local" placeholder='End Date and Time' name="end_datetime" value={formData.end_datetime} onChange={handleChange} />
//                 </div>
//                 <div>
//                     <input type="text" placeholder='Location' name="location" value={formData.location} onChange={handleChange} />
//                 </div>
//                 <div>
//                     <textarea name="description" placeholder='Description' value={formData.description} onChange={handleChange} />
//                 </div>
//                 <div>
//                     <input type="file" accept="image/*" onChange={handleFileChange} />
//                 </div>
//                 <button type="submit">Update Event</button>
//             </form>
//         </div>
//     );
// }

// export default UpdateEvent;






























// import React, { useState, useEffect} from 'react';
// import axios from 'axios';
// import Select from 'react-select'
// import { Link, useParams, useNavigate} from 'react-router-dom';

// function UpdateEvent() {
//     const { event_id } = useParams();
//     const navigate=useNavigate();
//     const [formData, setFormData] = useState({
//         type: '',
//         name: '',
//         start_datetime: '',
//         end_datetime:'',
//         location: '',
//         description: '',
//         image: null, // For file uploads
//     });

//     useEffect(() => {
//         const fetchEventDetails = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await axios.get(`http://localhost:8000/event_management/event/?id=${event_id}`, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });
//                 const eventData = response.data;
//                 setFormData({
//                     type: eventData.type,
//                     name: eventData.name,
//                     start_datetime: eventData.start_datetime,
//                     end_datetime: eventData.end_datetime,
//                     location: eventData.location,
//                     description: eventData.description,
//                     // image: eventData.image, // If you want to fill the image field as well
//                 });
//             } catch (error) {
//                 console.error('Error fetching event details:', error);
//             }
//         };

//         fetchEventDetails();
//     }, [event_id]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleFileChange = (e) => {
//         setFormData({ ...formData, image: e.target.files[0] });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formDataWithImage = new FormData();
//         formDataWithImage.append('type', formData.type);
//         formDataWithImage.append('name', formData.name);
//         formDataWithImage.append('start_datetime', formData.start_datetime);
//         formDataWithImage.append('end_datetime', formData.end_datetime);
//         formDataWithImage.append('location', formData.location);
//         formDataWithImage.append('description', formData.description);
//         formDataWithImage.append('image', formData.image);

//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.put(`http://localhost:8000/event_management/event/?id=${event_id}`, formDataWithImage, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             console.log('Event updated successfully:', response.data);
//             alert("Event updated successfully");
//             navigate(`/event/${event_id}`);
//         } catch (error) {
//             console.error('Error updating event:', error);
//             alert("Failed to update event. Please try again.");
//         }
//     };

//     return (
//         <div>
//             <h2>Update Event</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <select name="type" value={formData.type} onChange={handleChange}>
//                         <option value="">Select Type</option>
//                         <option value="Public">Public</option>
//                         <option value="Private">Private</option>
//                     </select>
//                 </div>
//                 <div>
//                     <input type="text" placeholder='Event Name' name="name" value={formData.name} onChange={handleChange} />
//                 </div>
//                 <div>
//                     <input type="datetime-local" placeholder='Start Date and Time' name="start_datetime" value={formData.start_datetime} onChange={handleChange} />
//                 </div>
//                 <div>
//                     <input type="datetime-local" placeholder='End Date and Time' name="end_datetime" value={formData.end_datetime} onChange={handleChange} />
//                 </div>
//                 <div>
//                     <input type="text" placeholder='Location' name="location" value={formData.location} onChange={handleChange} />
//                 </div>
//                 <div>
//                     <textarea name="description" placeholder='Description' value={formData.description} onChange={handleChange} />
//                 </div>
//                 <div>
//                     <input type="file" accept="image/*" onChange={handleFileChange} />
//                 </div>
//                 <button type="submit">Update Event</button>
//             </form>
//         </div>
//     );
// }

// export default UpdateEvent;





































// import React, { useState, useEffect} from 'react';
// import axios from 'axios';
// import Select from 'react-select'
// import { Link, useParams, useNavigate} from 'react-router-dom';

// function UpdateEvent() {
//     const { event_id } = useParams();
//     const navigate=useNavigate();
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
//       const token = localStorage.getItem('token')
//       const response = await axios.put(`http://localhost:8000/event_management/event/?id=${event_id}`, formDataWithImage, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       console.log('Event created successfully:', response.data);
//       alert("event updated successfully")
//       navigate(`/event/${event_id}`);
//       // Handle success, such as redirecting to another page or displaying a success message
//     } catch (error) {
//       console.error('Error updating event:', error);
//       alert("you are not authorize",error);
//       // Handle error, such as displaying an error message to the user
//     }
//   };
//   return (
//     <div>
//       <h2>Update Event</h2>
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
//         <button type="submit">Update Event</button>
//       </form>
//     </div>
//   );
// }

// export default UpdateEvent;