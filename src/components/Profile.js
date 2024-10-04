import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [studentLoginDetails, setStudentLoginDetails] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editData, setEditData] = useState({ firstName: '', lastName: '', password: '' });

  useEffect(() => {
    // Retrieve data from session storage
    const userCredentials = sessionStorage.getItem('userCredentials');
    if (userCredentials) {
      // Parse the JSON string to an array
      setStudentLoginDetails(JSON.parse(userCredentials));
    }
  }, []);

  const handleEditClick = (index) => {
    setIsEditing(index);
    setEditData(studentLoginDetails[index]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedDetails = [...studentLoginDetails];
    updatedDetails[isEditing] = editData;
    setStudentLoginDetails(updatedDetails);
    sessionStorage.setItem('userCredentials', JSON.stringify(updatedDetails));
    setIsEditing(null);
  };

  return (
    <div>
      <h1>Student Login Details</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {studentLoginDetails.map((detail, index) => (
            <tr key={index}>
              <td>{detail.firstName}</td>
              <td>{detail.lastName}</td>
              <td>{detail.password}</td>
              <td>
                <button onClick={() => handleEditClick(index)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing !== null && (
        <form onSubmit={handleFormSubmit}>
          <h2>Edit Student Login Detail</h2>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={editData.firstName}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={editData.lastName}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={editData.password}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default Profile;