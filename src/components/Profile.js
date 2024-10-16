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
    role: '',
    studentID: '',
    department: '',
    program: '',
    address: '',
    phoneNumber: '',
    personalEmail: ''
  });
  const [loginData, setLoginData] = useState({ firstName: '', password: '' });

  useEffect(() => {
    // Check LoginStatus in session storage
    const loginStatus = localStorage.getItem('loginStatus');
    if (!loginStatus || JSON.parse(loginStatus).status !== 'login') {
      window.location.href = '/login';

    } else {
      const parsedLoginStatus = JSON.parse(loginStatus);
      // Retrieve user details from session storage
      const userCredentials = localStorage.getItem('userCredentials');
      if (userCredentials) {
        
        const userDetails = JSON.parse(userCredentials); 

        // Find the corresponding user details with the same userID in userCredentials and save in loggedInUser state
        const userData = userDetails.find(user => user.userID === Number(parsedLoginStatus.userID));
        console.log(userDetails
          .filter((detail) => detail.role === 'Student').map(detail =>(detail.firstName)));
        


        if (userData) {
          // Save in loggedInUser state and session storage
          localStorage.setItem('loggedInUser', JSON.stringify(userData));
          setLoggedInUser(userData);
        } else {
          window.location.href = '/login'; // Redirect to login if user data is not found

        }
        setUserDetails(userDetails);
      }
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
    localStorage.setItem('userCredentials', JSON.stringify(updatedDetails));
    if (loggedInUser.role === 'Student') {
      setLoggedInUser(editData); // Update the loggedInUser state only if the logged-in user is a student
      localStorage.setItem('loggedInUser', JSON.stringify(editData)); // Update session storage
    }
    setIsEditing(null);
  };


  const handleLogout = () => {
    localStorage.setItem('loginStatus', JSON.stringify({ userID: loggedInUser.userID, status: 'logout' }));
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
    window.location.href = '/login';
  };

  if (!loggedInUser) {
    return null;
  }



  return (
    <div className="container">
      <h1>{loggedInUser.role === 'Admin' ? 'Admin Dashboard' : 'Student Dashboard'}</h1>
      <div>
        <h2>Welcome, {loggedInUser.firstName}</h2>
        <p>Role: {loggedInUser.role}</p>
        {loggedInUser.role === 'Student' && (
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

      {loggedInUser.role === 'Admin' && (
        <div>
          <h2>All Students</h2>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Role</th>
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
                .filter((detail) => detail.role === 'Student')
                .map((detail) => (
                  <tr key={detail.index}>
                    <td>{detail.firstName}</td>
                    <td>{detail.lastName}</td>
                    <td>{detail.role}</td>
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
          {loggedInUser.role === 'Admin' ? (
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
                Role:
                <input
                  type="text"
                  name="role"
                  value={editData.role}
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
