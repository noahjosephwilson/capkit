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

  // State for filtering by transaction type
  const [filters, setFilters] = useState({
    Credit: true,
    Debit: true,
    Refund: true,
  });

  // State for dropdown values
  const [days, setDays] = useState("7");
  const [detailsOption, setDetailsOption] = useState("All");

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // State for active panel: "filterHistory", "detailsShown", or null
  const [activePanel, setActivePanel] = useState(null);

  const togglePanel = (panel) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  const handleCheckboxChange = (type) => {
    setFilters({
      ...filters,
      [type]: !filters[type],
    });
  };

  const handleDaysChange = (e) => {
    setDays(e.target.value);
  };

  const handleDetailsChange = (e) => {
    setDetailsOption(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter the transactions based on selected types and search query
  const filteredTransactions = sampleTransactions.filter((tx) => {
    const matchesType = filters[tx.type];
    const matchesSearch =
      tx.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.status.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && (searchQuery === "" || matchesSearch);
  });

  return (
    <div className={styles.transactionLogPage}>
      <header className={styles.transactionLogHeader}>
        <div className={styles.titleContainer}>
          <h1 className={styles.breadcrumb}>Transaction Log</h1>
        </div>
        <div className={styles.topRightControls}>
          <label htmlFor="daysSelect" className={styles.controlLabel}>
            Days Back:
          </label>
          <select
            id="daysSelect"
            value={days}
            onChange={handleDaysChange}
            className={styles.enhancedSelectInput}
          >
            <option value="7">7 Days</option>
            <option value="14">14 Days</option>
            <option value="30">30 Days</option>
            <option value="60">60 Days</option>
          </select>
        </div>
      </header>

      {/* Search bar and toggle buttons placed above the table */}
      <div className={styles.controlsContainer}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.panelButton} ${activePanel === "filterHistory" ? styles.activeButton : ""}`}
            onClick={() => togglePanel("filterHistory")}
          >
            Filter History
          </button>
          <button
            className={`${styles.panelButton} ${activePanel === "detailsShown" ? styles.activeButton : ""}`}
            onClick={() => togglePanel("detailsShown")}
          >
            Details Shown
          </button>
        </div>
      </div>

      {/* Panel: Filter History */}
      {activePanel === "filterHistory" && (
        <div className={styles.panelContainer}>
          <div className={styles.panelTitle}>Filter by Transaction Type</div>
          <div className={styles.filterOptions}>
            {Object.keys(filters).map((type) => (
              <label key={type} className={styles.checkboxLabel}>
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

      {/* Panel: Details Shown Dropdown */}
      {activePanel === "detailsShown" && (
        <div className={styles.panelContainer}>
          <div className={styles.panelTitle}>Details Shown</div>
          <div className={styles.dropdownContainer}>
            <select
              id="detailsSelect"
              value={detailsOption}
              onChange={handleDetailsChange}
              className={styles.selectInput}
            >
              <option value="All">All Details</option>
              <option value="Essential">Essential</option>
              <option value="Verbose">Verbose</option>
            </select>
          </div>
        </div>
      )}

      {/* Transaction Log Table */}
      <div className={styles.tableContainer}>
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
    </div>
  );
};

export default TransactionLogPage;
