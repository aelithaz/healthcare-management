import React, { useState } from 'react';
import styles from './PatientDetailsPage.module.css';

interface Patient {
  id: string;
  name: string;
  age: number;
  diagnosis: string;
  medicalHistory: string[];
  uploadedReports: string[];
}

const PatientDetailsPage: React.FC<{ patient: Patient }> = ({ patient }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState(patient);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Patient data saved:", editedPatient);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedPatient(patient);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>Patient Details</h2>
      {isEditing ? (
        <div className={styles.form}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={editedPatient.name}
            onChange={handleInputChange}
          />
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={editedPatient.age}
            onChange={handleInputChange}
          />
          <label>Diagnosis:</label>
          <textarea
            name="diagnosis"
            value={editedPatient.diagnosis}
            onChange={handleInputChange}
          ></textarea>
          <div className={styles.buttonGroup}>
            <button onClick={handleSave} className={styles.saveButton}>Save</button>
            <button onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className={styles.details}>
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Diagnosis:</strong> {patient.diagnosis}</p>
          <h3>Medical History</h3>
          <ul>
            {patient.medicalHistory.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
          <h3>Uploaded Reports</h3>
          <ul>
            {patient.uploadedReports.map((report, index) => (
              <li key={index}>{report}</li>
            ))}
          </ul>
          <button onClick={() => setIsEditing(true)} className={styles.editButton}>Edit Patient</button>
        </div>
      )}
    </div>
  );
};

export default PatientDetailsPage;