"use client";

import React from "react";
import Breadcrumb from "@/company/components/breadcrumb/Breadcrumb";
import styles from "./PendingAgreementsPage.module.css";

const PendingAgreementsPage = () => {
  // Define the breadcrumb items for this page.
  const breadcrumbItems = [
    { name: "Pending Agreements" }
  ];

  return (
    <div className={styles.pendingAgreements}>
      {/* Render the breadcrumb component */}
      <Breadcrumb
        breadcrumbItems={breadcrumbItems}
        titleSuffix=""
        showBack={true}
      />

      {/* Page header */}
      <header className={styles.header}>
        <h1>Pending Agreements</h1>
        <p>
          Review and manage pending agreements awaiting approval.
        </p>
      </header>

      {/* Main content area */}
      <main className={styles.main}>
        <section className={styles.pendingList}>
          <h2>Agreements Under Review</h2>
          {/* Replace the text below with dynamic content as needed */}
          <p>No pending agreements at this time.</p>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2025 Pending Agreements. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PendingAgreementsPage;
