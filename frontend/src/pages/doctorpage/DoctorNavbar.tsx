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
        <Link className={styles.navLink} to="/doctor/profile">Profile</Link> {/* New link */}

      </nav>
      <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default DoctorNavbar; 