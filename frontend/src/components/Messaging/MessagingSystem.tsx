import React, { useState } from 'react';
import styles from './MessagingSystem.module.css';

interface Message {
  sender: 'Doctor' | 'Patient';
  content: string;
}

const initialMessages: Message[] = [
  { sender: 'Patient', content: 'Hi, I have a question about my medication.' },
  { sender: 'Doctor', content: 'Sure, how can I help?' },
];

const MessagingSystem: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    setMessages([...messages, { sender: 'Doctor', content: newMessage }]);
    setNewMessage('');
  };

  return (
    <div className={styles.container}>
      <h2>Messaging System</h2>
      <div className={styles.messages}>
        {messages.map((msg, index) => (
          <p key={index} className={msg.sender === 'Doctor' ? styles.doctor : styles.patient}>
            <strong>{msg.sender}:</strong> {msg.content}
          </p>
        ))}
      </div>
      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message here..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default MessagingSystem;