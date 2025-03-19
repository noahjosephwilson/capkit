"use client";

import React from "react";
import styles from "./Stats.module.css";

// ChangeIndicator displays the absolute change with a larger, bold style.
const ChangeIndicator = ({ change }) => {
  const isPositive = change > 0;
  const isNegative = change < 0;
  const arrow = isPositive ? "▲" : isNegative ? "▼" : "";
  const changeClass = isPositive
    ? styles.positive
    : isNegative
    ? styles.negative
    : styles.neutral;

  return (
    <div className={`${styles.changeIndicator} ${changeClass}`}>
      {arrow} {Math.abs(change).toLocaleString()}
    </div>
  );
};

const Stats = ({ data }) => {
  // Convert the data object into an array for mapping
  const statsArray = Object.keys(data).map((key) => ({
    key,
    ...data[key],
  }));

  return (
    <div className={styles.statsContainer}>
      {statsArray.map((stat) => (
        <div key={stat.key} className={styles.statCard}>
          <div className={styles.cardHeader}>
            <span className={styles.statTitle}>{stat.label}</span>
            <ChangeIndicator change={stat.change} />
          </div>
          <div className={styles.statValue}>{stat.value.toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
