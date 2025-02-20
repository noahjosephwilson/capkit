"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import HeaderTitle from "../../components/HeaderTitle/HeaderTitle";
import styles from "./ShareholdersPage.module.css";
import ShareholderDetailsPage from "./StakeholderDetailsPage/StakeholderDetailsPage";
import SearchStakeholder from "./SearchStakeholderPage/SearchStakeholderPage";
import StockTransfer from "./StockTransfers/StockTransfers";
import IssueSharesPage from "./IssueSharesPage/IssueSharesPage";

const ShareholdersPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const defaultTab = searchParams.get("tab") || "details";
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    const tab = searchParams.get("tab") || "details";
    setActiveTab(tab);
  }, [searchParams]);

  const handleAddStakeholder = () => {
    // Adjust the route as necessary
    router.push("/company/companyhome/shareholders/addstakeholder");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "details":
        return (
          <>
            <ShareholderDetailsPage />
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
            <IssueSharesPage />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.shareholdersContainer}>
      <div className={styles.headerContainer}>
        <HeaderTitle titleSuffix="Shareholders" showBack={false} />
        <button 
          className={styles.addStakeholderButton} 
          onClick={handleAddStakeholder}
        >
          + Add Stakeholder
        </button>
      </div>

      <div className={styles.tabNav}>
        <button
          className={`${styles.navButton} ${activeTab === "details" ? styles.active : ""}`}
          onClick={() => setActiveTab("details")}
        >
          Stakeholder Details
        </button>
        <button
          className={`${styles.navButton} ${activeTab === "stockTransfers" ? styles.active : ""} ${styles.leftShift}`}
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
