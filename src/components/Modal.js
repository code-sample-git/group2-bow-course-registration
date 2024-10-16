import React from 'react';
import './Modal.css'; // Import CSS for styling

const Modal = ({ isOpen, message, onClose, children }) => {

  if (!isOpen && isOpen !== undefined) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div dangerouslySetInnerHTML={{ __html: message }} />
        {children}
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default Modal;