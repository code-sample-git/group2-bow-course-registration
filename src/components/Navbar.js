// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    alert("You've been logged out.");
  };

  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/programs">Programs</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        {!isLoggedIn && <li><Link to="/signup">Signup</Link></li>}
        <li><Link to="/coursemanagement">Courses Management</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {isLoggedIn && <li><Link to="/" onClick={handleLogout}>Logout</Link></li>}
      </ul>
    </nav>
  );
};

export default Navbar;
