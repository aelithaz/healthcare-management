import { useState } from 'react'
import './css/App.css'
import { Routes,Route } from 'react-router-dom'
import Login from './loginpage';
import DoctorHome from './pages/doctorpage/doctorhome';
import PatientHome from './pages/patientpage/patienthome';

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor" element={<DoctorHome />} />
        <Route path="/patient" element={<PatientHome />} />
      </Routes>
  
    </>
  )
}

export default App
