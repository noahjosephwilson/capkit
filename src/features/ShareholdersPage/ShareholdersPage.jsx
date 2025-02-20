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
          <div className={styles.contentSection}>
            <StockTransfer />
          </div>
        );
      case "issueShares":
        return (
          <div className={styles.contentSection}>
            <p>Issue Shares content goes here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.shareholdersContainer}>
      <div className={styles.headerContainer}>
        <h1 className={styles.pageTitle}>Shareholders</h1>
      </div>

      <div className={styles.tabNav}>
        <button
          className={`${styles.navButton} ${activeTab === "details" ? styles.active : ""}`}
          onClick={() => setActiveTab("details")}
        >
          Shareholder Details
        </button>
        <button
          className={`${styles.navButton} ${activeTab === "stockTransfers" ? styles.active : ""}`}
          onClick={() => setActiveTab("stockTransfers")}
        >
          Stock Transfers
        </button>
        <button
          className={`${styles.navButton} ${activeTab === "issueShares" ? styles.active : ""}`}
          onClick={() => setActiveTab("issueShares")}
        >
          Issue Shares
        </button>
      </div>

      <div className={styles.tabContentContainer}>{renderTabContent()}</div>
    </div>
  );
};

export default ShareholdersPage;
