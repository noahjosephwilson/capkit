"use client";

import React from "react";
import Breadcrumb from "@/company/components/breadcrumb/Breadcrumb";
import styles from "./CreateDocumentsPage.module.css";

const CreateDocumentsPage = () => {
  // Define the breadcrumb items for this page.
  const breadcrumbItems = [
    { name: "Create Documents" }
  ];

  return (
    <div className={styles.createDocuments}>
      {/* Render the breadcrumb component */}
      <Breadcrumb
        breadcrumbItems={breadcrumbItems}
        titleSuffix=""
        showBack={true}
      />

      {/* Page header */}
      <header className={styles.header}>
        <h1>Create Documents</h1>
        <p>
          Create and manage your documents seamlessly.
        </p>
      </header>

      {/* Main content area */}
      <main className={styles.main}>
        <section className={styles.documentForm}>
          <h2>New Document</h2>
          <form>
            <div className={styles.formGroup}>
              <label htmlFor="docTitle">Document Title</label>
              <input
                type="text"
                id="docTitle"
                name="docTitle"
                placeholder="Enter document title"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="docContent">Content</label>
              <textarea
                id="docContent"
                name="docContent"
                placeholder="Enter document content"
              ></textarea>
            </div>
            <button type="submit" className={styles.submitButton}>
              Create Document
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2025 Create Documents. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CreateDocumentsPage;
