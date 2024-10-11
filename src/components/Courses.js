// src/components/Courses.js
import React, { useState } from 'react';
import './Courses.css';

const Courses = ({ userRole }) => {
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [term, setTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [courseList, setCourseList] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingCourse, setEditingCourse] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Function to handle course submission
  const handleSubmit = () => {
    if (!courseCode || !courseName || !term || !startDate || !endDate || !description) {
      setError('Please fill in all fields');
      setSuccess('');
      return;
    }

    const newCourse = {
      id: editingCourse ? editingCourse.id : courseList.length + 1,
      courseCode,
      courseName,
      term,
      startDate,
      endDate,
      description,
    };

    if (editingCourse) {
      setCourseList(courseList.map((course) => (course.id === editingCourse.id ? newCourse : course)));
      setSuccess('Course updated successfully!');
    } else {
      setCourseList([...courseList, newCourse]);
      setSuccess('Course added successfully!');
    }

    resetForm();
  };

  // Function to handle course editing
  const handleEditCourse = (course) => {
    setCourseCode(course.courseCode);
    setCourseName(course.courseName);
    setTerm(course.term);
    setStartDate(course.startDate);
    setEndDate(course.endDate);
    setDescription(course.description);
    setEditingCourse(course);
  };

  // Function to handle course deletion
  const handleDeleteCourse = (id) => {
    const updatedList = courseList.filter((course) => course.id !== id);
    setCourseList(updatedList);
    setSuccess('Course deleted successfully!');
  };

  // Function to reset form fields
  const resetForm = () => {
    setCourseCode('');
    setCourseName('');
    setTerm('');
    setStartDate('');
    setEndDate('');
    setDescription('');
    setEditingCourse(null);
    setError('');
    setSuccess('');
  };

  // Function to handle course selection by students
  const handleSelectCourse = (course) => {
    if (selectedCourses.includes(course.id)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== course.id));
    } else {
      if (selectedCourses.length < 5) {
        setSelectedCourses([...selectedCourses, course.id]);
      } else {
        setError('You can only register for up to 5 courses per term.');
      }
    }
  };

  // Function to handle search
  const handleSearch = () => {
    if (searchQuery) {
      return courseList.filter(
        (course) =>
          course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return courseList;
  };

  const filteredCourses = handleSearch();

  return (
    <div className="course-container">
      <h1>Course Management</h1>

      {/* Search Bar */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search courses by name or code"
      />

      {/* Course Form */}
      {userRole === 'admin' && (
        <div className="form-container">
          <div className="input-container">
            <label>Course Code:</label>
            <input type="text" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} />
          </div>
          <div className="input-container">
            <label>Course Name:</label>
            <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
          </div>
          <div className="input-container">
            <label>Term:</label>
            <input type="text" value={term} onChange={(e) => setTerm(e.target.value)} />
          </div>
          <div className="input-container">
            <label>Start Date:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className="input-container">
            <label>End Date:</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <div className="input-container">
            <label>Description:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <button onClick={handleSubmit} className="add-course-btn">
            {editingCourse ? 'Update Course' : 'Add Course'}
          </button>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </div>
      )}

      {/* Course List */}
      <div className="course-list">
        <h2>Available Courses</h2>
        {filteredCourses.length === 0 ? (
          <p>No courses available. Please add courses.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Term</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Description</th>
                {userRole === 'student' && <th>Select</th>}
                {userRole === 'admin' && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.id}>
                  <td>{course.courseCode}</td>
                  <td>{course.courseName}</td>
                  <td>{course.term}</td>
                  <td>{course.startDate}</td>
                  <td>{course.endDate}</td>
                  <td>{course.description}</td>
                  {userRole === 'student' && (
                    <td>
                      <button
                        onClick={() => handleSelectCourse(course)}
                        className={selectedCourses.includes(course.id) ? 'selected' : ''}
                      >
                        {selectedCourses.includes(course.id) ? 'Deselect' : 'Select'}
                      </button>
                    </td>
                  )}
                  {userRole === 'admin' && (
                    <td>
                      <button onClick={() => handleEditCourse(course)} className="edit-btn">Edit</button>
                      <button onClick={() => handleDeleteCourse(course.id)} className="delete-btn">Delete</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Courses;
