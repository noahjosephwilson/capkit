"use client";

import React from "react";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";
import styles from "./ManageOfficersPage.module.css";

const ManageOfficersPage = () => {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <HeaderTitle titleSuffix="Manage Officers" showBack={false} />
        </div>
      </header>
      <div className={styles.content}>
        {/* Future content for managing officers goes here */}
      </div>
    </div>
  );
};

export default ManageOfficersPage;
