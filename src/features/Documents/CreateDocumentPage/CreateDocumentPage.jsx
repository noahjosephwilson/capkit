"use client";

import React from "react";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";
import styles from "./CreateDocumentPage.module.css";

const CreateDocumentPage = () => {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <HeaderTitle titleSuffix="Create Documents" showBack={false} />
        </div>
      </header>
      <div className={styles.content}>
        {/* Future content for creating documents goes here */}
      </div>
    </div>
  );
};

export default CreateDocumentPage;
