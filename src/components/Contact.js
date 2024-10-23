import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css';
import Modal from './Modal';
import { getLoggedInUser } from './functionLib'; // Import the utility function

const Contact = () => {
  const [user, setUser] = useState(getLoggedInUser); // Use the utility function
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [messageHistory, setMessageHistory] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.status !== 'login') {
      window.location.href = '/login';
    } else {
      // Fetch message history from localStorage
      const messageStorage = JSON.parse(localStorage.getItem('messageStorage')) || [];
      // Sort message history by datetime in descending order
      messageStorage.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
      //add submitBy field to messageStorage. Need to look up the user info from the local storage (studentInfo)
      const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
      messageStorage.forEach((thread) => {
        const student = studentInfo.find((student) => student.studentId === thread.from);
        if (student) {
          thread.submitBy = `${student.firstName} ${student.lastName}`;
        } else {
          thread.submitBy = 'Admin';
        }
        //do the same for replies
        if (thread.replies) {
          thread.replies.forEach((reply) => {
            const student = studentInfo.find((student) => student.studentId === reply.from);
            if (student) {
              reply.from = `${student.firstName} ${student.lastName}`;
            } else {
              reply.from = 'Admin';
            }
          });
        }
      });
      setMessageHistory(messageStorage);

    }
  }, [user]);


  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.role === 'student') {
      // Prepare the message with From and To and the message in JSON format
      const updateContent = {
        from: user.userId,
        to: 'admin',
        title: title,
        message: message,
        datetime: new Date().toUTCString(),
      };

      // Get the messageStorage from localStorage
      const messageStorage = JSON.parse(localStorage.getItem('messageStorage')) || [];

      // Add the message to the messageStorage
      messageStorage.push(updateContent);

      // Sort message history by datetime in descending order
      messageStorage.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

      // Store the messageStorage back to localStorage
      localStorage.setItem('messageStorage', JSON.stringify(messageStorage));

      setMessage('');
      setTitle('');
      setMessageHistory(messageStorage);

      setModalMessage('Form submitted successfully!');
      setIsModalOpen(true);
    } else if (user.role === 'admin') {
      // Logic for admin to view submitted forms (could be an alert or navigate to another page)
      alert(`Viewing submitted forms...`);
    }
  };

  const handleReplySubmit = (event) => {
    event.preventDefault();
    if (selectedThread) {
      const messageStorage = JSON.parse(localStorage.getItem('messageStorage')) || [];
      const updatedThreads = messageStorage.map((thread) => {
        if (thread.title === selectedThread.title) {
          return {
            ...thread,
            replies: [
              ...(thread.replies || []),
              {
                from: user.userId,
                message: replyMessage,
                datetime: new Date().toUTCString(),
              },
            ],
          };
        }
        return thread;
      });

      // Sort message history by datetime in descending order
      updatedThreads.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

      localStorage.setItem('messageStorage', JSON.stringify(updatedThreads));
      setMessageHistory(updatedThreads);
      setReplyMessage('');
      setSelectedThread(null);

      setModalMessage('Reply submitted successfully!');
      setIsModalOpen(true);
    }
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        {user.role === 'student' ? (
          <>
            <h3>Title</h3>
            <input
              type="text"
              placeholder="Enter the title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <h3>Message</h3>
            <textarea
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button type="submit">Submit</button>
          </>
        ) : (
          <p>Admin can view submitted forms here.</p>
        )}
      </form>

      <h2>Message History</h2>
      <div className="message-history">
        {messageHistory.map((thread, index) => (
          <div key={index} className="message-thread">
            <h3>{thread.title}</h3>
            <p><strong>From:</strong> {thread.submitBy}</p>
            <p><strong>Message:</strong> {thread.message}</p>
            <p><strong>Date:</strong> {thread.datetime}</p>
            {thread.replies && thread.replies.map((reply, idx) => (
              <div key={idx} className="message-reply">
                <p><strong>From:</strong> {reply.from}</p>
                <p><strong>Message:</strong> {reply.message}</p>
                <p><strong>Date:</strong> {reply.datetime}</p>
              </div>
            ))}
            <button onClick={() => setSelectedThread(thread)}>Reply</button>
          </div>
        ))}
      </div>

      {selectedThread && (
        <div className="reply-container">
          <h3>Reply to: {selectedThread.title}</h3>
          <form onSubmit={handleReplySubmit}>
            <textarea
              placeholder="Enter your reply"
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              required
            />
            <button type="submit">Submit Reply</button>
          </form>
        </div>
      )}
      {isModalOpen && (
        <Modal message={modalMessage} onClose={setIsModalOpen} redirectTo={'/contact'} />
      )}
    </div>
  );
};

export default Contact;