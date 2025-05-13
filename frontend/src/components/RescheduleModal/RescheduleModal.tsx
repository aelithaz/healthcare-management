import React, { useState } from 'react';
import styles from './RescheduleModal.module.css';

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newDate: string) => void;
  currentDate: string;
}

const RescheduleModal: React.FC<RescheduleModalProps> = ({ isOpen, onClose, onConfirm, currentDate }) => {
  const [newDate, setNewDate] = useState(currentDate);

  const handleConfirm = () => {
    onConfirm(newDate);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Reschedule Appointment</h2>
        <label>
          New Date and Time:
          <input
            type="datetime-local"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
        </label>
        <div className={styles.buttonGroup}>
          <button onClick={handleConfirm} className={styles.confirmButton}>
            Confirm
          </button>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RescheduleModal;