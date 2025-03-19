"use client";

import React from "react";
import Breadcrumb from "@/company/components/breadcrumb/Breadcrumb";
import styles from "./DashboardPage.module.css";

const DashboardPage = () => {
  // Define the breadcrumb items for this page.
  const breadcrumbItems = [
    { name: "Dashboard" }
  ];

  return (
    <div className={styles.dashboard}>
      {/* Render the breadcrumb component */}
      <Breadcrumb
        breadcrumbItems={breadcrumbItems}
        titleSuffix=""
        showBack={false}
      />

      {/* Page content */}
      <header className={styles.header}>
        <p>
          Welcome to the dashboard. This page is fully self-contained and uses a custom layout.
        </p>
      </header>
      <main className={styles.main}>
        <p>
          Here you can view performance metrics, manage data, and monitor recent activities.
        </p>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2025 Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DashboardPage;
