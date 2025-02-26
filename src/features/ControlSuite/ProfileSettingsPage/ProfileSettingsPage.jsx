import React, { useState } from "react";
import "./ProfileSettingsPage.css";
// Import the GeneralAccountPage component from its folder
import GeneralAccountPage from "./GeneralAccountPage/GeneralAccountPage";

const ProfileSettingsPage = () => {
  // Set the default active tab to "generalAccount"
  const [activeTab, setActiveTab] = useState("generalAccount");

  // Render content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "generalAccount":
        return <GeneralAccountPage />;
      case "myCompanies":
        return <div>My Companies Content</div>;
      case "additionalInformation":
        return <div>Additional Information Content</div>;
      case "personalBilling":
        return <div>Personal Billing Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="profile-settings-page">
      {/* Header Section */}
      <div className="header-section">
        <h1 className="page-title">Profile Settings</h1>
      </div>

      {/* Mini Navbar */}
      <div className="mini-navbar">
        <button
          className={`tab-button ${activeTab === "generalAccount" ? "active" : ""}`}
          onClick={() => setActiveTab("generalAccount")}
        >
          General Account
        </button>
        <button
          className={`tab-button ${activeTab === "myCompanies" ? "active" : ""}`}
          onClick={() => setActiveTab("myCompanies")}
        >
          My Companies
        </button>
        <button
          className={`tab-button ${activeTab === "additionalInformation" ? "active" : ""}`}
          onClick={() => setActiveTab("additionalInformation")}
        >
          Additional Information
        </button>
        <button
          className={`tab-button ${activeTab === "personalBilling" ? "active" : ""}`}
          onClick={() => setActiveTab("personalBilling")}
        >
          Personal Billing
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};

export default ProfileSettingsPage;
