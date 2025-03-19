"use client";

import React from "react";
import Breadcrumb from "@/company/components/breadcrumb/Breadcrumb";
import styles from "./PerformanceStockPage.module.css";

const PerformanceStockPage = () => {
  // Define the breadcrumb items for this page.
  const breadcrumbItems = [
    { name: "Performance Stock" }
  ];

  return (
    <div className={styles.performanceStock}>
      {/* Render the breadcrumb component */}
      <Breadcrumb
        breadcrumbItems={breadcrumbItems}
        titleSuffix=""
        showBack={true}
      />

      {/* Page header */}
      <header className={styles.header}>
        <h1>Performance Stock</h1>
        <p>
          Analyze and review performance metrics for our stock holdings.
        </p>
      </header>

      {/* Main content area */}
      <main className={styles.main}>
        <section className={styles.overviewSection}>
          <h2>Performance Overview</h2>
          {/* Replace with dynamic content as needed */}
          <p>Overview of current performance metrics and stock trends.</p>
        </section>
        <section className={styles.metricsSection}>
          <h2>Detailed Metrics</h2>
          {/* Optionally include charts, tables, or interactive elements */}
          <p>Detailed analysis and historical performance data for our stocks.</p>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2025 Performance Stock. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PerformanceStockPage;
