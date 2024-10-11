// src/components/Course.js
import React, { useState, useEffect } from 'react';
import './Courses.css';

const Course = () => {
  const [courseName, setCourseName] = useState('');
  const [instructor, setInstructor] = useState('');
  const [duration, setDuration] = useState('');
  const [courseList, setCourseList] = useState([]);
  const [error, setError] = useState('');

  // Function to handle course addition
  const handleAddCourse = () => {
    if (!courseName || !instructor || !duration) {
      setError('Please fill in all fields');
      return;
    }

    const newCourse = {
      id: courseList.length + 1, // Auto increment ID
      courseName,
      instructor,
      duration,
    };

    // Add new course to the list
    setCourseList([...courseList, newCourse]);

    // Reset form fields
    setCourseName('');
    setInstructor('');
    setDuration('');
    setError('');
  };

  // Function to handle course deletion
  const handleDeleteCourse = (id) => {
    const updatedList = courseList.filter((course) => course.id !== id);
    setCourseList(updatedList);
  };

  return (
    <div className="course-container">
      <h1>Course Management</h1>
      <div className="form-container">
        <div className="input-container">
          <label>Course Name:</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Enter Course Name"
          />
        </div>
        <div className="input-container">
          <label>Instructor:</label>
          <input
            type="text"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            placeholder="Enter Instructor Name"
          />
        </div>
        <div className="input-container">
          <label>Duration (hours):</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Enter Duration"
          />
        </div>
        <button onClick={handleAddCourse} className="add-course-btn">
          Add Course
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="course-list">
        <h2>Available Courses</h2>
        {courseList.length === 0 ? (
          <p>No courses available. Add some courses.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Course Name</th>
                <th>Instructor</th>
                <th>Duration (hours)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courseList.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.courseName}</td>
                  <td>{course.instructor}</td>
                  <td>{course.duration}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Course;
