"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import styles from "./Graph.module.css";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // auto-registers necessary chart components

// Options for the custom dropdown.
const optionsData = [
  { value: "shareClasses", label: "Share Classes" },
  { value: "issuedShares", label: "Issued Shares" },
  { value: "authorizedShares", label: "Authorized Shares" },
];

// A custom dropdown component.
const CustomDropdown = ({ selected, onChange }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => setOpen((prev) => !prev);

  const handleOptionClick = (option) => {
    onChange(option);
    setOpen(false);
  };

  // Close dropdown when clicking outside.
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div className={styles.dropdownHeader} onClick={handleToggle}>
        {optionsData.find((opt) => opt.value === selected).label}
        <span className={styles.arrow}>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <ul className={styles.dropdownList}>
          {optionsData.map((option) => (
            <li
              key={option.value}
              className={styles.dropdownItem}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Graph = ({ data }) => {
  // Expect data as an object with keys: shareClasses, issuedShares, authorizedShares.
  // Each maps to an array of objects: { date, value }.
  const [selectedSeries, setSelectedSeries] = useState("shareClasses");

  // Compute the chart data.
  const chartData = useMemo(() => {
    const seriesData = data[selectedSeries] || [];
    return {
      labels: seriesData.map((point) =>
        new Date(point.date).toLocaleDateString()
      ),
      datasets: [
        {
          data: seriesData.map((point) => point.value),
          fill: false,
          borderColor: "#B500FF",
          backgroundColor: "#B500FF",
          tension: 0, // Zero tension for a straight line.
          borderWidth: 2,
          pointRadius: 0, // Hide points
          pointHoverRadius: 0, // Hide points on hover
        },
      ],
    };
  }, [selectedSeries, data]);

  // Compute suggested y-axis range: 10% beyond the min and max values.
  const computedRange = useMemo(() => {
    const seriesData = data[selectedSeries] || [];
    if (seriesData.length === 0) return {};
    const values = seriesData.map((point) => point.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const margin = (maxValue - minValue) * 0.1;
    return {
      suggestedMin: minValue - margin,
      suggestedMax: maxValue + margin,
    };
  }, [selectedSeries, data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {},
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time/Date",
          font: { size: 14 },
        },
        grid: { display: false },
      },
      y: {
        title: {
          display: true,
          text: "Number",
          font: { size: 14 },
        },
        grid: { color: "rgba(0, 0, 0, 0.1)" },
        ...computedRange, // Automatically extend the y-axis range.
      },
    },
  };

  return (
    <div className={styles.graphContainer}>
      <div className={styles.controls}>
        <CustomDropdown selected={selectedSeries} onChange={setSelectedSeries} />
      </div>
      <div className={styles.chartWrapper}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Graph;
