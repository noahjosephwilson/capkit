"use client";

import React from "react";
import Breadcrumb from "@/company/components/breadcrumb/Breadcrumb";
import styles from "./ExerciseRequestsPage.module.css";

const ExerciseRequestsPage = () => {
  // Define the breadcrumb items for this page.
  const breadcrumbItems = [
    { name: "Exercise Requests" }
  ];

  return (
    <div className={styles.exerciseRequests}>
      {/* Render the breadcrumb component */}
      <Breadcrumb
        breadcrumbItems={breadcrumbItems}
        titleSuffix=""
        showBack={true}
      />

      {/* Page header */}
      <header className={styles.header}>
        <h1>Exercise Requests</h1>
        <p>
          Manage and review employee exercise requests.
        </p>
      </header>

      {/* Main content area */}
      <main className={styles.main}>
        <section className={styles.requestsSection}>
          <h2>Pending Requests</h2>
          {/* Here you can render a list or table of pending requests */}
          <p>No pending requests at this time.</p>
        </section>
        <section className={styles.historySection}>
          <h2>Request History</h2>
          {/* Optionally, add a component to display historical request data */}
          <p>Review past exercise requests here.</p>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2025 Exercise Requests. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ExerciseRequestsPage;
