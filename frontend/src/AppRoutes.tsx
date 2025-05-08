import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './loginpage';
import PatientHome from './pages/patientpage/patienthome';
import RecordsPage from './pages/patientpage/RecordsPage';
import PatientLayout from './pages/patientpage/PatientLayout';
import DoctorHome from './pages/doctorpage/doctorhome';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/doctor" element={<DoctorHome />} />
      
      {/* Patient Routes */}
      <Route path="/patient" element={<PatientLayout />}>
        <Route index element={<PatientHome />} />
        <Route path="records" element={<RecordsPage />} />
      </Route>

      {/* Redirect to login if no route matches */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
