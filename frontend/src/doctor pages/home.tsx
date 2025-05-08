import React, { useState } from 'react';

interface Appointment {
  id: number;
  patient: string;
  date: string;
  time: string;
  notes: string;
}

interface PatientRecord {
  id: number;
  name: string;
  diagnosis: string;
  lastVisit: string;
}

const dummyAppointments: Appointment[] = [
  { id: 1, patient: 'Alice Smith', date: '2025-05-10', time: '10:00 AM', notes: 'Annual checkup' },
  { id: 2, patient: 'Bob Jones', date: '2025-05-11', time: '1:30 PM', notes: 'Lab review' },
];

const dummyRecords: PatientRecord[] = [
  { id: 1, name: 'Alice Smith', diagnosis: 'Hypertension', lastVisit: '2025-05-01' },
  { id: 2, name: 'Bob Jones', diagnosis: 'Diabetes', lastVisit: '2025-04-25' },
];

const DoctorPortal: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [records, setRecords] = useState<PatientRecord[]>(dummyRecords);

  const filteredRecords = records.filter(record =>
    record.name.toLowerCase().includes(search.toLowerCase()) ||
    record.diagnosis.toLowerCase().includes(search.toLowerCase())
  );

  const updateRecord = (id: number, field: keyof PatientRecord, value: string) => {
    setRecords(prev =>
      prev.map(record =>
        record.id === id ? { ...record, [field]: value } : record
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-blue-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Doctor Portal</h2>
        <nav>
          <ul className="space-y-2">
            <li><a href="#appointments" className="hover:underline">Appointments</a></li>
            <li><a href="#records" className="hover:underline">Patient Records</a></li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <section id="appointments" className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Upcoming Appointments</h3>
          <ul className="space-y-3">
            {dummyAppointments.map(app => (
              <li key={app.id} className="bg-white p-4 rounded shadow">
                <strong>{app.patient}</strong> — {app.date} at {app.time}
                <p className="text-sm text-gray-600">{app.notes}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="records">
          <h3 className="text-2xl font-semibold mb-4">Patient Records</h3>
          <input
            type="text"
            placeholder="Search by name or diagnosis"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded w-full"
          />
          <ul className="space-y-3">
            {filteredRecords.map(record => (
              <li key={record.id} className="bg-white p-4 rounded shadow">
                <div>
                  <strong>{record.name}</strong> — Last Visit: {record.lastVisit}
                </div>
                <div>
                  Diagnosis:
                  <input
                    type="text"
                    value={record.diagnosis}
                    onChange={(e) =>
                      updateRecord(record.id, 'diagnosis', e.target.value)
                    }
                    className="ml-2 border-b border-gray-300 focus:outline-none"
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default DoctorPortal;