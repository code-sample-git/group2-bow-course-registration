// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [role, setRole] = useState('Student');
    const [userID, setUserID] = useState(''); // Added userID state
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const userCredentials = JSON.parse(localStorage.getItem('userCredentials')) || [];
        
        // Trim whitespace from user inputs
        const trimmedUserID = userID.trim();
        const trimmedPassword = password.trim();

        // Find the user based on userID, password, and role
        const user = userCredentials.find(
            user => user.userID.toString() === trimmedUserID && 
                    user.password === trimmedPassword && 
                    user.role === role
        );

        if (user) {
            // Set logged in status
            localStorage.setItem('isLoggedIn', 'true');
            alert(`Login successful as ${role}`);
            // Redirect to Home page after successful login
            navigate('/'); // Redirects to Home.js
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="User ID" 
                    value={userID}
                    onChange={(e) => setUserID(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="Student">Student</option>
                    <option value="Admin">Admin</option>
                </select>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Signup</Link></p>
        </div>
    );
};

export default Login;
