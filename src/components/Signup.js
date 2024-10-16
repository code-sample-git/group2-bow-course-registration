import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import programData from '../data/programData'; // Import the program data
import './Signup.css'; // Import the CSS file
import { validateEmail, validatePhone, validateName, validateBirthday, validatePassword } from './validators';


const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setbirthday] = useState('');
  const [department, setDepartment] = useState('SD');
  const [program, setProgram] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Student');

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      alert('Invalid email format');
      return;
    }

    if (!validatePhone(phone)) {
      alert('Invalid phone number format. It should be a 10 digit number without spaces or special characters.');
      return;
    }

    if (!validateName(firstName) || !validateName(lastName)) {
      alert('Name cannot exceed 255 characters');
      return;
    }

    if (!validateBirthday(birthday)) {
      alert('Invalid birthday. Birthday must be between 1900-01-01 and the current date');
      return;
    }

    if (!validatePassword(password)) {
      alert('Password must be at least 8 characters long and contain upper and lower case letters, and a special character');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Add your form submission logic here
    console.log('Form submitted');
  };

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      <p>Already have an account? <Link to="/login">Login</Link></p>
      <form onSubmit={handleSubmit}>
        <h2>Personal Information</h2>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="birthday"
          value={birthday}
          onChange={(e) => setbirthday(e.target.value)}
          required
        />
        
        <h2>Academic Information</h2>
        <select value={department} onChange={(e) => setDepartment(e.target.value)} required>
          <option value="SD">Software Development</option>
        </select>
        <select value={program} onChange={(e) => setProgram(e.target.value)} required>
          <option value="">Select Program</option>
          {programData.map((program) => (
            <option key={program.id} value={program.name}>
              {program.name}
            </option>
          ))}
        </select>
        
        <h2>Account Information</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <select value={role} onChange={handleRoleChange}>
          <option value="Student">Student</option>
          <option value="Admin">Admin</option>
        </select>
        <button id="submit" type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;