"use client";

import React from "react";
import Breadcrumb from "@/company/components/breadcrumb/Breadcrumb";
import Table from "@/company/pages/equity/shareholders/components/table/Table"; // Adjust the import path as needed
import ClassTable from "@/company/pages/equity/shareholders/components/classtable/ClassTable"; // Adjust the import path as needed
import styles from "./ShareholdersPage.module.css";

const ShareholdersPage = () => {
  // Single breadcrumb item
  const breadcrumbItems = [{ name: "Shareholders" }];

  return (
    <div className={styles.shareholders}>
      <Breadcrumb breadcrumbItems={breadcrumbItems} titleSuffix="" showBack={true} />

      <main className={styles.main}>
        <Table />
        <ClassTable />
      </main>
    </div>
  );
};

export default ShareholdersPage;
