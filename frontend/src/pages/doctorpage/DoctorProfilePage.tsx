import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RescheduleModal from '../../components/RescheduleModal/RescheduleModal';
import NotificationsSection from '../../components/Notifications/NotificationsSection';
import AppointmentCalendar from '../../components/Calendar/AppointmentCalendar';
import MessagingSystem from '../../components/Messaging/MessagingSystem';
import PrescriptionsManagement from '../../components/Prescriptions/PrescriptionsManagement';
import styles from './DoctorProfilePage.module.css';

const DoctorProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Dr. John Doe',
    specialization: 'Cardiology',
    email: 'johndoe@hospital.com',
    phone: '(123) 456-7890',
  });

  const [appointments, setAppointments] = useState([
    { id: '1', patientName: 'Jane Smith', date: '2025-05-15T10:00', status: 'Scheduled' },
    { id: '2', patientName: 'Bob Johnson', date: '2025-05-16T14:00', status: 'Scheduled' },
  ]);

  const [patients] = useState([
    { id: '1', name: 'Jane Smith', age: 30, diagnosis: 'Hypertension', medications: [{ name: 'Medication A', refills: 2 }, { name: 'Medication B', refills: 1 }] },
    { id: '2', name: 'Bob Johnson', age: 45, diagnosis: 'Diabetes', medications: [{ name: 'Medication C', refills: 3 }] },
    { id: '3', name: 'Alice Brown', age: 50, diagnosis: 'Heart Disease', medications: [] },
  ]);

  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleRescheduleAppointment = (id: string) => {
    setSelectedAppointment(id);
    setIsModalOpen(true);
  };

  const handleConfirmReschedule = (newDate: string) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === selectedAppointment ? { ...appointment, date: newDate } : appointment
      )
    );
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((appointment) => appointment.id !== id));
  };

  const handleViewDetails = (id: string) => {
    navigate(`/doctor/patient/${id}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus ? appointment.status === filterStatus : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {/* Doctor Profile Section */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Doctor Profile</h2>
          {isEditing ? (
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name:</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="specialization">Specialization:</label>
                <input
                  id="specialization"
                  type="text"
                  name="specialization"
                  value={profile.specialization}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone:</label>
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.buttonGroup}>
                <button
                  className={styles.saveButton}
                  onClick={() => {
                    setIsEditing(false); // Exit editing mode
                  }}
                >
                  Save
                </button>
                <button
                  className={styles.cancelButton}
                  onClick={() => {
                    setIsEditing(false); // Exit editing mode
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Specialization:</strong> {profile.specialization}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone}</p>
              <button className={styles.editButton} onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            </div>
          )}
        </div>

        {/* Notifications Section */}
        <NotificationsSection />

        {/* Assigned Patients Section */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Assigned Patients</h2>
          {patients.map((patient) => (
            <div key={patient.id} className={styles.patientCard}>
              <p><strong>Name:</strong> {patient.name}</p>
              <p><strong>Age:</strong> {patient.age}</p>
              <p><strong>Diagnosis:</strong> {patient.diagnosis}</p>
              <h4>Medications:</h4>
              <ul>
                {patient.medications.map((medication, index) => (
                  <li key={index}>
                    {medication.name} - Refills: {medication.refills}
                  </li>
                ))}
              </ul>
              <PrescriptionsManagement patientName={patient.name} />
              <button
                className={styles.detailButton}
                onClick={() => handleViewDetails(patient.id)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* Upcoming Appointments Section */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Upcoming Appointments</h2>
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="Search by patient name..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <select value={filterStatus} onChange={handleFilterChange}>
              <option value="">All Statuses</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          {filteredAppointments.map((appointment) => (
            <div key={appointment.id} className={styles.appointmentCard}>
              <p><strong>Patient:</strong> {appointment.patientName}</p>
              <p><strong>Date:</strong> {new Date(appointment.date).toLocaleString()}</p>
              <p><strong>Status:</strong> {appointment.status}</p>
              <div className={styles.buttonGroup}>
                <button
                  className={styles.cancelButton}
                  onClick={() => handleCancelAppointment(appointment.id)}
                >
                  Cancel
                </button>
                <button
                  className={styles.rescheduleButton}
                  onClick={() => handleRescheduleAppointment(appointment.id)}
                >
                  Reschedule
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Appointment Calendar */}
        <AppointmentCalendar />

        {/* Messaging System */}
        <MessagingSystem />
      </div>

      {/* Reschedule Modal */}
      <RescheduleModal
        isOpen={isModalOpen}
        onClose={handleCancelModal}
        onConfirm={handleConfirmReschedule}
        currentDate={
          selectedAppointment
            ? appointments.find((a) => a.id === selectedAppointment)?.date || ''
            : ''
        }
      />
    </div>
  );
};

export default DoctorProfilePage;