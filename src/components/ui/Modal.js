import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import '../../css/Modal.css';

export function Modal({ isOpen, onClose, title, children }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Prevent scrolling on body when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        setIsActive(true);
      }, 500);
      return () => {
        document.body.style.overflow = 'unset';
        clearTimeout(timer);
        setIsActive(false);
      };
    } else {
      document.body.style.overflow = 'unset';
      setIsActive(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className={`modal-container glass reveal-scale ${isActive ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header flex justify-between items-center">
          <h3>{title}</h3>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
