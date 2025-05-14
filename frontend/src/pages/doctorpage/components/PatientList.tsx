import { useState, useEffect } from 'react';

interface Patient {
  id: number;
  name: string;
  age: number;
}

const PatientList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    fetch('/api/patients')
      .then((response) => response.json())
      .then((data: Patient[]) => setPatients(data));
  }, []);

  return (
    <div>
      <h3>Patients</h3>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>
            {patient.name} - {patient.age} years old
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;