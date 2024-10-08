import React, { useEffect, useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isEditing, setIsEditing] = useState(null);
  const [editData, setEditData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    status: '',
    studentID: '',
    department: '',
    program: '',
    address: '',
    phoneNumber: '',
    personalEmail: ''
  });
  const [loginData, setLoginData] = useState({ firstName: '', password: '' });

  useEffect(() => {
    // Retrieve data from session storage
    const userCredentials = sessionStorage.getItem('userCredentials');
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (userCredentials) {
      setUserDetails(JSON.parse(userCredentials));
    }
    if (loggedInUser) {
      setLoggedInUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleEditClick = (firstName, lastName) => {
    const userIndex = userDetails.findIndex(user => user.firstName === firstName && user.lastName === lastName);
    if (userIndex !== -1) {
      setIsEditing(userIndex);
      setEditData(userDetails[userIndex]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedDetails = [...userDetails];
    updatedDetails[isEditing] = editData;
    setUserDetails(updatedDetails);
    sessionStorage.setItem('userCredentials', JSON.stringify(updatedDetails));
    if (loggedInUser.status === 'student') {
      setLoggedInUser(editData); // Update the loggedInUser state only if the logged-in user is a student
      sessionStorage.setItem('loggedInUser', JSON.stringify(editData)); // Update session storage
    }
    setIsEditing(null);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const user = userDetails.find(
      (user) => user.firstName === loginData.firstName && user.password === loginData.password
    );
    if (user) {
      sessionStorage.setItem('loggedInUser', JSON.stringify(user));
      setLoggedInUser(user);
    } else {
      alert('Invalid login credentials');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
  };

  if (!loggedInUser) {
    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleLoginSubmit}>
          <label>
            First Name:
            <input type="text" name="firstName" value={loginData.firstName} onChange={handleLoginChange} />
          </label>
          <label>
            Password:
            <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>{loggedInUser.status === 'admin' ? 'Admin Dashboard' : 'Student Dashboard'}</h1>
      <div>
        <h2>Welcome, {loggedInUser.firstName}</h2>
        <p>Status: {loggedInUser.status}</p>
        {loggedInUser.status === 'student' && (
          <>
            <p>Student ID: {loggedInUser.studentID}</p>
            <p>Department: {loggedInUser.department}</p>
            <p>Program: {loggedInUser.program}</p>
            <p>Address: {loggedInUser.address}</p>
            <p>Phone Number: {loggedInUser.phoneNumber}</p>
            <p>Personal Email: {loggedInUser.personalEmail}</p>
            <button onClick={() => handleEditClick(loggedInUser.firstName, loggedInUser.lastName)}>Edit</button>
          </>
        )}
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      {loggedInUser.status === 'admin' && (
        <div>
          <h2>All Students</h2>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Status</th>
                <th>Student ID</th>
                <th>Department</th>
                <th>Program</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Personal Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userDetails
                .filter((detail) => detail.status === 'student')
                .map((detail, index) => (
                  <tr key={index}>
                    <td>{detail.firstName}</td>
                    <td>{detail.lastName}</td>
                    <td>{detail.status}</td>
                    <td>{detail.studentID}</td>
                    <td>{detail.department}</td>
                    <td>{detail.program}</td>
                    <td>{detail.address}</td>
                    <td>{detail.phoneNumber}</td>
                    <td>{detail.personalEmail}</td>
                    <td>
                      <button onClick={() => handleEditClick(detail.firstName, detail.lastName)}>Edit</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {isEditing !== null && (
        <form onSubmit={handleFormSubmit}>
          <h2>Edit User Detail</h2>
          {loggedInUser.status === 'admin' ? (
            <>
              <label>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={editData.firstName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  value={editData.lastName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  value={editData.password}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Status:
                <input
                  type="text"
                  name="status"
                  value={editData.status}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Student ID:
                <input
                  type="text"
                  name="studentID"
                  value={editData.studentID}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Department:
                <input
                  type="text"
                  name="department"
                  value={editData.department}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Program:
                <input
                  type="text"
                  name="program"
                  value={editData.program}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Address:
                <input
                  type="text"
                  name="address"
                  value={editData.address}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Phone Number:
                <input
                  type="text"
                  name="phoneNumber"
                  value={editData.phoneNumber}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Personal Email:
                <input
                  type="email"
                  name="personalEmail"
                  value={editData.personalEmail}
                  onChange={handleInputChange}
                />
              </label>
            </>
          ) : (
            <>
              <label>
                Address:
                <input
                  type="text"
                  name="address"
                  value={editData.address}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Phone Number:
                <input
                  type="text"
                  name="phoneNumber"
                  value={editData.phoneNumber}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Personal Email:
                <input
                  type="email"
                  name="personalEmail"
                  value={editData.personalEmail}
                  onChange={handleInputChange}
                />
              </label>
            </>
          )}
          <div className="actions">
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsEditing(null)}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;