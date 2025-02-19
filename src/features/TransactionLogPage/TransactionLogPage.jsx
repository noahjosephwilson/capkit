import React from "react";
import styles from "./TransactionLogPage.module.css";

const TransactionLogPage = () => {
  return (
    <div className={styles.transactionLogPage}>
      <header className={styles.transactionLogHeader}>
        <div className={styles.breadcrumb}>Transaction Log</div>
      </header>
      {/* Additional Transaction Log content can be added here */}
    </div>
  );
};

export default TransactionLogPage;
