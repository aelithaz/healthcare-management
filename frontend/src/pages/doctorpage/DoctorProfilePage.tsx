import React from 'react';
import styles from './DoctorProfilePage.module.css';

const DoctorProfilePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Doctor Profile</h1>
      <section className={styles.profileSection}>
        <h2 className={styles.subtitle}>Dr. John Doe</h2>
        <p className={styles.info}>Specialization: Cardiology</p>
        <p className={styles.info}>Contact: johndoe@hospital.com | (123) 456-7890</p>
      </section>
      <section className={styles.appointmentsSection}>
        <h2 className={styles.subtitle}>Upcoming Appointments</h2>
        <ul className={styles.list}>
          <li>Patient: Jane Smith | Date: May 15, 2025 | Time: 10:00 AM</li>
          <li>Patient: Bob Johnson | Date: May 16, 2025 | Time: 2:00 PM</li>
        </ul>
      </section>
    </div>
  );
};

export default DoctorProfilePage;