// src/components/Signup.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const [role, setRole] = useState('Student');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let userCredentials = JSON.parse(localStorage.getItem('userCredentials')) || [];

        const firstName = event.target[0].value;
        const lastName = event.target[1].value;

        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Generate a random 6-digit user ID
        const userID = Math.floor(100000 + Math.random() * 900000);

        // Save user data
        userCredentials.push({ firstName, lastName, password, userID, role, birthdate });
        localStorage.setItem('userCredentials', JSON.stringify(userCredentials));

        // Set logged in status
        localStorage.setItem('isLoggedIn', 'true');

        alert(`User ${firstName} ${lastName} signed up as ${role} with ID: ${userID}`);
    };

    return (
        <div className="signup-container">
            <h1>Get Started!</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="First Name" required />
                <input type="text" placeholder="Last Name" required />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <input
                    type="date"
                    placeholder="Birthdate"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    required
                />
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