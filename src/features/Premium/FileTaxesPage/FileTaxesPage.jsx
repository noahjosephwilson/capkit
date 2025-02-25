"use client";

import React from "react";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";
import styles from "./FileTaxesPage.module.css";

const FileTaxesPage = () => {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <HeaderTitle titleSuffix="File Taxes" showBack={false} />
        </div>
      </header>
      <div className={styles.content}>
        {/* Future content for filing taxes goes here */}
      </div>
    </div>
  );
};

export default FileTaxesPage;
