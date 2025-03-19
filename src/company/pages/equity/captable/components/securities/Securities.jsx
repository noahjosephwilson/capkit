"use client";

import React from "react";
import styles from "./Securities.module.css";

const Securities = ({
  totalSecurities = 495,
  commonSharesCount = 200,
  unissuedOptionsCount = 295,
}) => {
  // Calculate percentages based on passed in or default values
  const commonSharesPercent = (commonSharesCount / totalSecurities) * 100;
  const unissuedOptionsPercent = (unissuedOptionsCount / totalSecurities) * 100;

  return (
    <div className={styles.securitiesCard}>
      <h2 className={styles.title}>Total securities</h2>

      <div className={styles.contentRow}>
        {/* Pie Chart */}
        <div className={styles.pieChartContainer}>
          <div
            className={styles.pieChart}
            style={{
              background: `conic-gradient(
                #ff6b9a 0% ${commonSharesPercent}%,
                #dfff7f ${commonSharesPercent}% 100%
              )`,
            }}
          />
        </div>

        {/* Breakdown */}
        <div className={styles.breakdown}>
          {/* Common Shares */}
          <div className={styles.breakdownRow}>
            <div className={styles.labelRow}>
              <span className={styles.percentage}>
                {commonSharesPercent.toFixed(1)}%
              </span>
              <span className={styles.label}>
                Common shares
                <span className={styles.securityCount}>
                  {commonSharesCount} securities
                </span>
              </span>
            </div>
            <div className={styles.barContainer}>
              <div
                className={styles.barFill}
                style={{
                  width: `${commonSharesPercent}%`,
                  backgroundColor: "#ff6b9a",
                }}
              />
            </div>
          </div>

          {/* Unissued Options */}
          <div className={styles.breakdownRow}>
            <div className={styles.labelRow}>
              <span className={styles.percentage}>
                {unissuedOptionsPercent.toFixed(2)}%
              </span>
              <span className={styles.label}>
                Unissued options
                <span className={styles.securityCount}>
                  {unissuedOptionsCount} securities
                </span>
              </span>
            </div>
            <div className={styles.barContainer}>
              <div
                className={styles.barFill}
                style={{
                  width: `${unissuedOptionsPercent}%`,
                  backgroundColor: "#dfff7f",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Securities;
