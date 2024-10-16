// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import Modal from './Modal';

const Login = () => {
    const [role, setRole] = useState('Student');
    const [userName, setuserName] = useState(''); // Added userName state
    const [password, setPassword] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const userCredentials = JSON.parse(localStorage.getItem('userCredentials')) || [];

        // Trim whitespace from user inputs
        const trimmedUserName = userName.trim();

        //Find the user by searching email, studentId in studentInfo with trimmedUserName
        const studentInfo = JSON.parse(localStorage.getItem('studentInfo')) || [];
        let student = studentInfo.find((student) => {
            return student.email === trimmedUserName || student.studentID === Number(trimmedUserName);
        });

        let user

        if (student) {
            //As student is found, use studentID to find user in userCredentials and compare password
            user = userCredentials.find((user) => {
                return user.studentId === student.studentID && user.password === password;
            });
        } else {
            //As user is not found, check username in userCredentials and compare password
            user = userCredentials.find((user) => {
                return user.username === trimmedUserName && user.password === password;
            });
        }
        if (user) {
            // Set logged in status
            localStorage.setItem('isLoggedIn', 'true');
            // Redirect to Home page after successful login
            navigate('/'); // Redirects to Home.js
        } else {
            localStorage.setItem('isLoggedIn', 'false');
            setModalMessage('Invalid credentials');
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username/Email/Student ID"
                    value={userName}
                    onChange={(e) => setuserName(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Signup</Link></p>
            {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />}
        </div>
    );
};

export default Login;
