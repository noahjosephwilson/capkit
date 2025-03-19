"use client";

import React from "react";
import Breadcrumb from "@/company/components/breadcrumb/Breadcrumb";
import styles from "./ConvertibleNotesPage.module.css";

const ConvertibleNotesPage = () => {
  // Define the breadcrumb items for this page.
  const breadcrumbItems = [
    { name: "Convertible Notes" }
  ];

  return (
    <div className={styles.convertibleNotes}>
      {/* Render the breadcrumb component */}
      <Breadcrumb
        breadcrumbItems={breadcrumbItems}
        titleSuffix=""
        showBack={true}
      />

      {/* Page header */}
      <header className={styles.header}>
        <h1>Convertible Notes</h1>
        <p>
          Manage and review the details of convertible notes offered by the company.
        </p>
      </header>

      {/* Main content area */}
      <main className={styles.main}>
        <section className={styles.activeNotes}>
          <h2>Active Convertible Notes</h2>
          {/* Replace with dynamic content as needed */}
          <p>Overview of current active convertible notes available.</p>
        </section>
        <section className={styles.historySection}>
          <h2>Notes History</h2>
          {/* Optionally include historical data or a detailed view */}
          <p>Review the history of convertible notes transactions here.</p>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2025 Convertible Notes. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ConvertibleNotesPage;
