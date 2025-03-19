import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import styles from './Table.module.css';

// Custom InfoIcon component matching the provided design inspiration
const InfoIcon = ({ tooltipText }) => (
  <div className={styles.infoIcon}>
    i
    <span className={styles.tooltip}>{tooltipText}</span>
  </div>
);

const Table = () => {
  const [search, setSearch] = useState('');
  
  // Sample shareholder data updated to include vested and unvested instruments as numbers
  const shareholders = [
    { 
      id: 1, 
      profile: 'https://via.placeholder.com/40', 
      name: 'John Doe', 
      role: 'Investor', 
      shares: 1000, 
      vestedInstruments: 500, 
      unvestedInstruments: 200, 
      totalValue: '$50,000', 
      ownership: '10%' 
    },
    { 
      id: 2, 
      profile: 'https://via.placeholder.com/40', 
      name: 'Jane Smith', 
      role: 'Founder', 
      shares: 2000, 
      vestedInstruments: 1500, 
      unvestedInstruments: 500, 
      totalValue: '$100,000', 
      ownership: '20%' 
    },
    { 
      id: 3, 
      profile: 'https://via.placeholder.com/40', 
      name: 'Bob Johnson', 
      role: 'Advisor', 
      shares: 1500, 
      vestedInstruments: 800, 
      unvestedInstruments: 300, 
      totalValue: '$75,000', 
      ownership: '15%' 
    },
    // Add more records as needed
  ];

  // Filter shareholders based on search term matching name or role
  const filteredShareholders = shareholders.filter(shareholder =>
    shareholder.name.toLowerCase().includes(search.toLowerCase()) ||
    shareholder.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleRowClick = (shareholder) => {
    // Handle row click event (e.g., navigate to details page or open modal)
    console.log('Clicked on shareholder:', shareholder);
  };

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <div className={styles.searchContainer}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search shareholders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.buttons}>
          <button className={styles.button}>+ Add Shareholder</button>
          <button className={styles.button}>Download</button>
        </div>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>
                Shares <InfoIcon tooltipText="Total number of shares held" />
              </th>
              <th>
                Vested<br />Instruments <InfoIcon tooltipText="Number of vested instruments" />
              </th>
              <th>
                Unvested<br />Instruments <InfoIcon tooltipText="Number of unvested instruments" />
              </th>
              <th>
                Total<br />Value <InfoIcon tooltipText="Total monetary value" />
              </th>
              <th>Ownership</th>
            </tr>
          </thead>
          <tbody>
            {filteredShareholders.map((shareholder) => (
              <tr 
                key={shareholder.id} 
                onClick={() => handleRowClick(shareholder)} 
                className={styles.clickableRow}
              >
                <td className={styles.nameCell}>
                  <img 
                    src={shareholder.profile} 
                    alt={`${shareholder.name} profile`} 
                    className={styles.profileImage}
                  />
                  {shareholder.name}
                </td>
                <td>{shareholder.role}</td>
                <td>{shareholder.shares}</td>
                <td>{shareholder.vestedInstruments}</td>
                <td>{shareholder.unvestedInstruments}</td>
                <td>{shareholder.totalValue}</td>
                <td>{shareholder.ownership}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
