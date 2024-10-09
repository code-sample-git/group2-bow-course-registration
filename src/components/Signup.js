// src/components/Signup.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const [role, setRole] = useState('Student');

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let userCredentials = JSON.parse(sessionStorage.getItem('userCredentials')) || [];

        const firstName = event.target[0].value;
        const lastName = event.target[1].value;
        const password = event.target[2].value;

        // Generate a random 6-digit user ID
        const userID = Math.floor(100000 + Math.random() * 900000);

        // Save user data
        userCredentials.push({ firstName, lastName, password, userID, role });
        sessionStorage.setItem('userCredentials', JSON.stringify(userCredentials));

        alert(`User ${firstName} ${lastName} signed up as ${role} with ID: ${userID}`);
    };

    return (
        <div className="signup-container">
            <h1>Get Started!</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="First Name" required />
                <input type="text" placeholder="Last Name" required />
                <input type="password" placeholder="Password" required />

                <select value={role} onChange={handleRoleChange}>
                    <option value="Student">Student</option>
                    <option value="Admin">Admin</option>
                </select>

                <button id="submit" type="submit">Signup</button>
            </form>

            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
};

export default Signup;
