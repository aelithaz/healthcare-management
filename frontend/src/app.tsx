import { useEffect, useState } from "react";

type Appointment = {
  apt_dateTime: string;
  apt_name: string;
  DID: string;
  PID: string;
};

type Medication = {
  PID: string;
  DID: string;
  medication: string;
  dosage: string;
  frequency: string;
  refillDate: string;
  status: string;
};

function App() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);

  useEffect(() => {
    fetch("/api/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch(err => console.error("❌ Appointment fetch error:", err));

    fetch("/api/appointments/medications")
      .then((res) => res.json())
      .then((data) => setMedications(data))
      .catch(err => console.error("❌ Medication fetch error:", err));
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h2>Appointments</h2>
      <table style={{ borderCollapse: "collapse", width: "100%", marginBottom: "2rem" }}>
        <thead>
          <tr>
            <th>Time</th>
            <th>Name</th>
            <th>Doctor ID</th>
            <th>Patient ID</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((apt, index) => (
            <tr key={index}>
              <td>{apt.apt_dateTime}</td>
              <td>{apt.apt_name}</td>
              <td>{apt.DID}</td>
              <td>{apt.PID}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Medications</h2>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Doctor ID</th>
            <th>Medication</th>
            <th>Dosage</th>
            <th>Frequency</th>
            <th>Refill Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {medications.map((med, index) => (
            <tr key={index}>
              <td>{med.PID}</td>
              <td>{med.DID}</td>
              <td>{med.medication}</td>
              <td>{med.dosage}</td>
              <td>{med.frequency}</td>
              <td>{med.refillDate}</td>
              <td>{med.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;