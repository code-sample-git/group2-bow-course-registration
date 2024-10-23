import React, { useEffect, useState } from 'react';
import './Profile.css';
import { getLoggedInUser } from './functionLib'; // Import the utility function


const Profile = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [user, setUser] = useState(getLoggedInUser); // Use the utility function
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    role: '',
    studentId: '',
    department: '',
    program: '',
    phoneNumber: '',
    personalEmail: ''
  });

  useEffect(() => {
    if (!user || user.status !== 'login') {
      window.location.href = '/login';
    } else {
      //get role from loginStatus
      const role = user.role;

      if(role === 'student'){
        //Get student data from local storage by userId
        const studentInfo = JSON.parse(localStorage.getItem('studentInfo')) || [];
        const student = studentInfo.find((student) => student.studentId === Number(user.userId));
        if (student) {
          student.role = role;
          setLoggedInUser(student);
        } else {
          window.location.href = '/login'; // Redirect to login if student data is not found
        }
      }else if(role === 'admin'){
        //Get all student data from local storage
        const studentInfo = JSON.parse(localStorage.getItem('studentInfo')) || [];
        setUserDetails(studentInfo);
      }else{
        window.location.href = '/login'; // Redirect to login if role is not found
      }
    }
  }, []);

  const handleEditClick = (user) => {

      setIsEditing(true);
      setEditData(user);
  };

  const handleInputChange = (e) => {
    console.log('e', e);
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    //Update data in local storage
    if (loggedInUser.role === 'student') {
      const studentInfo = JSON.parse(localStorage.getItem('studentInfo')) || [];
      const index = studentInfo.findIndex((student) => student.studentId === loggedInUser.studentId);
      studentInfo[index] = editData;
      localStorage.setItem('studentInfo', JSON.stringify(studentInfo));
      setLoggedInUser(editData);
    } else {
      const studentInfo = JSON.parse(localStorage.getItem('studentInfo')) || [];
      const index = studentInfo.findIndex((student) => student.studentId === editData.studentId);
      studentInfo[index] = editData;
      localStorage.setItem('studentInfo', JSON.stringify(studentInfo));
      setUserDetails(studentInfo);
    }

    setIsEditing(false);
  };

  if (!loggedInUser) {
    return null;
  }

  return (
    <div className="container">
      <h1>{loggedInUser.role === 'admin' ? 'Admin Dashboard' : 'Student Dashboard'}</h1>
      <div>
        <h2>Welcome, {loggedInUser.firstName}</h2>
        <p>Role: {loggedInUser.role}</p>
        {loggedInUser.role === 'student' && (
          <>
            <p>Student ID: {loggedInUser.studentId}</p>
            <p>Department: {loggedInUser.department}</p>
            <p>Program: {loggedInUser.program}</p>
            <p>Phone: {loggedInUser.phone}</p>
            <p>Email: {loggedInUser.email}</p>
            <button onClick={() => handleEditClick(loggedInUser)}>Edit</button>
          </>
        )}
      </div>

      {loggedInUser.role === 'admin' && (
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
                    <td>{detail.studentId}</td>
                    <td>{detail.department}</td>
                    <td>{detail.program}</td>
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

      {isEditing && (
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
                  name="studentId"
                  value={editData.studentId}
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
                  type="text"
                  name="personalEmail"
                  value={editData.personalEmail}
                  onChange={handleInputChange}
                />
              </label>
            </>
          ) : (
            <>
              <label>
                Phone:
                <input
                  type="text"
                  name="phone"
                  value={editData.phone}
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
