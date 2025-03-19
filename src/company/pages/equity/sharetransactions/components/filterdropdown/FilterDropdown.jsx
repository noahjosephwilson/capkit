"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./FilterDropdown.module.css";

const FilterDropdown = ({ defaultValue, options, onChange }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const containerRef = useRef(null);

  // Toggle the dropdown menu
  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  // Handle selection of an option
  const handleOptionClick = (option) => {
    setSelected(option);
    onChange(option);
    setOpen(false);
  };

  // Close the dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <button className={styles.dropdownButton} onClick={handleToggle}>
        {selected}
        <span className={styles.arrow}>▼</span>
      </button>
      {open && (
        <div className={styles.menu}>
          {options.map((option, index) => (
            <div
              key={index}
              className={styles.menuItem}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
