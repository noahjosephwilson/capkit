"use client";

import React from "react";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";
import styles from "./CompanyProfilePage.module.css";

const CompanyProfilePage = () => {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <HeaderTitle titleSuffix="Company Profile" showBack={false} />
        </div>
      </header>
      <div className={styles.content}>
        {/* Future content for company profile goes here */}
      </div>
    </div>
  );
};

export default CompanyProfilePage;
