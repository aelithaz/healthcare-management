import React, { useState } from 'react';
import styles from './DoctorAppointmentsCard.module.css';

const appointments = [
  {
    patient: 'Jimmy Chen',
    date: 'May 10, 2025',
    time: '10:00 AM',
    reason: 'Annual Checkup',
  },
  {
    patient: 'Sarah Lee',
    date: 'May 12, 2025',
    time: '1:30 PM',
    reason: 'Follow-up',
  },
  {
    patient: 'Michael Brown',
    date: 'May 15, 2025',
    time: '9:00 AM',
    reason: 'Consultation',
  },
  {
    patient: 'Emily Davis',
    date: 'May 18, 2025',
    time: '11:00 AM',
    reason: 'Lab Results Review',
  },
];

const DoctorAppointmentsCard = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>Upcoming Appointments</h2>
      <div className={styles.cardSubtitle}>You have {appointments.length} upcoming appointments.</div>
      <ul className={styles.list}>
        {appointments.slice(0, 3).map((appt, i) => (
          <li key={i} className={styles.listItem}>
            <div>
              <strong>{appt.patient}</strong>
              <div className={styles.listDetail}>{appt.date} at {appt.time}</div>
              <div className={styles.listDetail}>{appt.reason}</div>
            </div>
          </li>
        ))}
      </ul>
      <button className={styles.actionBtn} onClick={() => setShowModal(true)}>View All Appointments</button>
      {/* Modal */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.cardTitle}>All Appointments</h2>
            <div className={styles.modalList}>
              <ul className={styles.list}>
                {appointments.map((appt, i) => (
                  <li key={i} className={styles.listItem}>
                    <div>
                      <strong>{appt.patient}</strong>
                      <div className={styles.listDetail}>{appt.date} at {appt.time}</div>
                      <div className={styles.listDetail}>{appt.reason}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <button className={styles.actionBtn} onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default DoctorAppointmentsCard; 