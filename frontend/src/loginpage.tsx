import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './css/login/loginpage.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'doctor' | 'patient' | ''>('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = (selectedRole: 'doctor' | 'patient') => {
    setRole(selectedRole);
    setError('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/accounts/login', {
        email,
        password,
        role,
      });

      // Save user data to localStorage
      localStorage.setItem('userID', response.data.ID);
      localStorage.setItem('userName', response.data.name);
      navigate(`/${role}`);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Login failed');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
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
              <button
                onClick={() => handleRoleSelect('patient')}
                className={styles.roleCard}
                aria-label="Select Patient Role"
              >
                <span className={styles.roleIcon}>👤</span>
                <div className={styles.roleLabel}>Patient</div>
                <div className={styles.roleDesc}>Access your health records</div>
              </button>
              <button
                onClick={() => handleRoleSelect('doctor')}
                className={styles.roleCard}
                aria-label="Select Doctor Role"
              >
                <span className={styles.roleIcon}>🩺</span>
                <div className={styles.roleLabel}>Doctor</div>
                <div className={styles.roleDesc}>Manage your patients</div>
              </button>
            </div>
            <div className={styles.signupPrompt}>
              Don't have an account? <a href="/signup" className={styles.signupLink}>Sign up</a>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} aria-busy={loading}>
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
                onChange={(e) => setEmail(e.target.value)}
                className={styles.inputField}
                autoComplete="username"
              />
              <label className={styles.inputLabel}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.inputField}
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className={styles.errorMsg} aria-live="polite">
                {error}
              </div>
            )}

            <button type="submit" className={styles.loginBtn} disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;