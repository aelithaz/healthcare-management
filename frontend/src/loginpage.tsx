import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './css/login/loginpage.module.css';

type Account = {
  ID: string;
  name: string;
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'doctor' | 'patient' | ''>('');
  const [error, setError] = useState('');
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    axios.get('/api/accounts')
      .then(res => {
        if (Array.isArray(res.data)) {
          setAccounts(res.data);
        } else {
          console.warn("⚠️ Unexpected account response:", res.data);
        }
      })
      .catch(err => console.error("❌ Failed to fetch accounts:", err));
  }, []);

  const handleRoleSelect = (selectedRole: 'doctor' | 'patient') => {
    setRole(selectedRole);
    setError('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const matched = accounts.find(
      acc =>
        acc.email === email &&
        acc.password === password &&
        (role === 'doctor' ? acc.ID.startsWith('doc') : acc.ID.startsWith('pat'))
    );

    if (matched) {
      localStorage.setItem('userID', matched.ID);
      localStorage.setItem('userName', matched.name);
      navigate(`/${role}`);
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className={styles.loginBg}>
      <div className={styles.loginCard}>
        {!role ? (
          <>
            <h1 className={styles.loginTitle}>HealthLink</h1>
            <div className={styles.loginSubtitle}>Logging in as...</div>
            <div className={styles.roleGrid}>
              <button onClick={() => handleRoleSelect('patient')} className={styles.roleCard}>
                <span className={styles.roleIcon}>👤</span>
                <div className={styles.roleLabel}>Patient</div>
                <div className={styles.roleDesc}>Access your health records</div>
              </button>
              <button onClick={() => handleRoleSelect('doctor')} className={styles.roleCard}>
                <span className={styles.roleIcon}>🩺</span>
                <div className={styles.roleLabel}>Doctor</div>
                <div className={styles.roleDesc}>Manage your patients</div>
              </button>
            </div>
            <div className={styles.signupPrompt}>
              Don't have an account? <a href="#" className={styles.signupLink}>Sign up</a>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <h1 className={styles.loginTitle}>
              {role === 'doctor' ? 'Doctor Login' : 'Patient Login'}
            </h1>

            <button type="button" className={styles.backLink} onClick={() => setRole('')}>
              &#8592; Back
            </button>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={styles.inputField}
                autoComplete="username"
              />
              <label className={styles.inputLabel}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={styles.inputField}
                autoComplete="current-password"
              />
            </div>

            {error && <div className={styles.errorMsg}>{error}</div>}

            <button type="submit" className={styles.loginBtn}>Log in</button>

            <div className={styles.signupPrompt}>
              Don't have an account? <a href="#" className={styles.signupLink}>Sign up</a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;