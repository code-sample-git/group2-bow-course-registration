import React from 'react';

const Signup = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        //check if the userCredentials array is already in session storage
        if (sessionStorage.getItem('userCredentials')) {
            //if it is, get the array and store it in the userCredentials variable
            var userCredentials = JSON.parse(sessionStorage.getItem('userCredentials'));
        } else {
            //Create array to storage user Credentials
            var userCredentials = [];
            //save the array to session storage
            sessionStorage.setItem('userCredentials', JSON.stringify(userCredentials));
        }

        const firstName = event.target[0].value;
        const lastName = event.target[1].value;
        const password = event.target[2].value;
        const status = event.target[3].value;
        userCredentials.push({ firstName, lastName, password, status });
        sessionStorage.setItem('userCredentials', JSON.stringify(userCredentials));
    };

    return (
        <div>
            <h1>Signup</h1>
            <p>Login</p>
            <form>
                <button type="submit">Login</button>
            </form>
            <p>Register</p>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="First Name" />
                <input type="text" placeholder="Last Name" />
                <input type="password" placeholder="Password" />
                <input type="text" placeholder="Status" />
                <button id="submit" type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;