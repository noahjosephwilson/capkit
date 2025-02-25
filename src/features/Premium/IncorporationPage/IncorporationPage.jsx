"use client";

import React from "react";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";
import styles from "./IncorporationPage.module.css";

const IncorporationPage = () => {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <HeaderTitle titleSuffix="Incorporation" showBack={false} />
        </div>
      </header>
      <div className={styles.content}>
        {/* Future content for incorporation goes here */}
      </div>
    </div>
  );
};

export default IncorporationPage;
