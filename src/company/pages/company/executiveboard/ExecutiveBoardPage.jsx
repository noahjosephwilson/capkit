"use client";

import React from "react";
import Breadcrumb from "@/company/components/breadcrumb/Breadcrumb";
import styles from "./ExecutiveBoardPage.module.css";

const ExecutiveBoardPage = () => {
  // Define the breadcrumb items for this page.
  const breadcrumbItems = [
    { name: "Executive Board" }
  ];

  return (
    <div className={styles.executiveBoard}>
      {/* Render the breadcrumb component */}
      <Breadcrumb
        breadcrumbItems={breadcrumbItems}
        titleSuffix=""
        showBack={true}
      />

      {/* Page header */}
      <header className={styles.header}>
        <h1>Executive Board</h1>
        <p>
          Review and manage the details of the company's executive board.
        </p>
      </header>

      {/* Main content area */}
      <main className={styles.main}>
        <section className={styles.boardMembers}>
          <h2>Board Members</h2>
          <p>
            Overview of the current executive board members and their roles.
          </p>
        </section>
        <section className={styles.historySection}>
          <h2>Board History</h2>
          <p>
            Discover historical data about the board's composition and changes over time.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2025 Executive Board. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ExecutiveBoardPage;
