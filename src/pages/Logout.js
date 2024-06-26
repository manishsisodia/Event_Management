import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();
  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    
    // setIsLoggedIn(false);
    navigate("/");
    window.location.reload(); // Refresh the page after successful logout

  };

  return (
    <div>
        <p>Are You Sure ? </p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
