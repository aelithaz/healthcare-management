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

type Appointment = {
  apt_dateTime: string;
  apt_name: string;
  DID: string;
  PID: string;
};

const PID = localStorage.getItem('userID') || '';

const PatientHome = () => {
  const [showAppointmentsModal, setShowAppointmentsModal] = useState(false);
  const [showMedicationsModal, setShowMedicationsModal] = useState(false);

  const [medications, setMedications] = useState<Medication[]>([]);

  useEffect(() => {
    axios
      .get('/api/medications')
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

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    axios.get('/api/appointments')
      .then((res) => {
        if (Array.isArray(res.data)) {
          const patientAppointments = res.data
            .filter((a) => a.PID?.trim().toLowerCase() === PID.toLowerCase())
            .sort((a, b) => new Date(a.apt_dateTime).getTime() - new Date(b.apt_dateTime).getTime());
          setAppointments(patientAppointments);
        } else {
          console.warn("⚠️ Unexpected appointment response:", res.data);
        }
      })
      .catch((err) => {
        console.error("❌ Failed to fetch appointments:", err);
      });
  }, []);

  const [patientName, setPatientName] = useState('');

  useEffect(() => {
    if (!PID) return;
    axios.get('/api/accounts')
      .then((res) => {
        if (Array.isArray(res.data)) {
          const user = res.data.find((acc) => acc.ID?.trim().toLowerCase() === PID.toLowerCase());
          if (user) {
            setPatientName(user.name.split(' ')[0]); // 👈 First name only
          }
        }
      })
      .catch(err => console.error("❌ Failed to fetch user name:", err));
  }, []);

  return (
    <div className={styles.bg}>
      <PatientNavbar />
      <main className={styles.main}>
        <h1 className={styles.welcome}>Welcome, {patientName || 'Patient'}!</h1>
        <div className={styles.subtitle}>
          {appointments.length > 0 ? (
            <>
              Your next appointment is on{" "}
              {new Date(appointments[0].apt_dateTime).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}.
              {" "}Remember to take your medications as prescribed.
            </>
          ) : (
            "No appointments scheduled."
          )}
        </div>
        <div className={styles.cards}>
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Upcoming Appointments</h2>
            <div className={styles.cardSubtitle}>You have {appointments.length} scheduled appointments.</div>
            <ul className={styles.list}>
              {appointments.slice(0, 3).map((appt, i) => (
                <li key={i} className={styles.listItem}>
                  <div>
                  <strong>{appt.apt_name}</strong>
                  <div className={styles.listDetail}>{new Date(appt.apt_dateTime).toLocaleString()}</div>
                  <div className={styles.listDetail}>With Dr.{appt.DID}</div>
                  </div>
                </li>
              ))}
            </ul>
            <button className={styles.actionBtn} onClick={() => setShowAppointmentsModal(true)}>View All Appointments</button>
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
                  <div className={styles.listDetail}>By Dr.{med.DID} • Refill: {med.refillDate}</div>
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
                      <strong>{appt.apt_name}</strong>
                      <div className={styles.listDetail}>{new Date(appt.apt_dateTime).toLocaleString()}</div>
                      <div className={styles.listDetail}>With Dr.{appt.DID}</div>
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
                      <div className={styles.listDetail}>By Dr.{med.DID} • Refill: {med.refillDate}</div>
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