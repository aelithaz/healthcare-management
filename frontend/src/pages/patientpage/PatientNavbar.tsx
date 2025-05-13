import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './PatientNavbar.module.css';

const PatientNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>MedPortal</div>
      <nav className={styles.nav}>
        <Link className={styles.navLink} to="/patient">Home</Link>
        <Link className={styles.navLink} to="/patient/records">Records</Link>
      </nav>
      <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default PatientNavbar; 