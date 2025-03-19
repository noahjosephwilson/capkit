"use client";

import React from "react";
import Breadcrumb from "@/company/components/breadcrumb/Breadcrumb";
import styles from "./StockOptionsPage.module.css";

const StockOptionsPage = () => {
  // Define the breadcrumb items for this page.
  const breadcrumbItems = [
    { name: "Stock Options" }
  ];

  return (
    <div className={styles.stockOptions}>
      {/* Render the breadcrumb component */}
      <Breadcrumb
        breadcrumbItems={breadcrumbItems}
        titleSuffix=""
        showBack={true}
      />

      {/* Page header */}
      <header className={styles.header}>
        <h1>Stock Options</h1>
        <p>
          Manage and review the company's stock options offerings.
        </p>
      </header>

      {/* Main content area */}
      <main className={styles.main}>
        <section className={styles.activeOptions}>
          <h2>Active Stock Options</h2>
          {/* Replace with dynamic content as needed */}
          <p>Overview of current active stock options available for employees.</p>
        </section>
        <section className={styles.expiredOptions}>
          <h2>Expired/Exercised Options</h2>
          {/* Optionally include historical data or a detailed view */}
          <p>Review the history of expired or exercised stock options here.</p>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2025 Stock Options. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default StockOptionsPage;
