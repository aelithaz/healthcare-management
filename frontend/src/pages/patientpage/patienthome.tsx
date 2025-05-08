import React, { useState, useEffect } from 'react';
import styles from './PatientHome.module.css';
import PatientNavbar from './PatientNavbar';
import axios from 'axios';

type Medication = {
  PID: string;
  DID: string;
  medication: string;
  dosage: string;
  frequency: string;
  refillDate: string;
  status: string;
};

const PID = "patJimmy";

const appointments = [
  {
    title: 'Annual Checkup',
    date: 'May 10, 2025',
    time: '10:00 AM',
    doctor: 'Dr. Smith',
  },
  {
    title: 'Dental Cleaning',
    date: 'May 15, 2025',
    time: '2:30 PM',
    doctor: 'Dr. Johnson',
  },
  {
    title: 'Eye Examination',
    date: 'May 22, 2025',
    time: '11:15 AM',
    doctor: 'Dr. Williams',
  },
  {
    title: 'Eye Examination',
    date: 'May 22, 2025',
    time: '11:15 AM',
    doctor: 'Dr. Williams',
  },
  {
    title: 'Eye Examination',
    date: 'May 22, 2025',
    time: '11:15 AM',
    doctor: 'Dr. Williams',
  },
];

const PatientHome = () => {
  const [showAppointmentsModal, setShowAppointmentsModal] = useState(false);
  const [showMedicationsModal, setShowMedicationsModal] = useState(false);

  const [medications, setMedications] = useState<Medication[]>([]);

  useEffect(() => {
    axios
      .get('/api/appointments/medications')
      .then((res) => {
        if (Array.isArray(res.data)) {
          const patientMeds = res.data
            .filter((m) => m.PID?.trim().toLowerCase() === PID.toLowerCase())
            .sort((a, b) => new Date(a.refillDate).getTime() - new Date(b.refillDate).getTime()); // 🔼 ascending
          setMedications(patientMeds);
        } else {
          console.warn("⚠️ Expected array, got:", res.data);
        }
      })
      .catch((err) => {
        console.error("❌ Failed to fetch medications:", err);
      });
  }, []);  

  return (
    <div className={styles.bg}>
      <PatientNavbar />
      <main className={styles.main}>
        <h1 className={styles.welcome}>Welcome, Jimmy!</h1>
        <div className={styles.subtitle}>
          Your next appointment is on May 10, 2025. Remember to take your medications as prescribed.
        </div>
        <div className={styles.cards}>
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Upcoming Appointments</h2>
            <div className={styles.cardSubtitle}>You have {appointments.length} scheduled appointments.</div>
            <ul className={styles.list}>
              {appointments.slice(0, 3).map((appt, i) => (
                <li key={i} className={styles.listItem}>
                  <div>
                    <strong>{appt.title}</strong>
                    <div className={styles.listDetail}>{appt.date} at {appt.time}</div>
                    <div className={styles.listDetail}>With {appt.doctor}</div>
                  </div>
                </li>
              ))}
            </ul>
            <button className={styles.actionBtn} onClick={() => setShowAppointmentsModal(true)}>View All Appointments</button>
            <button className={styles.primaryBtn}>Schedule New Appointment</button>
          </section>
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Current Medications</h2>
            <div className={styles.cardSubtitle}>You have {medications.length} active prescriptions.</div>
            <ul className={styles.list}>
              {medications.slice(0, 3).map((med, i) => (
                <li key={i} className={styles.listItem}>
                  <div>
                  <strong>{med.medication}</strong>
                  <div className={styles.listDetail}>{med.frequency}</div>
                  <div className={styles.listDetail}>By {med.DID} • Refill: {med.refillDate}</div>
                  </div>
                  <span className={
                    med.status === 'Active'
                      ? styles.statusActive
                      : styles.statusRefill
                  }>
                    {med.status}
                  </span>
                </li>
              ))}
            </ul>
            <button className={styles.actionBtn} onClick={() => setShowMedicationsModal(true)}>View All Medications</button>
            <div className={styles.medBtnRow}>
              <button className={styles.actionBtn}>Refill</button>
              <button className={styles.primaryBtn}>Add New</button>
            </div>
          </section>
        </div>
        {/* Appointments Modal */}
        {showAppointmentsModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <h2 className={styles.cardTitle}>All Appointments</h2>
              <div className={styles.modalList}>
                <ul className={styles.list}>
                  {appointments.map((appt, i) => (
                    <li key={i} className={styles.listItem}>
                      <div>
                        <strong>{appt.title}</strong>
                        <div className={styles.listDetail}>{appt.date} at {appt.time}</div>
                        <div className={styles.listDetail}>With {appt.doctor}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <button className={styles.actionBtn} onClick={() => setShowAppointmentsModal(false)}>Close</button>
            </div>
          </div>
        )}
        {/* Medications Modal */}
        {showMedicationsModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <h2 className={styles.cardTitle}>All Medications</h2>
              <div className={styles.modalList}>
                <ul className={styles.list}>
                {medications.map((med, i) => (
                  <li key={i} className={styles.listItem}>
                    <div>
                      <strong>{med.medication}</strong>
                      <div className={styles.listDetail}>{med.frequency}</div>
                      <div className={styles.listDetail}>By {med.DID} • Refill: {med.refillDate}</div>
                    </div>
                    <span className={
                      med.status === 'Active'
                        ? styles.statusActive
                        : styles.statusRefill
                    }>
                      {med.status}
                    </span>
                  </li>
                ))}
                </ul>
              </div>
              <button className={styles.actionBtn} onClick={() => setShowMedicationsModal(false)}>Close</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PatientHome; 