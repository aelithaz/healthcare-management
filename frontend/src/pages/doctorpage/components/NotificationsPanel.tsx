import React from 'react';

const NotificationsPanel = () => {
  const notifications = [
    'You have an appointment with Jane Smith on May 15, 2025.',
    'Bob Johnson missed his appointment on May 10, 2025.',
    'Medication refill for Alice Brown is due by May 20, 2025.'
  ];

  return (
    <section>
      <h3>Notifications</h3>
      <ul>
        {notifications.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </section>
  );
};

export default NotificationsPanel;