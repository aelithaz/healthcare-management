import React from 'react';
import { Outlet } from 'react-router-dom';
import PatientNavbar from './PatientNavbar';
import styles from './PatientLayout.module.css';

const PatientLayout = () => {
  return (
    <div className={styles.layout}>
      <PatientNavbar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default PatientLayout; 