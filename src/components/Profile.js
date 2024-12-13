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

      if (role === 'student') {
        //Get student data from api
        fetch('http://localhost:5000/api/students/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        })
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              //update the first_name and last_name to firstName and lastName
              data.firstName = data.first_name;
              data.lastName = data.last_name;
              data.role = role;
              setLoggedInUser(data);
            } else {
              window.location.href = '/login'; // Redirect to login if student data is not found
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            window.location.href = '/login'; // Redirect to login if student data is not found
          });


      } else if (role === 'admin') {
        //fetch the api to get all student data with the auth token in header
        fetch('http://localhost:5000/api/students/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        })
          .then((response) => response.json())
          .then((data) => {
            //update the first_name and last_name to firstName and lastName
            data.forEach((student) => {
              student.firstName = student.first_name;
              student.lastName = student.last_name;
            });

            //verify ifthe data is complete. if not complete filterthem out
            data = data.filter((student) => student.firstName && student.lastName && student.studentId && student.department && student.program && student.phone && student.email);

            setUserDetails(data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });



        //setUserDetails(studentInfo);
        setLoggedInUser(user);
      } else {
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

      //create object to update student data
      const studentData = {
        first_name: editData.firstName,
        last_name: editData.lastName,
        password: editData.password,
        studentId: editData.studentId,
        department: editData.department,
        program: editData.program,
        phone: editData.phone,
        email: editData.email
      };

      //fetch api to update student data
      fetch('http://localhost:5000/api/students/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(studentData)
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      setLoggedInUser(editData);
    } else {
      //create object to update student data
      const studentInfo = {
        first_name: editData.firstName,
        last_name: editData.lastName,
        password: editData.password,
        studentId: editData.studentId,
        department: editData.department,
        program: editData.program,
        phone: editData.phone,
        email: editData.email
      };
      
      //fetch api to update student data
      fetch('http://localhost:5000/api/students/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(studentInfo)
      })

        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      setUserDetails(userDetails.map((detail) => (detail.index === editData.index ? editData : detail)));
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
        <h2>Welcome, {loggedInUser.firstName || 'Admin'}</h2>
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
                .map((detail) => (
                  <tr key={detail.index}>
                    <td>{detail.firstName}</td>
                    <td>{detail.lastName}</td>
                    <td>{detail.studentId}</td>
                    <td>{detail.department}</td>
                    <td>{detail.program}</td>
                    <td>{detail.phone}</td>
                    <td>{detail.email}</td>
                    <td>
                      <button onClick={() => handleEditClick(detail)}>Edit</button>
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
          {loggedInUser.role === 'admin' ? (
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
                  value={editData.phone}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Personal Email:
                <input
                  type="text"
                  name="personalEmail"
                  value={editData.email}
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
