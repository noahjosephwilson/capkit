"use client";

import React from "react";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";
import styles from "./PendingAgreementsPage.module.css";

const PendingAgreementsPage = () => {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <HeaderTitle titleSuffix="Pending Agreements" showBack={false} />
        </div>
      </header>
      <div className={styles.content}>
        {/* Future content for pending agreements goes here */}
      </div>
    </div>
  );
};

export default PendingAgreementsPage;
