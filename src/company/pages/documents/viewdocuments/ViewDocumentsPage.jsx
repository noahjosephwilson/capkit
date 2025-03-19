"use client";

import React from "react";
import Breadcrumb from "@/company/components/breadcrumb/Breadcrumb";
import styles from "./ViewDocumentsPage.module.css";

const ViewDocumentsPage = () => {
  // Define the breadcrumb items for this page.
  const breadcrumbItems = [
    { name: "View Documents" }
  ];

  // Dummy data for demonstration purposes.
  const documents = [
    { id: 1, title: "Quarterly Report", date: "2025-01-15" },
    { id: 2, title: "Annual Financials", date: "2025-02-20" },
    { id: 3, title: "Press Release", date: "2025-03-01" }
  ];

  return (
    <div className={styles.viewDocuments}>
      {/* Render the breadcrumb component */}
      <Breadcrumb
        breadcrumbItems={breadcrumbItems}
        titleSuffix=""
        showBack={true}
      />

      {/* Page header */}
      <header className={styles.header}>
        <h1>View Documents</h1>
        <p>
          Browse and review your created documents.
        </p>
      </header>

      {/* Main content area */}
      <main className={styles.main}>
        <section className={styles.documentsList}>
          <h2>Documents</h2>
          <table className={styles.documentsTable}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map(doc => (
                <tr key={doc.id}>
                  <td>{doc.title}</td>
                  <td>{doc.date}</td>
                  <td>
                    <button className={styles.viewButton}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2025 View Documents. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ViewDocumentsPage;
