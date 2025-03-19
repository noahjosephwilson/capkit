"use client";

import React from "react";
import Breadcrumb from "@/company/components/breadcrumb/Breadcrumb";
import styles from "./CompanyProfilePage.module.css";

const CompanyProfilePage = () => {
  // Define the breadcrumb items for this page.
  const breadcrumbItems = [
    { name: "Company Profile" }
  ];

  return (
    <div className={styles.companyProfile}>
      {/* Render the breadcrumb component */}
      <Breadcrumb
        breadcrumbItems={breadcrumbItems}
        titleSuffix=""
        showBack={true}
      />

      {/* Page header */}
      <header className={styles.header}>
        <h1>Company Profile</h1>
        <p>View and manage your company information, mission, vision, and history.</p>
      </header>

      {/* Main content area */}
      <main className={styles.main}>
        <section className={styles.overviewSection}>
          <h2>Overview</h2>
          <p>Learn about our company, our core values, and our commitment to innovation.</p>
        </section>
        <section className={styles.detailsSection}>
          <h2>Company Details</h2>
          <p>
            Review key details including our founding date, location, leadership team,
            and other essential information.
          </p>
        </section>
        <section className={styles.historySection}>
          <h2>Company History</h2>
          <p>
            Discover the milestones and achievements that have shaped our journey over the years.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2025 Company Profile. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CompanyProfilePage;
