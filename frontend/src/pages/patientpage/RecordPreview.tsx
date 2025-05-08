import React from 'react';
import styles from './RecordsPage.module.css';

const RecordPreview = ({ record }) => {
  if (!record) return (
    <section className={styles.preview}>
      <div className={styles.previewPlaceholder}>Select a document to view details.</div>
    </section>
  );

  return (
    <section className={styles.preview}>
      <div className={styles.previewHeader}>
        <h2 className={styles.previewTitle}>{record.title}</h2>
        <span className={styles.previewDate}>{record.date}</span>
      </div>
      <div className={styles.previewContent}>
        {/* Simple markdown rendering for demo purposes */}
        {record.content.split('\n').map((line, i) => {
          if (line.startsWith('**')) {
            return <div key={i} style={{ fontWeight: 600 }}>{line.replace(/\*\*/g, '')}</div>;
          }
          if (line.startsWith('##')) {
            return <div key={i} style={{ fontWeight: 700, fontSize: '1.1rem', marginTop: 12 }}>{line.replace(/## /, '')}</div>;
          }
          if (line.startsWith('- ')) {
            return <div key={i} style={{ marginLeft: 16 }}>• {line.replace(/- /, '')}</div>;
          }
          return <div key={i}>{line}</div>;
        })}
      </div>
    </section>
  );
};

export default RecordPreview; 