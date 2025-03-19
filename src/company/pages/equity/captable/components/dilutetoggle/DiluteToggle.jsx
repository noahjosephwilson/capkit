"use client";

import React, { useState } from 'react';
import styles from './DiluteToggle.module.css';

const DiluteToggle = ({ onToggle }) => {
  // Default is undiluted (false); when true, it means "Fully Diluted"
  const [isDiluted, setIsDiluted] = useState(false);

  const handleToggle = () => {
    setIsDiluted(prevState => {
      const newState = !prevState;
      if (onToggle) onToggle(newState);
      return newState;
    });
  };

  return (
    <div className={styles.toggleWrapper}>
      <span className={styles.leftChoice}>Undiluted</span>
      <div
        className={`${styles.toggleContainer} ${isDiluted ? styles.active : ''}`}
        onClick={handleToggle}
      >
        <div className={`${styles.slider} ${isDiluted ? styles.fullyDiluted : styles.undiluted}`} />
      </div>
      <span className={styles.rightChoice}>Fully Diluted</span>
    </div>
  );
};

export default DiluteToggle;
