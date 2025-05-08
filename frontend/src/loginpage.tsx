import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/login/loginpage.module.css';
// You can use an icon library, but for simplicity, we'll use an emoji for the lock icon

const users = [
  { email: 'doctor@example.com', password: 'doctor123', role: 'doctor' },
  { email: 'patient@example.com', password: 'patient123', role: 'patient' }
];

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'doctor' | 'patient' | ''>('');
  const [error, setError] = useState('');

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
    const found = users.find(
      u => u.email === email && u.password === password && u.role === role
    );
    if (found) {
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
              {role === 'doctor' ? 'Doctor Login' : role === 'patient' ? 'Patient Login' : 'Login'}
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
            <div className={styles.forgotRow}>
              <a href="#" className={styles.forgotLink}>Forgot password?</a>
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