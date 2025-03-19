"use client";

import React from "react";
import Breadcrumb from "@/company/components/breadcrumb/Breadcrumb";
import styles from "./TransactionLogPage.module.css";

const TransactionLogPage = () => {
  // Define the breadcrumb items for this page.
  const breadcrumbItems = [
    { name: "Transaction Log" }
  ];

  return (
    <div className={styles.transactionLogPage}>
      {/* Render the breadcrumb component */}
      <Breadcrumb
        breadcrumbItems={breadcrumbItems}
        titleSuffix=""
        showBack={true}
      />

      {/* Page header */}
      <header className={styles.header}>
        <h1>Transaction Log</h1>
        <p>
          Review and analyze system transactions and audit logs.
        </p>
      </header>

      {/* Main content area */}
      <main className={styles.main}>
        <section className={styles.recentLogs}>
          <h2>Recent Logs</h2>
          {/* Replace the text below with dynamic content as needed */}
          <p>Overview of the most recent transactions recorded in the system.</p>
        </section>
        <section className={styles.logHistory}>
          <h2>Log History</h2>
          {/* Optionally include detailed log entries or audit trails */}
          <p>Detailed history of transaction logs for auditing and analysis.</p>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2025 Transaction Log. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TransactionLogPage;
