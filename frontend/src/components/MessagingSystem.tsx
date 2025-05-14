import React, { useState } from 'react';

const MessagingSystem = () => {
  const [messages, setMessages] = useState([
    { sender: 'Patient', text: 'Hi, I have a question about my medication.' },
    { sender: 'Doctor', text: 'Sure, how can I help?' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    setMessages([...messages, { sender: 'Doctor', text: newMessage }]);
    setNewMessage('');
  };

  return (
    <section>
      <h3>Messaging</h3>
      <div>
        {messages.map((msg, index) => (
          <p key={index}><strong>{msg.sender}:</strong> {msg.text}</p>
        ))}
      </div>
      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
      ></textarea>
      <button onClick={sendMessage}>Send</button>
    </section>
  );
};

export default MessagingSystem;