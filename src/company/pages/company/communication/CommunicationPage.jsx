"use client";

import React from "react";
import Breadcrumb from "@/company/components/breadcrumb/Breadcrumb";
import styles from "./CommunicationPage.module.css";

const CommunicationPage = () => {
  // Define the breadcrumb items for this page.
  const breadcrumbItems = [
    { name: "Communication" }
  ];

  return (
    <div className={styles.communicationPage}>
      {/* Render the breadcrumb component */}
      <Breadcrumb
        breadcrumbItems={breadcrumbItems}
        titleSuffix=""
        showBack={true}
      />

      {/* Page header */}
      <header className={styles.header}>
        <h1>Communication</h1>
        <p>
          Stay connected with the latest updates and internal messages.
        </p>
      </header>

      {/* Main content area */}
      <main className={styles.main}>
        <section className={styles.latestCommunications}>
          <h2>Latest Communications</h2>
          {/* Replace with dynamic content as needed */}
          <p>Review the most recent internal announcements and updates.</p>
        </section>
        <section className={styles.communicationHistory}>
          <h2>Communication History</h2>
          {/* Optionally include historical data or archived messages */}
          <p>Browse through past communications and archived messages here.</p>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2025 Communication. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CommunicationPage;
