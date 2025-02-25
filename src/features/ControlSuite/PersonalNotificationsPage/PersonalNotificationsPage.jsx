"use client";

import React from "react";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";
import styles from "./PersonalNotificationsPage.module.css";

const PersonalNotificationsPage = () => {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <HeaderTitle titleSuffix="Personal Notifications" showBack={false} />
        </div>
      </header>
      <div className={styles.content}>
        {/* Future content for personal notifications goes here */}
      </div>
    </div>
  );
};

export default PersonalNotificationsPage;
