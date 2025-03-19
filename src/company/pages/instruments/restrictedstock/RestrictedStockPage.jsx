"use client";

import React from "react";
import Breadcrumb from "@/company/components/breadcrumb/Breadcrumb";
import styles from "./RestrictedStockPage.module.css";

const RestrictedStockPage = () => {
  // Define the breadcrumb items for this page.
  const breadcrumbItems = [
    { name: "Restricted Stock" }
  ];

  return (
    <div className={styles.restrictedStock}>
      {/* Render the breadcrumb component */}
      <Breadcrumb
        breadcrumbItems={breadcrumbItems}
        titleSuffix=""
        showBack={true}
      />

      {/* Page header */}
      <header className={styles.header}>
        <h1>Restricted Stock</h1>
        <p>
          Manage and review the company's restricted stock programs and related transactions.
        </p>
      </header>

      {/* Main content area */}
      <main className={styles.main}>
        <section className={styles.activeRestrictedStock}>
          <h2>Active Restricted Stock</h2>
          {/* Replace with dynamic content as needed */}
          <p>Overview of active restricted stock awards and vesting schedules.</p>
        </section>
        <section className={styles.historySection}>
          <h2>Restricted Stock History</h2>
          {/* Optionally include historical data or detailed views */}
          <p>Review historical data of restricted stock grants and exercises here.</p>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2025 Restricted Stock. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default RestrictedStockPage;
