import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrescriptionsManagement from '../../components/Prescriptions/PrescriptionsManagement';
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
  const [notes, setNotes] = useState('');
  const [medications, setMedications] = useState([
    { name: 'Medication A', refills: 2 },
    { name: 'Medication B', refills: 1 },
  ]);

  const navigate = useNavigate();

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

  const handleAddMedication = () => {
    setMedications([...medications, { name: '', refills: 0 }]);
  };

  const handleMedicationChange = (index: number, field: string, value: string | number) => {
    const updatedMedications = [...medications];
    updatedMedications[index] = { ...updatedMedications[index], [field]: value };
    setMedications(updatedMedications);
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Back
      </button>
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
            <button onClick={handleSave} className={styles.saveButton}>
              Save
            </button>
            <button onClick={handleCancel} className={styles.cancelButton}>
              Cancel
            </button>
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
          <h3>Notes</h3>
          <textarea
            className={styles.notesField}
            placeholder="Enter notes here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <h3>Medications and Refills</h3>
          <ul>
            {medications.map((medication, index) => (
              <li key={index}>
                <input
                  type="text"
                  placeholder="Medication Name"
                  value={medication.name}
                  onChange={(e) =>
                    handleMedicationChange(index, 'name', e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Refills"
                  value={medication.refills}
                  onChange={(e) =>
                    handleMedicationChange(index, 'refills', Number(e.target.value))
                  }
                />
              </li>
            ))}
          </ul>
          <button onClick={handleAddMedication} className={styles.addMedicationButton}>
            Add Medication
          </button>
          <button onClick={() => setIsEditing(true)} className={styles.editButton}>
            Edit Patient
          </button>
        </div>
      )}

      {/* Prescriptions Management */}
      <div className={styles.prescriptions}>
        <h3>Prescriptions</h3>
        <PrescriptionsManagement patientName={patient.name} />
      </div>
    </div>
  );
};

export default PatientDetailsPage;