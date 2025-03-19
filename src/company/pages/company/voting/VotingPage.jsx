"use client";

import React from "react";
import Breadcrumb from "@/company/components/breadcrumb/Breadcrumb";
import styles from "./VotingPage.module.css";

const VotingPage = () => {
  // Define the breadcrumb items for this page.
  const breadcrumbItems = [
    { name: "Voting" }
  ];

  return (
    <div className={styles.votingPage}>
      {/* Render the breadcrumb component */}
      <Breadcrumb
        breadcrumbItems={breadcrumbItems}
        titleSuffix=""
        showBack={true}
      />

      {/* Page header */}
      <header className={styles.header}>
        <h1>Voting</h1>
        <p>
          Participate in and review the latest voting sessions and proposals.
        </p>
      </header>

      {/* Main content area */}
      <main className={styles.main}>
        <section className={styles.activeVotes}>
          <h2>Active Votes</h2>
          {/* Replace with dynamic content as needed */}
          <p>Cast your vote and view currently active voting sessions.</p>
        </section>
        <section className={styles.voteHistory}>
          <h2>Voting History</h2>
          {/* Optionally include historical voting data or proposal results */}
          <p>Review past voting sessions and proposal outcomes here.</p>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2025 Voting. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default VotingPage;
