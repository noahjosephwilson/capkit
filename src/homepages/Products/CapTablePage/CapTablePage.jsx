import React from 'react';
import styles from './CapTablePage.module.css';

const CapTablePage = () => {
  // Sample cap table data
  const capTableData = [
    { shareholder: 'Alice', shares: 1000, percentage: '25%' },
    { shareholder: 'Bob', shares: 1500, percentage: '37.5%' },
    { shareholder: 'Charlie', shares: 1500, percentage: '37.5%' },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cap Table</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Shareholder</th>
            <th>Shares</th>
            <th>Ownership %</th>
          </tr>
        </thead>
        <tbody>
          {capTableData.map((row, index) => (
            <tr key={index}>
              <td>{row.shareholder}</td>
              <td>{row.shares}</td>
              <td>{row.percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CapTablePage;
