import React from 'react';
import styles from './NotificationsSection.module.css';

interface Notification {
  type: 'Appointment' | 'Missed Appointment' | 'Refill Due';
  message: string;
}

const notifications: Notification[] = [
  { type: 'Appointment', message: 'You have an appointment with Jane Smith on May 15, 2025, at 10:00 AM.' },
  { type: 'Missed Appointment', message: 'Bob Johnson missed his appointment scheduled on May 10, 2025.' },
  { type: 'Refill Due', message: 'Medication refill for Alice Brown is due by May 20, 2025.' },
];

const NotificationsSection: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Notifications</h2>
      <ul className={styles.list}>
        {notifications.map((notification, index) => (
          <li key={index} className={styles.notification}>
            <strong>{notification.type}:</strong> {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsSection;