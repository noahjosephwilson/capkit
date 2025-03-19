"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./OtherActions.module.css";

const OtherActions = () => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // Toggle the dropdown menu
  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  // Close the dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Click handlers for each menu item (replace with your own logic)
  const handleStockSplit = () => {
    console.log("Stock split clicked");
    setOpen(false);
  };
  const handleRepurchase = () => {
    console.log("Repurchase clicked");
    setOpen(false);
  };
  const handleConvert = () => {
    console.log("Convert clicked");
    setOpen(false);
  };
  const handleDownloadPDF = () => {
    console.log("Download shareholders PDF clicked");
    setOpen(false);
  };
  const handleDownloadCSV = () => {
    console.log("Download shareholders CSV clicked");
    setOpen(false);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <button className={styles.actionsButton} onClick={handleToggle}>
        Other Actions
        <span className={styles.arrow}>▼</span>
      </button>

      {open && (
        <div className={styles.menu}>
          <div className={styles.menuItem} onClick={handleStockSplit}>
            Share Split
          </div>
          <div className={styles.menuItem} onClick={handleRepurchase}>
            Repurchase
          </div>
          <div className={styles.menuItem} onClick={handleConvert}>
            Convert
          </div>
        </div>
      )}
    </div>
  );
};

export default OtherActions;
