// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import Modal from './Modal';

const Login = () => {
    // const [role, setRole] = useState('Student');
    const [userName, setuserName] = useState(''); // Added userName state
    const [password, setPassword] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const loginData = {
            username: userName.trim(),
            password: password
        };

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            

            let user = data;
            console.log(user);

            if (response.status === 200) {
                // Store the JWT token in localStorage or sessionStorage
                localStorage.setItem('token', data.token);
                alert('Login successful!');
                localStorage.setItem('isLoggedIn', 'true');
                //set loginStatus
                localStorage.setItem('loginStatus', JSON.stringify({ status: 'login', userId: user.id, role: user.role }));
                localStorage.setItem('studentInfo', JSON.stringify({studentId: user.id, firstName: user.first_name, lastName: user.last_name, email: user.email, phone: user.phone, birthday: user.birthday, department: user.department, program: user.program}));

                navigate('/');
            } else {
                localStorage.setItem('isLoggedIn', 'false');
                setModalMessage(data.message || 'Invalid credentials');
                setIsModalOpen(true);
            }
        } catch (error) {
            // how to display error message if an error occurs
            setModalMessage(error.message);


            // setModalMessage('Error logging in. Please try again.');
            localStorage.setItem('isLoggedIn', 'false');
            setIsModalOpen(true);
        }

        // const userCredentials = JSON.parse(localStorage.getItem('userCredentials')) || [];

        // // Trim whitespace from user inputs
        // const trimmedUserName = userName.trim();

        // //Find the user by searching email, studentId in studentInfo with trimmedUserName
        // const studentInfo = JSON.parse(localStorage.getItem('studentInfo')) || [];
        // let student = studentInfo.find((student) => {
        //     return student.email === trimmedUserName || student.studentId === Number(trimmedUserName);
        // });

        // let user

        // if (student) {
        //     //As student is found, use studentId to find user in userCredentials and compare password
        //     user = userCredentials.find((user) => {
        //         return user.userId === student.studentId && user.password === password;
        //     });
        // } else {
        //     //As user is not found, check username in userCredentials and compare password
        //     user = userCredentials.find((user) => {
        //         return (user.username === trimmedUserName || user.userId === trimmedUserName)&& user.password === password;
        //     });
        // }
        // if (user) {
        //     // Set logged in status
        //     localStorage.setItem('isLoggedIn', 'true');

        //     //set loginStatus
        //     localStorage.setItem('loginStatus', JSON.stringify({ status: 'login', userId: user.userId, role: user.role }));
        //     // Redirect to Home page after successful login and refresh the navbar
        //     window.location.href = '/';
        // } else {
        //     localStorage.setItem('isLoggedIn', 'false');
        //     setModalMessage('Invalid credentials');
        //     setIsModalOpen(true);
        // }


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
