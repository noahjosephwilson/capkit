"use client";

import React from "react";
import Breadcrumb from "@/company/components/breadcrumb/Breadcrumb";
import Stats from "@/company/pages/equity/sharetransactions/components/stats/Stats";
import Graph from "@/company/pages/equity/sharetransactions/components/graph/Graph";
import OtherActions from "@/company/pages/equity/sharetransactions/components/otheractions/OtherActions";
import FilterDropdown from "@/company/pages/equity/sharetransactions/components/filterdropdown/FilterDropdown";
import styles from "./ShareTransactionsPage.module.css";

const ShareTransactionsPage = () => {
  const breadcrumbItems = [{ name: "Share Transactions" }];

  const statsData = {
    shareClasses: { label: "Share Classes", value: 1500, change: 50 },
    issuedShares: { label: "Issued Shares", value: 10000, change: -120 },
    authorizedShares: { label: "Authorized Shares", value: 12000, change: 0 },
  };

  const defaultFilter = "7 Days";
  const filterOptions = ["7 Days", "30 Days", "60 Days", "90 Days"];

  const handleFilterChange = (selectedOption) => {
    console.log("Selected filter:", selectedOption);
    // Add your filter logic here
  };

  // Dummy graph data: each series is an array of { date, value }
  const graphData = {
    shareClasses: [
      { date: "2025-03-01", value: 10 },
      { date: "2025-03-10", value: 12 },
      { date: "2025-03-18", value: 15 },
    ],
    issuedShares: [
      { date: "2025-03-01", value: 1000 },
      { date: "2025-03-10", value: 980 },
      { date: "2025-03-18", value: 10000 },
    ],
    authorizedShares: [
      { date: "2025-03-01", value: 1200 },
      { date: "2025-03-10", value: 1500 },
      { date: "2025-03-18", value: 12000 },
    ],
  };

  return (
    <div className={styles.shareTransactions}>
      <Breadcrumb
        breadcrumbItems={breadcrumbItems}
        titleSuffix=""
        showBack={true}
      />

      <div className={styles.filterAndActions}>
        <FilterDropdown
          defaultValue={defaultFilter}
          options={filterOptions}
          onChange={handleFilterChange}
        />
        <div className={styles.actionButtons}>
          <button className={styles.button}>Issue Shares</button>
          <button className={styles.button}>Transfer Shares</button>
          <OtherActions />
        </div>
      </div>

      <Stats data={statsData} />

      <div className={styles.graphSection}>
        <Graph data={graphData} />
      </div>
    </div>
  );
};

export default ShareTransactionsPage;
