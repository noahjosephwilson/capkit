// ShareholdersPage.jsx
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./ShareholdersPage.css";
import Details from "./Details/Details";
import SearchStakeholder from "./SearchStakeholderPage/SearchStakeholderPage"; // Search component
import AddStakeholder from "./AddStakeholder/AddStakeholder"; // AddStakeholder component
import StockTransfer from "./StockTransfers/StockTransfers"; // StockTransfer component

const ShareholdersPage = () => {
  // Read the "tab" query parameter and also read an optional "id" if present
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "details";
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Update activeTab if query parameter changes
  useEffect(() => {
    const tab = searchParams.get("tab") || "details";
    setActiveTab(tab);
  }, [searchParams]);

  // Conditionally render content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "details":
        return (
          <>
            <Details />
            <SearchStakeholder />
          </>
        );
      case "add":
        return (
          <div className="tab-section">
            <AddStakeholder />
          </div>
        );
      case "edit":
        return (
          <div className="tab-section">
            {/* Pass mode prop so SearchStakeholder knows it's in edit mode */}
            <SearchStakeholder mode="edit" />
          </div>
        );
      case "stockTransfers":
        return (
          <div className="tab-section">
            <StockTransfer />
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
          Details
        </button>
        <button
          className={`tab-button ${activeTab === "add" ? "active" : ""}`}
          onClick={() => setActiveTab("add")}
        >
          Add Stakeholder
        </button>
        <button
          className={`tab-button ${activeTab === "edit" ? "active" : ""}`}
          onClick={() => setActiveTab("edit")}
        >
          Edit Stakeholder
        </button>
        <button
          className={`tab-button ${activeTab === "stockTransfers" ? "active" : ""}`}
          onClick={() => setActiveTab("stockTransfers")}
        >
          Stock Transfers
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};

export default ShareholdersPage;
