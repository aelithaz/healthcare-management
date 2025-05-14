import React from 'react';

const Calendar = () => {
  return (
    <iframe
      src="https://calendar.google.com/calendar/embed?src=example@gmail.com&ctz=America/New_York"
      style={{ border: 0, width: '100%', height: '400px' }}
      frameBorder="0"
      scrolling="no"
      title="Doctor's Calendar"
    ></iframe>
  );
};

export default Calendar;