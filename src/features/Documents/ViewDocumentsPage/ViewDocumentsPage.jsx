"use client";

import React from "react";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";
import styles from "./ViewDocumentsPage.module.css";

const ViewDocumentsPage = () => {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <HeaderTitle titleSuffix="View Documents" showBack={false} />
        </div>
      </header>
      <div className={styles.content}>
        {/* Future content for viewing documents goes here */}
      </div>
    </div>
  );
};

export default ViewDocumentsPage;
