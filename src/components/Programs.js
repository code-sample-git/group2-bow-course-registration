// src/components/Program.js
import React, { useState, useEffect } from 'react';
import './Program.css';

const Program = () => {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthday: '',
    department: 'Software Development', // Only SD department available
    program: '',
    username: '',
    password: '',
    status: '', // 'student' or 'admin'
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editProgram, setEditProgram] = useState({
    id: '',
    name: '',
    term: '',
    startDate: '',
    endDate: '',
    fees: '',
    description: '',
  });

  // Check for logged-in user credentials and status
  useEffect(() => {
    const userCredentials = JSON.parse(localStorage.getItem('userCredentials')) || [];
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
      const user = userCredentials.find((u) => u.username === loggedInUser.username);
      if (user) {
        setIsAdmin(user.status === 'admin');
      }
    }
  }, []);

  useEffect(() => {
    // Sample program data
    const programData = [
      {
        id: 1,
        code: 'SD-DIPLOMA',
        name: 'Software Development - Diploma',
        term: 'Winter',
        startDate: 'September 5, 2024',
        endDate: 'June 15, 2026',
        fees: 'Domestic: $9,254 / International: $27,735',
        description: 'A comprehensive two-year software development diploma program...',
      },
      {
        id: 2,
        code: 'SD-POST-DIPLOMA',
        name: 'Software Development - Post-Diploma',
        term: 'Winter',
        startDate: 'September 5, 2024',
        endDate: 'June 15, 2025',
        fees: 'Domestic: $7,895 / International: $23,675',
        description: 'Jumpstart your tech career with our one-year post-diploma program...',
      },
      {
        id: 3,
        code: 'SD-CERTIFICATE',
        name: 'Software Development - Certificate',
        term: 'Fall',
        startDate: 'September 1, 2024',
        endDate: 'February 28, 2025',
        fees: 'Domestic: $5,000 / International: $15,000',
        description: 'A short-term program to develop foundational skills in software...',
      },
    ];
    setPrograms(programData);
  }, []);

  const handleProgramSelection = (program) => {
    setSelectedProgram(program);
  };

  const handleSignupInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (signupData.firstName && signupData.email && signupData.username && signupData.password) {
      // Generate a student ID
      const studentId = Math.floor(1000 + Math.random() * 9000);
      setIsRegistered(true);

      // Save student data to localStorage (or use API in real use cases)
      let userCredentials = JSON.parse(localStorage.getItem('userCredentials')) || [];
      userCredentials.push({ ...signupData, studentId });
      localStorage.setItem('userCredentials', JSON.stringify(userCredentials));

      // Set logged-in user and redirect to login or welcome page
      localStorage.setItem('loggedInUser', JSON.stringify({ username: signupData.username }));
      window.location.href = '/login'; // Redirect to login or welcome page
    } else {
      alert('Please fill out all required fields.');
    }
  };

  const handleAdminCourseActions = (action, programId) => {
    if (isAdmin) {
      switch (action) {
        case 'edit':
          const programToEdit = programs.find((program) => program.id === programId);
          setEditProgram(programToEdit);
          setIsEditing(true);
          break;
        case 'delete':
          setPrograms(programs.filter((program) => program.id !== programId));
          break;
        default:
          break;
      }
    } else {
      alert('You do not have permission to perform this action.');
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditProgram((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setPrograms((prevPrograms) =>
      prevPrograms.map((program) =>
        program.id === editProgram.id ? { ...program, ...editProgram } : program
      )
    );
    setIsEditing(false);
    setEditProgram({
      id: '',
      name: '',
      term: '',
      startDate: '',
      endDate: '',
      fees: '',
      description: '',
    });
  };

  return (
    <div className="program-container">
      <h1>Software Development Programs</h1>
      <p>Explore our programs and courses below. Non-users can sign up to become students and register for courses.</p>

      {/* Display Program List */}
      <div className="program-list">
        {programs.map((program) => (
          <div className="program-item" key={program.id}>
            <h3>{program.name}</h3>
            <p>Term: {program.term}</p>
            <p>Start Date: {program.startDate}</p>
            <p>End Date: {program.endDate}</p>
            <p>Fees: {program.fees}</p>
            <p>Description: {program.description}</p>
            <button onClick={() => handleProgramSelection(program)}>View Details</button>

            {/* Admin-only actions: Edit/Delete */}
            {isAdmin && (
              <div className="admin-actions">
                <button onClick={() => handleAdminCourseActions('edit', program.id)}>Edit</button>
                <button onClick={() => handleAdminCourseActions('delete', program.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Program Details */}
      {selectedProgram && (
        <div className="program-details">
          <h2>{selectedProgram.name} - Details</h2>
          <p><strong>Program Code:</strong> {selectedProgram.code}</p>
          <p><strong>Term:</strong> {selectedProgram.term}</p>
          <p><strong>Start Date:</strong> {selectedProgram.startDate}</p>
          <p><strong>End Date:</strong> {selectedProgram.endDate}</p>
          <p><strong>Fees:</strong> {selectedProgram.fees}</p>
          <p><strong>Description:</strong> {selectedProgram.description}</p>
        </div>
      )}

      {/* Edit Program Form */}
      {isEditing && (
        <div className="edit-program-container">
          <h2>Edit Program</h2>
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Program Name"
              value={editProgram.name}
              onChange={handleEditInputChange}
              required
            />
            <input
              type="text"
              name="term"
              placeholder="Term"
              value={editProgram.term}
              onChange={handleEditInputChange}
              required
            />
            <input
              type="date"
              name="startDate"
              value={editProgram.startDate}
              onChange={handleEditInputChange}
              required
            />
            <input
              type="date"
              name="endDate"
              value={editProgram.endDate}
              onChange={handleEditInputChange}
              required
            />
            <input
              type="text"
              name="fees"
              placeholder="Fees"
              value={editProgram.fees}
              onChange={handleEditInputChange}
              required
            />
            <textarea
              name="description"
              placeholder="Program Description"
              value={editProgram.description}
              onChange={handleEditInputChange}
              required
            />
            <button type="submit">Save Changes</button>
          </form>
        </div>
      )}

      {/* Signup Form */}
      {!isRegistered && (
        <div className="signup-container">
          <h2>Sign Up for the System</h2>
          <form onSubmit={handleSignupSubmit}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={signupData.firstName}
              onChange={handleSignupInputChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={signupData.lastName}
              onChange={handleSignupInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signupData.email}
              onChange={handleSignupInputChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={signupData.phone}
              onChange={handleSignupInputChange}
              required
            />
            <input
              type="date"
              name="birthday"
              value={signupData.birthday}
              onChange={handleSignupInputChange}
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={signupData.username}
              onChange={handleSignupInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signupData.password}
              onChange={handleSignupInputChange}
              required
            />
            <select
              name="status"
              value={signupData.status}
              onChange={handleSignupInputChange}
              required
            >
              <option value="">Select Status</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      )}

      {isRegistered && <p>Welcome to the system! You are now registered.</p>}
    </div>
  );
};

export default Program;
