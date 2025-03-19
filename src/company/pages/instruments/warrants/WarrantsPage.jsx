"use client";

import React from "react";
import Breadcrumb from "@/company/components/breadcrumb/Breadcrumb";
import styles from "./WarrantsPage.module.css";

const WarrantsPage = () => {
  // Define the breadcrumb items for this page.
  const breadcrumbItems = [
    { name: "Warrants" }
  ];

  return (
    <div className={styles.warrants}>
      {/* Render the breadcrumb component */}
      <Breadcrumb
        breadcrumbItems={breadcrumbItems}
        titleSuffix=""
        showBack={true}
      />

      {/* Page header */}
      <header className={styles.header}>
        <h1>Warrants</h1>
        <p>
          Manage and review the company's warrant offerings and related transactions.
        </p>
      </header>

      {/* Main content area */}
      <main className={styles.main}>
        <section className={styles.activeWarrants}>
          <h2>Active Warrants</h2>
          {/* Replace the text below with dynamic content as needed */}
          <p>Overview of active warrants available for exercise.</p>
        </section>
        <section className={styles.historySection}>
          <h2>Warrant History</h2>
          {/* Optionally include historical data or detailed warrant transactions */}
          <p>Review the history of warrant issuances and exercises here.</p>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2025 Warrants. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WarrantsPage;
