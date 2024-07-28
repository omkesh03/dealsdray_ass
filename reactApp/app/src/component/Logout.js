import React from 'react';
//import { Link } from 'react-router-dom';

function Logout() {
  const handleLogout = () => {
    // Clear credentials from localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    // Redirect to Home component
    window.location.href = '/';
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
