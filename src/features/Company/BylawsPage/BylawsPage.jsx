"use client";

import React from "react";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";
import styles from "./BylawsPage.module.css";

const BylawsPage = () => {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <HeaderTitle titleSuffix="Bylaws" showBack={false} />
        </div>
      </header>
      <div className={styles.content}>
        {/* Future content for bylaws goes here */}
      </div>
    </div>
  );
};

export default BylawsPage;
