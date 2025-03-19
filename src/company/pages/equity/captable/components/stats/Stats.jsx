"use client";

import React from 'react';
import styles from './Stats.module.css';
import { FiUsers, FiBarChart2, FiLayers, FiDollarSign } from 'react-icons/fi';

const Stats = ({ values }) => {
  return (
    <div className={styles.statsContainer}>
      <div className={styles.statCard}>
        <div className={styles.statContent}>
          <FiUsers className={styles.icon} />
          <div className={styles.details}>
            <div className={styles.value}>{values.stakeholders}</div>
            <div className={styles.label}>
              Stakeholders
              <div className={styles.infoIcon}>
                i
                <span className={styles.tooltip}>Total number of stakeholders</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statContent}>
          <FiBarChart2 className={styles.icon} />
          <div className={styles.details}>
            <div className={styles.value}>{values.totalShares}</div>
            <div className={styles.label}>
              Total Shares
              <div className={styles.infoIcon}>
                i
                <span className={styles.tooltip}>Total issued shares</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statContent}>
          <FiLayers className={styles.icon} />
          <div className={styles.details}>
            <div className={styles.value}>{values.totalSecurities}</div>
            <div className={styles.label}>
              Total Securities
              <div className={styles.infoIcon}>
                i
                <span className={styles.tooltip}>
                  Total count of securities (shares, options, etc.)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statContent}>
          <FiDollarSign className={styles.icon} />
          <div className={styles.details}>
            <div className={styles.value}>{values.stockPrice}</div>
            <div className={styles.label}>
              Stock Price
              <div className={styles.infoIcon}>
                i
                <span className={styles.tooltip}>Current stock price</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;