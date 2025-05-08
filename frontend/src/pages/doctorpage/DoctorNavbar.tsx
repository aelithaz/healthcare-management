import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './DoctorNavbar.module.css';

const DoctorNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>MedPortal</div>
      <nav className={styles.nav}>
        <Link className={styles.navLink} to="/doctor">Home</Link>
      </nav>
      <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default DoctorNavbar; 