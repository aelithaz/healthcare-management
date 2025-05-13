import { Routes, Route, Navigate } from 'react-router-dom';
import { useParams } from 'react-router';
import Login from './loginpage';
import PatientHome from './pages/patientpage/patienthome';
import RecordsPage from './pages/patientpage/RecordsPage';
import PatientLayout from './pages/patientpage/PatientLayout';
import DoctorHome from './pages/doctorpage/doctorhome';
import DoctorProfilePage from './pages/doctorpage/DoctorProfilePage';
import PatientDetailsPage from './pages/doctorpage/PatientDetailsPage';

const patients = [
  { id: '1', name: 'Jane Smith', age: 30, diagnosis: 'Hypertension', medicalHistory: ['Checkup 1', 'Checkup 2'], uploadedReports: ['report1.pdf', 'report2.pdf'] },
  { id: '2', name: 'Bob Johnson', age: 45, diagnosis: 'Diabetes', medicalHistory: ['Checkup A', 'Checkup B'], uploadedReports: ['reportA.pdf', 'reportB.pdf'] },
];

const PatientDetailsWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    return <Navigate to="/doctor" replace />;
  }

  return <PatientDetailsPage patient={patient} />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/doctor" element={<DoctorHome />} />
      <Route path="/doctor/profile" element={<DoctorProfilePage />} />
      <Route path="/doctor/patient/:id" element={<PatientDetailsWrapper />} />

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