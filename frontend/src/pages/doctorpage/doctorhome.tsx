import React from 'react';

const DoctorHome = () => {
  return (
    <div style={{ padding: '48px 0', textAlign: 'center' }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, color: '#2563eb', marginBottom: 16 }}>Welcome, Doctor!</h1>
      <p style={{ fontSize: 20, color: '#334155' }}>This is your doctor dashboard. Here you can manage your patients and appointments.</p>
      {/* Add more doctor-specific features here */}
    </div>
  );
};

export default DoctorHome; 