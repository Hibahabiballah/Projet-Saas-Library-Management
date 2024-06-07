import React from 'react';
import { useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const location = useLocation();
  

  // Check if the current path is "/login"
  if (location.pathname === '/') {
    return null; // Do not render the NavBar if the path is "/login"
  }

  const handleLogout = () => {
    // Perform logout logic if needed
    // For example, clearing local storage, redirecting to login page, etc.
    // navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/images/menu-2.png" alt="Menu" className="navbar-icon" />
      </div>
      <div className="navbar-middle">
        <img src="/images/logo2.png" alt="Logo" className="navbar-logo" />
      </div>
      <div className="navbar-right">
        <button className="logout-button" onClick={handleLogout}>
          <img src="/images/turn-off.png" alt="Logout" className="logout-icon" />
          <span className="logout-label">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
