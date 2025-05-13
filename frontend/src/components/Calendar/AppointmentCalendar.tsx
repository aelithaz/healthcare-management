import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './AppointmentCalendar.module.css';

interface Appointment {
  date: string;
  patientName: string;
}

const appointments: Appointment[] = [
  { date: '2025-05-15', patientName: 'Jane Smith' },
  { date: '2025-05-16', patientName: 'Bob Johnson' },
];

const AppointmentCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const appointmentsForDate = appointments.filter(
    (appointment) => new Date(appointment.date).toDateString() === selectedDate?.toDateString()
  );

  return (
    <div className={styles.container}>
      <Calendar onClickDay={handleDateClick} />
      {selectedDate && (
        <div className={styles.details}>
          <h3>Appointments on {selectedDate.toDateString()}</h3>
          <ul>
            {appointmentsForDate.map((appointment, index) => (
              <li key={index}>{appointment.patientName}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendar;