import { useEffect, useState } from "react";

type Appointment = {
  apt_time: string;
  DID: string;
  PID: string;
};

function App() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    fetch("/api/appointments")
      .then((res) => {
        console.log("📡 Status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("📦 Fetched appointments:", data);
        setAppointments(data);
      })
      .catch(err => console.error("❌ Fetch error:", err));
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontSize: "1rem" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "2px solid #ccc", textAlign: "left", padding: "8px" }}>Appointment Time</th>
            <th style={{ borderBottom: "2px solid #ccc", textAlign: "left", padding: "8px" }}>Doctor ID</th>
            <th style={{ borderBottom: "2px solid #ccc", textAlign: "left", padding: "8px" }}>Patient ID</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((apt, index) => (
            <tr key={index}>
              <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>{apt.apt_time}</td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>{apt.DID}</td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>{apt.PID}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;