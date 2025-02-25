"use client";

import React from "react";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";
import styles from "./BillingInfoPage.module.css";

const BillingInfoPage = () => {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <HeaderTitle titleSuffix="Billing Info" showBack={false} />
        </div>
      </header>
      <div className={styles.content}>
        {/* Future content for billing info goes here */}
      </div>
    </div>
  );
};

export default BillingInfoPage;
