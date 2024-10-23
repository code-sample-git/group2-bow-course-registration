// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLoggedInUser } from './functionLib'; // Import the utility function
import Profile from './Profile';
import './Home.css';

const Home = () => {
  const [user, setUser] = useState(getLoggedInUser); // Use the utility function


  return (
    <div>
      {(user.role === 'student' || user.role === 'admin') && (
        <div>
          <Profile user={user} />
        </div>
      )}
      {!user?.role && (
        <div className="guest-container">
          <h1>Welcome to Bow Course Registration</h1>
          <p>
            Bow Course Registration is your one-stop platform for managing your course enrollments and academic profile. Whether you are a student looking to register for courses or an admin managing the course catalog, we have got you covered.
          </p>
          <p>
            Please <Link to="/login">log in</Link> to access your profile and manage your courses. If you don't have an account, you can <Link to="/signup">sign up</Link> to get started.
          </p>
          <h2>Features:</h2>
          <ul>
            <li>Browse and register for courses</li>
            <li>Manage your academic profile</li>
            <li>Contact support for any assistance</li>
          </ul>
          <h2>Why Choose Us?</h2>
          <p>
            We provide a seamless and user-friendly experience for managing your academic journey. Our platform is designed to help you stay organized and focused on your studies.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
//testing
 