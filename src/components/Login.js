// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState(''); 
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const userCredentials = JSON.parse(sessionStorage.getItem('userCredentials')) || [];

        // Check if user credentials are available
        if (userCredentials.length === 0) {
            alert('No user credentials found. Please sign up first.');
            return;
        }

        // Find the user based on userID and password
        const user = userCredentials.find(
            user => user.userID && user.userID.toString() === userID && 
                    user.password === password
        );

        if (user) {
            alert(`Login successful as ${user.firstName}`);
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

                <button type="submit">Login</button>
            </form>

            <p>Don't have an account? <Link to="/signup">Signup</Link></p>
        </div>
    );
};

export default Login;
