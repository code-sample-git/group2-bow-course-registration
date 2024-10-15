import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/images/bvcLogo.png'; // Import the logo image

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    alert("You've been logged out.");
  };

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <Link to="/">Bow Course Registration</Link>
        <button className="navbar-toggle" onClick={toggleMenu}>
          &#9776;
        </button>
      </div>
      <ul className={`navbar-menu ${isOpen ? 'open' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/programs">Programs</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/coursemanagement">Courses Management</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {!isLoggedIn && <li><Link to="/signup">Signup</Link></li>}
        {isLoggedIn && <li><Link to="/" onClick={handleLogout}>Logout</Link></li>}
      </ul>
    </nav>
  );
};

export default Navbar;