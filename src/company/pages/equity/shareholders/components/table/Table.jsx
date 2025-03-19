import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import styles from './Table.module.css';

const Table = () => {
  const [search, setSearch] = useState('');
  
  // Updated sample data with additional fields for the new columns
  const shareholders = [
    { 
      id: 1, 
      profile: 'https://via.placeholder.com/40', 
      name: 'John Doe', 
      email: 'john.doe@example.com',
      type: 'Individual',
      status: 'Active',
      shares: 1000, 
      paidOnShares: 800,
      unpaidOnShares: 200
    },
    { 
      id: 2, 
      profile: 'https://via.placeholder.com/40', 
      name: 'Jane Smith', 
      email: 'jane.smith@example.com',
      type: 'SPV',
      status: 'Inactive',
      shares: 2000, 
      paidOnShares: 1500,
      unpaidOnShares: 500
    },
    { 
      id: 3, 
      profile: 'https://via.placeholder.com/40', 
      name: 'Bob Johnson', 
      email: 'bob.johnson@example.com',
      type: 'Individual',
      status: 'Active',
      shares: 1500, 
      paidOnShares: 1500,
      unpaidOnShares: 0
    },
    // Add more records as needed
  ];

  // Filter shareholders based on search term matching name, email, or type
  const filteredShareholders = shareholders.filter(shareholder =>
    shareholder.name.toLowerCase().includes(search.toLowerCase()) ||
    shareholder.email.toLowerCase().includes(search.toLowerCase()) ||
    shareholder.type.toLowerCase().includes(search.toLowerCase())
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
          <button className={styles.button}>+ Add Individual</button>
          <button className={styles.button}>+ Add Special Purpose Vehicle (SPV)</button>
        </div>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Type</th>
              <th>Status</th>
              <th>Shares</th>
              <th>Paid on Shares</th>
              <th>Unpaid on Shares</th>
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
                <td>{shareholder.email}</td>
                <td>{shareholder.type}</td>
                <td>{shareholder.status}</td>
                <td>{shareholder.shares}</td>
                <td>{shareholder.paidOnShares}</td>
                <td>{shareholder.unpaidOnShares}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
