import React from 'react';

interface Prescription {
  patientName: string;
  medications: { name: string; dosage: string }[];
}

const prescriptions: Prescription[] = [
  {
    patientName: 'Jane Smith',
    medications: [
      { name: 'Medication A', dosage: '10mg once daily' },
      { name: 'Medication B', dosage: '5mg twice daily' },
    ],
  },
  {
    patientName: 'Bob Johnson',
    medications: [{ name: 'Medication C', dosage: '20mg once daily' }],
  },
];

const PrescriptionsManagement: React.FC<{ patientName: string }> = ({ patientName }) => {
  const patientPrescriptions = prescriptions.find((p) => p.patientName === patientName);

  if (!patientPrescriptions) {
    return <p>No prescriptions available for this patient.</p>;
  }

  return (
    <div>
      <h4>Prescriptions for {patientName}</h4>
      <ul>
        {patientPrescriptions.medications.map((med, index) => (
          <li key={index}>
            {med.name} - {med.dosage}
          </li>
        ))}
      </ul>
      <button>Issue New Prescription</button>
    </div>
  );
};

export default PrescriptionsManagement;