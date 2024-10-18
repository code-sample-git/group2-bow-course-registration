import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faGraduationCap, faUser, faBook, faCog, faEnvelope, faSignOutAlt, faSignInAlt, faUserGraduate, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import logo from '../assets/images/bvcLogo.png'; // Import the logo image
import './Navbar.css'; // Import your CSS file

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginStatus');
    setModalMessage('Logged out successfully');
    setIsModalOpen(true);
    window.location.href = '/';
  };

  const loginStatus = JSON.parse(localStorage.getItem('loginStatus'));
  const isLoggedIn = loginStatus?.status === 'login' ? true : false;
  if (isLoggedIn) {
    if (loginStatus.role === 'student') {
      const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
      const student = studentInfo.find((student) => student.studentId === loginStatus.userId);
      var firstName = student.firstName;
      var lastName = student.lastName;
    }
  }


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} /> Home
          </Link>
        </li>
        <li>
          <Link to="/programs">
            <FontAwesomeIcon icon={faGraduationCap} /> Programs
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} /> Profile
          </Link>
        </li>
        <li>
          <Link to="/courses">
            <FontAwesomeIcon icon={faBook} /> Courses
          </Link>
        </li>
        <li>
          <Link to="/coursemanagement">
            <FontAwesomeIcon icon={faCog} /> Courses Management
          </Link>
        </li>
        <li>
          <Link to="/contact">
            <FontAwesomeIcon icon={faEnvelope} /> Contact
          </Link>
        </li>
        {!isLoggedIn && (
          <li>
            <Link to="/login">
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </Link>
          </li>
        )}
        {!isLoggedIn && (
          <li>
            <Link to="/signup">
              <FontAwesomeIcon icon={faUserPlus} /> Signup
            </Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Link to="/" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Link to="/profile">
              <FontAwesomeIcon icon={faUserGraduate} />
              {firstName} {lastName}
            </Link>
          </li>
        )}
      </ul>
      {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />}
    </nav>
  );
};

export default Navbar;