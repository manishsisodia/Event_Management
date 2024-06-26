import React, { useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

const UploaImage = () => {
  const [photos, setPhotos] = useState([]);
  const { event_id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handlePhotoChange = (e) => {
    setPhotos(e.target.files);
    setError(''); // Reset error message when new files are selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any file is selected
    if (photos.length === 0) {
      setError('Please select at least one photo');
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < photos.length; i++) {
      formData.append('photos', photos[i]);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:8000/event_management/upload_image/?event_id=${event_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      console.log(response.data);
      alert("Uploaded successfully");
      navigate(`/event/${event_id}`);
    } catch (error) {
      console.error('Error uploading photos:', error);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="file" name="photos" multiple onChange={handlePhotoChange} />
        <button type="submit">Upload Photos</button>
      </form>
    </div>
  );
};

export default UploaImage;











































// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useParams, useNavigate } from 'react-router-dom';

// const UploaImage = () => {
//   const [photos, setPhotos] = useState([]);
//   const {event_id} = useParams();
//   const navigate=useNavigate();

//   const handlePhotoChange = (e) => {
//     setPhotos(e.target.files);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     for (let i = 0; i < photos.length; i++) {
//       formData.append('photos', photos[i]);
//     }

//     try {
//         const token=localStorage.getItem('token')
//       const response = await axios.post(`http://localhost:8000/event_management/upload_image/?event_id=${event_id}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization':`Bearer ${token}`
//         },
//       });
//       console.log(response.data);
//       alert("uploaded successful")
//       navigate(`/event/${event_id}`);
//     } catch (error) {
//       console.error('Error uploading photos:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="file" name="photos" multiple onChange={handlePhotoChange} />
//       <button type="submit">Upload Photos</button>
//     </form>
//   );
// };

// export default UploaImage;
