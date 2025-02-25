"use client";

import React from "react";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";
import styles from "./ExecutiveBoardPage.module.css";

const ExecutiveBoardPage = () => {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <HeaderTitle titleSuffix="Executive Board" showBack={false} />
        </div>
      </header>
      <div className={styles.content}>
        {/* Future content for executive board goes here */}
      </div>
    </div>
  );
};

export default ExecutiveBoardPage;
