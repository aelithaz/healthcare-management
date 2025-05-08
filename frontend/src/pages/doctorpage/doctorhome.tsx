import React from 'react';
import styles from './DoctorHome.module.css';
import DoctorNavbar from './DoctorNavbar';
import DoctorAppointmentsCard from './DoctorAppointmentsCard';

const DoctorHome = () => {
  return (
    <div className={styles.bg}>
      <DoctorNavbar />
      <main className={styles.main}>
        <h1 className={styles.welcome}>Welcome, Dr. Smith!</h1>
        <p className={styles.subtitle}>This is your dashboard. Future features for managing patients, appointments, and records will appear here.</p>
        <div className={styles.cardsRow}>
          <DoctorAppointmentsCard />
        </div>
      </main>
    </div>
  );
};

export default DoctorHome; 