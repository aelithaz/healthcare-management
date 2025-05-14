import React, { useState } from 'react';
import styles from './DoctorHome.module.css';
import DoctorNavbar from './DoctorNavbar';
import DoctorAppointmentsCard from './DoctorAppointmentsCard';
import NotificationsPanel from './components/NotificationsPanel';
import Calendar from './components/Calendar';

const NotificationsModal = ({ isOpen, onClose, notifications, onDelete }: { 
  isOpen: boolean; 
  onClose: () => void; 
  notifications: { id: string; text: string }[]; 
  onDelete: (id: string) => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Notifications</h3>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
        <div className={styles.notificationList}>
          {notifications.map((notification) => (
            <div key={notification.id} className={styles.notificationItem}>
              <p>{notification.text}</p>
              <div className={styles.notificationActions}>
                <button onClick={() => onDelete(notification.id)} className={styles.deleteButton}>
                  Dismiss
                </button>
                <button className={styles.viewButton}>View</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MessageModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: 'Patient', text: 'Hi, I have a question about my medication.' },
    { sender: 'Doctor', text: 'Sure, how can I help?' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { sender: 'Doctor', text: newMessage }]);
    setNewMessage('');
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>Message Patients</h3>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
        <div className={styles.patientSelector}>
          <label htmlFor="patient">Select Patient:</label>
          <select
            id="patient"
            onChange={(e) => setSelectedPatient(e.target.value)}
            value={selectedPatient || ''}
          >
            <option value="" disabled>
              Choose a patient
            </option>
            <option value="Jane Smith">Jane Smith</option>
            <option value="Bob Johnson">Bob Johnson</option>
            <option value="Alice Brown">Alice Brown</option>
          </select>
        </div>
        {selectedPatient && (
          <div className={styles.messagingPanel}>
            <h4>Conversation with {selectedPatient}</h4>
            <div className={styles.messageList}>
              {messages.map((msg, index) => (
                <p key={index}>
                  <strong>{msg.sender}:</strong> {msg.text}
                </p>
              ))}
            </div>
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className={styles.messageInput}
            ></textarea>
            <button onClick={handleSendMessage} className={styles.sendButton}>
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const DoctorHome = () => {
  const [patients, setPatients] = useState([
    { id: '1', name: 'Jane Smith', age: 30, diagnosis: 'Hypertension', medications: [{ name: 'Medication A', refills: 2 }, { name: 'Medication B', refills: 1 }], notes: '' },
    { id: '2', name: 'Bob Johnson', age: 45, diagnosis: 'Diabetes', medications: [{ name: 'Medication C', refills: 3 }], notes: '' },
    { id: '3', name: 'Alice Brown', age: 50, diagnosis: 'Heart Disease', medications: [], notes: '' },
  ]);

  const [expandedPatientId, setExpandedPatientId] = useState<string | null>(null);
  const [editablePatient, setEditablePatient] = useState<any>(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  const handleViewDetails = (id: string) => {
    const patient = patients.find((p) => p.id === id);
    setEditablePatient({ ...patient });
    setExpandedPatientId(id);
  };

  const handleCancelEdit = () => {
    setExpandedPatientId(null);
    setEditablePatient(null);
  };

  const handleSaveChanges = () => {
    setPatients((prev) =>
      prev.map((patient) =>
        patient.id === editablePatient.id ? editablePatient : patient
      )
    );
    handleCancelEdit();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string, index?: number) => {
    if (index !== undefined) {
      const medications = [...editablePatient.medications];
      medications[index][field] = e.target.value;
      setEditablePatient({ ...editablePatient, medications });
    } else {
      setEditablePatient({ ...editablePatient, [field]: e.target.value });
    }
  };

  return (
    <div className={styles.bg}>
      <DoctorNavbar />
      <main className={styles.main}>
        <h1 className={styles.welcome}>Welcome, Dr. Smith!</h1>
        <p className={styles.subtitle}>
          Manage your patients, appointments, and notifications below.
        </p>
        <div className={styles.cardsRow}>
          <DoctorAppointmentsCard />
          <NotificationsPanel />
          <Calendar />
        </div>

        <div className={styles.actions}>
          <button
            className={styles.messagePatientsButton}
            onClick={() => setIsMessageModalOpen(true)}
          >
            Message Patients:
          </button>
        </div>

        <MessageModal
          isOpen={isMessageModalOpen}
          onClose={() => setIsMessageModalOpen(false)}
        />

        <div className={styles.patientSection}>
          <h2 className={styles.sectionTitle}>Assigned Patients</h2>
          <div className={styles.patientCardsContainer}>
            {patients.map((patient) => (
              <div key={patient.id} className={styles.patientCard}>
                <h3>{patient.name}</h3>
                <p><strong>Age:</strong> {patient.age}</p>
                <p><strong>Diagnosis:</strong> {patient.diagnosis}</p>
                <button
                  className={styles.viewDetailsButton}
                  onClick={() => handleViewDetails(patient.id)}
                >
                  {expandedPatientId === patient.id ? 'Hide Details' : 'View Details'}
                </button>
                {expandedPatientId === patient.id && editablePatient && (
                  <div className={styles.patientDetails}>
                    <div className={styles.editableFields}>
                      <label>
                        Patient Name:
                        <input
                          type="text"
                          value={editablePatient.name}
                          onChange={(e) => handleChange(e, 'name')}
                        />
                      </label>
                      <label>
                        Patient Age:
                        <input
                          type="number"
                          value={editablePatient.age}
                          onChange={(e) => handleChange(e, 'age')}
                        />
                      </label>
                      <label>
                        Diagnosis:
                        <input
                          type="text"
                          value={editablePatient.diagnosis}
                          onChange={(e) => handleChange(e, 'diagnosis')}
                        />
                      </label>
                      <label>
                        Doctor's Notes:
                        <textarea
                          value={editablePatient.notes}
                          onChange={(e) => handleChange(e, 'notes')}
                        />
                      </label>
                      <h4>Medications:</h4>
                      {editablePatient.medications.map((medication: any, index: number) => (
                        <div key={index} className={styles.medicationItem}>
                          <label>
                            Name:
                            <input
                              type="text"
                              value={medication.name}
                              onChange={(e) => handleChange(e, 'name', index)}
                            />
                          </label>
                          <label>
                            Refills:
                            <input
                              type="number"
                              value={medication.refills}
                              onChange={(e) => handleChange(e, 'refills', index)}
                            />
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className={styles.editButtons}>
                      <button
                        className={styles.saveButton}
                        onClick={handleSaveChanges}
                      >
                        Save Changes
                      </button>
                      <button
                        className={styles.cancelButton}
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorHome;