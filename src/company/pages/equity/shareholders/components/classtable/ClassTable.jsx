import React from 'react';
import styles from './ClassTable.module.css';

const ClassTable = () => {
  // Sample share class data
  const shareClasses = [
    {
      id: 1,
      shareClass: 'Common',
      totalIssued: 10000,
      totalUnissued: 5000,
      totalAuthorized: 15000,
      percentageOfShares: '66.67%',
    },
    {
      id: 2,
      shareClass: 'Preferred',
      totalIssued: 20000,
      totalUnissued: 5000,
      totalAuthorized: 25000,
      percentageOfShares: '80%',
    },
    {
      id: 3,
      shareClass: 'Class A',
      totalIssued: 5000,
      totalUnissued: 2000,
      totalAuthorized: 7000,
      percentageOfShares: '71.43%',
    },
    // Add more records as needed
  ];

  return (
    <div className={styles.container}>
      {/* Separator and Title */}
      <hr className={styles.separator} />
      <h2 className={styles.title}>
        <strong>Authorized Shares</strong>
      </h2>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Share Class</th>
              <th>Total Issued</th>
              <th>Total Unissued</th>
              <th>Total Authorized</th>
              <th>Percentage of Shares</th>
            </tr>
          </thead>
          <tbody>
            {shareClasses.map((sc) => (
              <tr key={sc.id}>
                <td>{sc.shareClass}</td>
                <td>{sc.totalIssued}</td>
                <td>{sc.totalUnissued}</td>
                <td>{sc.totalAuthorized}</td>
                <td>{sc.percentageOfShares}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassTable;
