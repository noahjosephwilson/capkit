"use client";

import React from "react";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";
import styles from "./ConvertEntityPage.module.css";

const ConvertEntityPage = () => {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <HeaderTitle titleSuffix="Convert Entity" showBack={false} />
        </div>
      </header>
      <div className={styles.content}>
        {/* Future content for converting entity goes here */}
      </div>
    </div>
  );
};

export default ConvertEntityPage;
