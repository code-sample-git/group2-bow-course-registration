import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import programData from '../data/programData'; // Import the program data
import './Signup.css'; // Import the CSS file
import { validateEmail, validatePhone, validateName, validateBirthday, validatePassword } from './validators';
import Pikaday from 'pikaday';
import 'pikaday/css/pikaday.css';
import Modal from './Modal';


const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [department, setDepartment] = useState('Software Development');
  const [program, setProgram] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const birthdayRef = useRef(null);
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [redirectTo, setRedirectTo] = useState('');

  
  useEffect(() => {
    const picker = new Pikaday({
      field: birthdayRef.current,
      format: 'YYYY-MM-DD',
      onSelect: (date) => {
        setBirthday(picker.toString('YYYY-MM-DD'));
      },
    });

    return () => picker.destroy();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setModalMessage('Invalid email format');
      setIsModalOpen(true);
      return;
    }

    if (!validatePhone(phone)) {
      setModalMessage('Invalid phone number format. It should be a 10 digit number without spaces or special characters.');
      setIsModalOpen(true);
      return;
    }

    if (!validateName(firstName) || !validateName(lastName)) {
      setModalMessage('Name cannot exceed 255 characters');
      setIsModalOpen(true);
      return;
    }

    if (!validateBirthday(birthday)) {
      setModalMessage('Invalid birthday. Birthday must be between 1900-01-01 and the current date');
      setIsModalOpen(true);
      return;
    }

    if (!validatePassword(password)) {
      setModalMessage('Password must be at least 8 characters long and contain upper and lower case letters, and a special character');
      setIsModalOpen(true);
      return;
    }

    if (password !== confirmPassword) {
      setModalMessage('Passwords do not match');
      setIsModalOpen(true);
      return;
    }

    //Check if any student already exists with the same email or username
    const studentInfo = JSON.parse(localStorage.getItem('studentInfo')) || [];
    const userCredentials = JSON.parse(localStorage.getItem('userCredentials')) || [];
    const emailExists = studentInfo.find((student) => student.email === email);
    const usernameExists = userCredentials.find((user) => user.username === username);
    if (emailExists) {
      setModalMessage('Email already exists');
      setIsModalOpen(true);
      return;
    }
    if (usernameExists) {
      setModalMessage('Username already exists');
      setIsModalOpen(true);
      return;
    }

    //All basic validation passed. Create a 6 digit unqiue Student ID. Create the studentInfo in the localstorage. And Create the userCredential in the localstorage.
    const studentId = Math.floor(100000 + Math.random() * 900000);
    const student = {
      studentId,
      firstName,
      lastName,
      email,
      phone,
      birthday,
      department,
      program,
    };
    studentInfo.push(student);
    const newUser = {
      userId: studentId,
      username,
      password,
      role: 'student',
    };
    userCredentials.push(newUser);
    localStorage.setItem('userCredentials', JSON.stringify(userCredentials));
    localStorage.setItem('studentInfo', JSON.stringify(studentInfo));

    // Add your form submission logic here
    setModalMessage('Signup successful! Your student ID is ' + studentId + '. Now you can login with your Username/Email/Student ID and password.');
    setRedirectTo('/login');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
          type="text"
          placeholder="Birthday"
          value={birthday}
          ref={birthdayRef}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
        
        <h2>Academic Information</h2>
        <select value={department} onChange={(e) => setDepartment(e.target.value)} required>
          <option value="Software Development">Software Development</option>
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
        <button id="submit" type="submit">Signup</button>
      </form>
      {isModalOpen && <Modal message={modalMessage} onClose={closeModal} redirectTo={redirectTo} />}
    </div>
  );
};

export default Signup;