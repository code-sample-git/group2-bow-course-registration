// src/components/Program.js
import React, { useState, useEffect } from 'react';
import './Program.css';
import Modal from './Modal';
import programData from '../data/programData'; // Import the program data


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
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProgram(null);
  };

  useEffect(() => {
    setPrograms(programData); // Set the program data
  }, []);
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

  const handleProgramSelection = (program) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
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
      <Modal isOpen={isModalOpen} onClose={closeModal}>
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
      </Modal>

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
    </div>
  );
};

export default Program;
