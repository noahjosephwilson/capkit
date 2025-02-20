"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./HeaderTitle.module.css";

const HeaderTitle = ({ backLinkText, titleSuffix, backPath, showBack = false, onBack }) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backPath) {
      router.push(backPath);
    } else {
      router.back();
    }
  };

  return (
    <div className={styles.breadcrumb}>
      {showBack && (
        <span className={styles.backLink} onClick={handleBack}>
          {backLinkText}
        </span>
      )}
      {showBack && <span className={styles.separator}>→</span>}
      <span className={styles.titleSuffix}>{titleSuffix}</span>
    </div>
  );
};

export default HeaderTitle;
