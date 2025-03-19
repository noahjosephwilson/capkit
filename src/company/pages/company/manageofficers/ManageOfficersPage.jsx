"use client";

import React from "react";
import Breadcrumb from "@/company/components/breadcrumb/Breadcrumb";
import styles from "./ManageOfficersPage.module.css";

const ManageOfficersPage = () => {
  // Define the breadcrumb items for this page.
  const breadcrumbItems = [
    { name: "Manage Officers" }
  ];

  return (
    <div className={styles.manageOfficers}>
      {/* Render the breadcrumb component */}
      <Breadcrumb
        breadcrumbItems={breadcrumbItems}
        titleSuffix=""
        showBack={true}
      />

      {/* Page header */}
      <header className={styles.header}>
        <h1>Manage Officers</h1>
        <p>
          Review and manage company officers and their roles.
        </p>
      </header>

      {/* Main content area */}
      <main className={styles.main}>
        <section className={styles.currentOfficers}>
          <h2>Current Officers</h2>
          {/* Replace with dynamic content as needed */}
          <p>Overview of current company officers and their responsibilities.</p>
        </section>
        <section className={styles.officerHistory}>
          <h2>Officer History</h2>
          {/* Optionally include historical data or detailed views */}
          <p>Review historical data and changes in officer positions here.</p>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2025 Manage Officers. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ManageOfficersPage;
