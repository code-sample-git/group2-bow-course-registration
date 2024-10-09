// src/components/Contact.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
    const [message, setMessage] = useState('');
    const [userRole, setUserRole] = useState(() => {
        // Get the role from session storage
        const userCredentials = JSON.parse(sessionStorage.getItem('userCredentials')) || [];
        // Check if there are any logged-in users
        return userCredentials.length > 0 ? userCredentials[0].role : null;
    });

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (userRole === 'Student') {
            // Logic for students submitting feedback
            alert(`Feedback submitted: ${message}`);
            setMessage('');
        } else if (userRole === 'Admin') {
            // Logic for admin to view submitted forms (could be an alert or navigate to another page)
            alert(`Viewing submitted forms...`);
        }
    };

    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit}>
                {userRole === 'Student' ? (
                    <>
                        <textarea
                            placeholder="Enter your message here"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                        <button type="submit">Submit Feedback</button>
                    </>
                ) : userRole === 'Admin' ? (
                    <div>
                        <p>Admin view: Here you can see all submitted forms.</p>
                        <button onClick={() => navigate('/admin-forms')}>View Forms</button>
                    </div>
                ) : (
                    <p>Please log in to see the contact options.</p>
                )}
            </form>
        </div>
    );
};

export default Contact;
