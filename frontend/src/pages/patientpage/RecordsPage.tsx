import React, { useState } from 'react';
import styles from './RecordsPage.module.css';
import RecordsSidebar from './RecordsSidebar';
import RecordPreview from './RecordPreview';

const sampleRecords = [
  {
    id: 1,
    title: 'Annual Physical Examination',
    date: 'Mar 14, 2025',
    doctor: 'Dr. Dr. Smith',
    content: `**Date:** March 15, 2025\n**Physician:** Dr. Smith\n**Clinic:** MedCenter Primary Care\n\n## Vital Signs\n- Blood Pressure: 120/80 mmHg\n- Heart Rate: 72 bpm\n- Respiratory Rate: 16 breaths/min\n- Temperature: 98.6°F\n- Height: 5\'8\"\n- Weight: 150 lbs\n\n## Notes\nPatient is in good health. Continue current medications.\nFollow up in 1 year.`
  },
  {
    id: 2,
    title: 'Blood Work Results',
    date: 'Mar 19, 2025',
    doctor: 'Dr. Dr. Johnson',
    content: `**Date:** March 19, 2025\n**Physician:** Dr. Johnson\n**Clinic:** MedLab Diagnostics\n\n## Results\n- Hemoglobin: 14.2 g/dL\n- WBC: 6,000 /uL\n- Platelets: 250,000 /uL\n\n## Notes\nAll results within normal range.`
  },
  {
    id: 3,
    title: 'Cardiology Consultation',
    date: 'Feb 9, 2025',
    doctor: 'Dr. Dr. Williams',
    content: `**Date:** Feb 9, 2025\n**Physician:** Dr. Williams\n**Clinic:** HeartCare Center\n\n## Summary\n- EKG: Normal\n- Echocardiogram: Normal\n\n## Notes\nNo cardiac issues detected.`
  },
  {
    id: 4,
    title: 'Vaccination Record',
    date: 'Nov 4, 2024',
    doctor: 'Dr. Dr. Brown',
    content: `**Date:** Nov 4, 2024\n**Physician:** Dr. Brown\n**Clinic:** City Health Clinic\n\n## Vaccines\n- Influenza\n- COVID-19 Booster\n\n## Notes\nNo adverse reactions reported.`
  },
  {
    id: 5,
    title: 'Allergy Test Results',
    date: 'Sep 17, 2024',
    doctor: 'Dr. Dr. Davis',
    content: `**Date:** Sep 17, 2024\n**Physician:** Dr. Davis\n**Clinic:** AllergyCare\n\n## Results\n- Dust: Positive\n- Pollen: Negative\n- Pet Dander: Positive\n\n## Notes\nRecommend allergy medication.`
  },
  {
    id: 6,
    title: 'Annual Eye Examination',
    date: 'Aug 21, 2024',
    doctor: 'Dr. Dr. Garcia',
    content: `**Date:** Aug 21, 2024\n**Physician:** Dr. Garcia\n**Clinic:** Vision Center\n\n## Results\n- Vision: 20/20\n- Eye Pressure: Normal\n\n## Notes\nNo issues detected.`
  },
];

const RecordsPage = () => {
  const [selectedId, setSelectedId] = useState(sampleRecords[0].id);
  const selectedRecord = sampleRecords.find(r => r.id === selectedId);

  return (
    <div className={styles.recordsLayout}>
      <RecordsSidebar
        records={sampleRecords}
        selectedRecordId={selectedId}
        onSelectRecord={setSelectedId}
      />
      <RecordPreview record={selectedRecord} />
    </div>
  );
};

export default RecordsPage; 