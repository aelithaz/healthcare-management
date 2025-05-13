import React from 'react';
import styles from './SearchAndFilter.module.css';

interface Props {
  onSearch: (searchTerm: string) => void;
  onFilter: (filter: string) => void;
}

const SearchAndFilter: React.FC<Props> = ({ onSearch, onFilter }) => {
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search by name..."
        className={styles.searchBar}
        onChange={(e) => onSearch(e.target.value)}
      />
      <select className={styles.filterDropdown} onChange={(e) => onFilter(e.target.value)}>
        <option value="">All Appointments</option>
        <option value="scheduled">Scheduled</option>
        <option value="completed">Completed</option>
        <option value="canceled">Canceled</option>
      </select>
    </div>
  );
};

export default SearchAndFilter;