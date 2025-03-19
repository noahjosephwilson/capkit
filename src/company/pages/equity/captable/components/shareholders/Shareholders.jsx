"use client";

import React from "react";
import styles from "./Shareholders.module.css";

const Shareholders = ({
  totalSecurities = 495,
  stakeholderName = "Noah Wilson",
  stakeholderCount = 200,
}) => {
  // Calculate percentage based on passed or default values
  const percentage = (stakeholderCount / totalSecurities) * 100;

  return (
    <div className={styles.shareholdersCard}>
      <div className={styles.header}>
        <h2 className={styles.title}>Top stakeholders</h2>
        <div className={styles.dropdown}>Top 10 Stakeholders</div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.contentRow}>
        <div className={styles.pieChartContainer}>
          <div
            className={styles.pieChart}
            style={{
              background: `conic-gradient(
                #ff6b9a 0% ${percentage}%,
                #eceff1 ${percentage}% 100%
              )`,
            }}
          />
        </div>

        <div className={styles.infoContainer}>
          <span className={styles.percentage}>{percentage.toFixed(1)}%</span>
          <div className={styles.barContainer}>
            <div
              className={styles.barFill}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className={styles.stakeholderName}>{stakeholderName}</div>
          <div className={styles.stakeholderCount}>
            {stakeholderCount} securities
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shareholders;
