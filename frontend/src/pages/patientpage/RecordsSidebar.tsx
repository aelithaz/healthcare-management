import React from 'react';
import styles from './RecordsPage.module.css';

const icons = [
  '🩺', '🧪', '❤️', '📅', '🤧', '👁️'
];

const RecordsSidebar = ({ records, selectedRecordId, onSelectRecord }) => {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.sidebarTitle}>Documents</h2>
      <ul className={styles.recordList}>
        {records.map((rec, i) => (
          <li
            key={rec.id}
            className={
              rec.id === selectedRecordId
                ? styles.recordItemSelected
                : styles.recordItem
            }
            onClick={() => onSelectRecord(rec.id)}
          >
            <span className={styles.recordIcon}>{icons[i % icons.length]}</span>
            <div>
              <div className={styles.recordName}>{rec.title}</div>
              <div className={styles.recordMeta}>{rec.date} <br />{rec.doctor}</div>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default RecordsSidebar; 