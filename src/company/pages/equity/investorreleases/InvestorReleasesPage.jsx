"use client";

import React from "react";
import Breadcrumb from "@/company/components/breadcrumb/Breadcrumb";
import styles from "./InvestorReleasesPage.module.css";

const InvestorReleasesPage = () => {
  // Define the breadcrumb items for this page.
  const breadcrumbItems = [
    { name: "Investor Releases" }
  ];

  return (
    <div className={styles.investorReleases}>
      {/* Render the breadcrumb component */}
      <Breadcrumb
        breadcrumbItems={breadcrumbItems}
        titleSuffix=""
        showBack={true}
      />

      {/* Page header */}
      <header className={styles.header}>
        <h1>Investor Releases</h1>
        <p>
          Stay updated with our latest press releases and investor communications.
        </p>
      </header>

      {/* Main content area */}
      <main className={styles.main}>
        <section className={styles.latestReleases}>
          <h2>Latest Releases</h2>
          {/* Replace the text below with dynamic content as needed */}
          <p>Check out our most recent investor communications and press releases.</p>
        </section>
        <section className={styles.archive}>
          <h2>Archive</h2>
          {/* Optionally, add a component to display archived releases */}
          <p>Browse previous releases for historical details.</p>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2025 Investor Releases. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default InvestorReleasesPage;
