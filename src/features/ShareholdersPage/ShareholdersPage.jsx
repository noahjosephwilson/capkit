import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./ShareholdersPage.module.css";
import Details from "./Details/Details";
import SearchStakeholder from "./SearchStakeholderPage/SearchStakeholderPage";
import StockTransfer from "./StockTransfers/StockTransfers";

const ShareholdersPage = () => {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "details";
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    const tab = searchParams.get("tab") || "details";
    setActiveTab(tab);
  }, [searchParams]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "details":
        return (
          <>
            <Details />
            <SearchStakeholder />
          </>
        );
      case "stockTransfers":
        return (
          <div className={styles.tabSection}>
            <StockTransfer />
          </div>
        );
      case "issueShares":
        return (
          <div className={styles.tabSection}>
            <p>Issue Shares content goes here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.shareholdersPage}>
      <div className={styles.headerSection}>
        <h1 className={styles.pageTitle}>Shareholders</h1>
      </div>

      <div className={styles.miniNavbar}>
        <button
          className={`${styles.tabButton} ${activeTab === "details" ? styles.active : ""}`}
          onClick={() => setActiveTab("details")}
        >
          Shareholder Details
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "stockTransfers" ? styles.active : ""}`}
          onClick={() => setActiveTab("stockTransfers")}
        >
          Stock Transfers
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "issueShares" ? styles.active : ""}`}
          onClick={() => setActiveTab("issueShares")}
        >
          Issue Shares
        </button>
      </div>

      <div className={styles.tabContent}>{renderTabContent()}</div>
    </div>
  );
};

export default ShareholdersPage;
