"use client";

import React from "react";
import Breadcrumb from "@/company/components/breadcrumb/Breadcrumb";
import styles from "./SAFEPage.module.css";

const SAFEPage = () => {
  // Define the breadcrumb items for this page.
  const breadcrumbItems = [
    { name: "SAFE" }
  ];

  return (
    <div className={styles.safePage}>
      {/* Render the breadcrumb component */}
      <Breadcrumb
        breadcrumbItems={breadcrumbItems}
        titleSuffix=""
        showBack={true}
      />

      {/* Page header */}
      <header className={styles.header}>
        <h1>SAFE Agreements</h1>
        <p>
          Manage and review the company's SAFE (Simple Agreement for Future Equity) agreements.
        </p>
      </header>

      {/* Main content area */}
      <main className={styles.main}>
        <section className={styles.activeAgreements}>
          <h2>Active SAFE Agreements</h2>
          {/* Replace with dynamic content as needed */}
          <p>Overview of current SAFE agreements in effect.</p>
        </section>
        <section className={styles.historySection}>
          <h2>SAFE History</h2>
          {/* Optionally include historical data or detailed views */}
          <p>Review the historical data and past transactions involving SAFE agreements here.</p>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2025 SAFE Agreements. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SAFEPage;
