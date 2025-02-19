import React, { useState } from "react";
import styles from "./TransactionLogPage.module.css";

const TransactionLogPage = () => {
  // Sample transactions array
  const sampleTransactions = [
    { id: 1, date: "2025-01-15", type: "Credit", amount: "$1,200.00", status: "Completed" },
    { id: 2, date: "2025-01-16", type: "Debit", amount: "$350.00", status: "Pending" },
    { id: 3, date: "2025-01-17", type: "Refund", amount: "$120.00", status: "Completed" },
    { id: 4, date: "2025-01-18", type: "Credit", amount: "$2,500.00", status: "Completed" },
    { id: 5, date: "2025-01-19", type: "Debit", amount: "$600.00", status: "Failed" },
  ];

  // State to toggle filter panel
  const [showTypes, setShowTypes] = useState(false);
  // State for transaction type filters
  const [filters, setFilters] = useState({
    Credit: true,
    Debit: true,
    Refund: true,
  });

  const toggleFilterPanel = () => {
    setShowTypes(!showTypes);
  };

  const handleCheckboxChange = (type) => {
    setFilters({
      ...filters,
      [type]: !filters[type],
    });
  };

  // Filter the transactions based on selected types
  const filteredTransactions = sampleTransactions.filter(
    (tx) => filters[tx.type]
  );

  return (
    <div className={styles.transactionLogPage}>
      <header className={styles.transactionLogHeader}>
        <div className={styles.breadcrumb}>Transaction Log</div>
        <button className={styles.transactionLogButton} onClick={toggleFilterPanel}>
          Check Types
        </button>
      </header>

      {/* Filter Panel */}
      {showTypes && (
        <div className={styles.filterPanel}>
          <div className={styles.filterTitle}>Filter by Transaction Type</div>
          <div className={styles.filterOptions}>
            {Object.keys(filters).map((type) => (
              <label key={type}>
                <input
                  type="checkbox"
                  checked={filters[type]}
                  onChange={() => handleCheckboxChange(type)}
                />{" "}
                {type}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Transaction Log Table */}
      <table className={styles.transactionTable}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((tx) => (
            <tr key={tx.id}>
              <td>{tx.date}</td>
              <td>{tx.type}</td>
              <td>{tx.amount}</td>
              <td>{tx.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionLogPage;
