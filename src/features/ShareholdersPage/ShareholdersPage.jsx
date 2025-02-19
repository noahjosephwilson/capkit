// ShareholdersPage.jsx
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Next.js hook
import "./ShareholdersPage.css";
import Details from "./Details/Details";
import SearchStakeholder from "./SearchStakeholderPage/SearchStakeholderPage"; // Search component
import StockTransfer from "./StockTransfers/StockTransfers"; // StockTransfer component

const ShareholdersPage = () => {
  // Read the "tab" query parameter; default to "details"
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "details";
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    const tab = searchParams.get("tab") || "details";
    setActiveTab(tab);
  }, [searchParams]);

  // Render content based on active tab
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
          <div className="tab-section">
            <StockTransfer />
          </div>
        );
      case "issueShares":
        return (
          <div className="tab-section">
            {/* Replace this placeholder with your IssueShares component */}
            <p>Issue Shares content goes here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="shareholders-page">
      {/* Header Section */}
      <div className="header-section">
        <h1 className="page-title">Shareholders</h1>
      </div>

      {/* Mini Navbar */}
      <div className="mini-navbar">
        <button
          className={`tab-button ${activeTab === "details" ? "active" : ""}`}
          onClick={() => setActiveTab("details")}
        >
          Investor Details
        </button>
        <button
          className={`tab-button ${activeTab === "stockTransfers" ? "active" : ""}`}
          onClick={() => setActiveTab("stockTransfers")}
        >
          Stock Transfers
        </button>
        <button
          className={`tab-button ${activeTab === "issueShares" ? "active" : ""}`}
          onClick={() => setActiveTab("issueShares")}
        >
          Issue Shares
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};

export default ShareholdersPage;
