import React from 'react';

const Signup = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        let userCredentials = JSON.parse(localStorage.getItem('userCredentials')) || [];

        const firstName = event.target[0].value;
        const lastName = event.target[1].value;
        const password = event.target[2].value;
        const status = event.target[3].value; // 'admin' or 'student'

        // userCredentials.push({ firstName, lastName, password, status });
        // localStorage.setItem('userCredentials', JSON.stringify(userCredentials));
    };

        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupData),
            });

            const data = await response.json();

            if (response.status === 201) {
                alert('Signup successful!');
            } else {
                alert(data.message || 'Error signing up.');
            }
        } catch (error) {
            alert('Error signing up. Please try again.');
        }
    };

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="First Name" required />
                <input type="text" placeholder="Last Name" required />
                <input type="password" placeholder="Password" required />
                <input type="text" placeholder="Status (admin/student)" required />
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;