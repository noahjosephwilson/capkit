"use client";

import React from "react";
import Breadcrumb from "@/company/components/breadcrumb/Breadcrumb";
import DiluteToggle from "@/company/pages/equity/captable/components/dilutetoggle/DiluteToggle";
import Stats from "@/company/pages/equity/captable/components/stats/Stats";
import Securities from "@/company/pages/equity/captable/components/securities/Securities";
import Shareholders from "@/company/pages/equity/captable/components/shareholders/Shareholders";
import Table from "@/company/pages/equity/captable/components/table/Table"; // Adjust the path as necessary
import styles from "./CapTablePage.module.css";

// Dummy data for reference (not rendered)
const dummyData = [
  {
    id: "1",
    firstName: "Alice",
    lastName: "Smith",
    role: "CEO",
    commonStockTransactions: [{ shares: 100 }],
    preferredStockTransactions: [{ shares: 50 }],
    image: "https://via.placeholder.com/40",
  },
  {
    id: "2",
    firstName: "Bob",
    lastName: "Johnson",
    role: "CFO",
    commonStockTransactions: [{ shares: 200 }],
    preferredStockTransactions: [{ shares: 20 }],
    image: "https://via.placeholder.com/40",
  },
];

const CapTablePage = () => {
  const breadcrumbItems = [{ name: "Cap Table" }];

  const statsValues = {
    stakeholders: "1",
    totalShares: "200",
    totalSecurities: "495",
    stockPrice: "-",
  };

  return (
    <div className={styles.capTablePage}>
      <div className={styles.breadcrumbRow}>
        <Breadcrumb
          breadcrumbItems={breadcrumbItems}
          titleSuffix=""
          showBack={false}
        />
        <DiluteToggle onToggle={(newState) => console.log("Dilute mode:", newState)} />
      </div>

      <Stats values={statsValues} />

      {/* Container row for Securities (left) and Shareholders (right) */}
      <div className={styles.graphsRow}>
        <div className={styles.graphCard}>
          <Securities />
        </div>
        <div className={styles.graphCard}>
          <Shareholders />
        </div>
      </div>

      {/* Bold Title above the Table component */}
      <h2 className={styles.tableTitle}>Cap Table</h2>

      {/* New Table component placed under the two graphs */}
      <div className={styles.tableContainer}>
        <Table />
      </div>
    </div>
  );
};

export default CapTablePage;
