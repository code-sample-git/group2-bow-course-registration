import React, { useEffect, useState } from 'react';

const CourseManagement = () => {
    const [courses, setCourses] = useState([]);
    const [courseDetails, setCourseDetails] = useState({ title: '', description: '', term: '', status: '' });
    const [isEditing, setIsEditing] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(JSON.parse(sessionStorage.getItem('loggedInUser')) || {});

    useEffect(() => {
        const savedCourses = JSON.parse(sessionStorage.getItem('courses')) || [];
        setCourses(savedCourses);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseDetails({ ...courseDetails, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const updatedCourses = [...courses];
        if (isEditing !== null) {
            updatedCourses[isEditing] = courseDetails;
        } else {
            updatedCourses.push(courseDetails);
        }
        setCourses(updatedCourses);
        sessionStorage.setItem('courses', JSON.stringify(updatedCourses));
        resetForm();
    };

    const handleEditClick = (index) => {
        setIsEditing(index);
        setCourseDetails(courses[index]);
    };

    const handleDeleteClick = (index) => {
        const updatedCourses = courses.filter((_, i) => i !== index);
        setCourses(updatedCourses);
        sessionStorage.setItem('courses', JSON.stringify(updatedCourses));
    };

    const resetForm = () => {
        setCourseDetails({ title: '', description: '', term: '', status: '' });
        setIsEditing(null);
    };

    return (
        <div>
            <h2>Course Management</h2>
            {loggedInUser.status === 'admin' && (
                <form onSubmit={handleFormSubmit}>
                    <input type="text" name="title" placeholder="Course Title" value={courseDetails.title} onChange={handleInputChange} required />
                    <input type="text" name="description" placeholder="Course Description" value={courseDetails.description} onChange={handleInputChange} required />
                    <input type="text" name="term" placeholder="Term" value={courseDetails.term} onChange={handleInputChange} required />
                    <input type="text" name="status" placeholder="Status" value={courseDetails.status} onChange={handleInputChange} required />
                    <button type="submit">{isEditing !== null ? 'Update Course' : 'Add Course'}</button>
                    {isEditing !== null && <button type="button" onClick={resetForm}>Cancel</button>}
                </form>
            )}
            <h3>Course List</h3>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Term</th>
                        <th>Status</th>
                        {loggedInUser.status === 'admin' && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course, index) => (
                        <tr key={index}>
                            <td>{course.title}</td>
                            <td>{course.description}</td>
                            <td>{course.term}</td>
                            <td>{course.status}</td>
                            {loggedInUser.status === 'admin' && (
                                <td>
                                    <button onClick={() => handleEditClick(index)}>Edit</button>
                                    <button onClick={() => handleDeleteClick(index)}>Delete</button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseManagement;