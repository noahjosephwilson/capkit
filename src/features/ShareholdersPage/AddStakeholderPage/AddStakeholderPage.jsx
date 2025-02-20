"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";
import styles from "./AddStakeholderPage.module.css";

const AddStakeholderPage = () => {
  const router = useRouter();
  const backPath = "/company/companyhome/shareholders";

  const [advancedOpen, setAdvancedOpen] = useState(false);
  const toggleAdvanced = () => setAdvancedOpen(!advancedOpen);

  const [formData, setFormData] = useState({
    abbreviation: "",
    title: "",
    description: "",
    votingRights: "no",
    dividendRights: "no",
    minimumInvestment: "",
    lockupPeriod: "",
    transferRestrictions: "",
    vestingSchedule: "",
    conversionTerms: "",
    liquidationPreference: "",
    antiDilutionProtection: "no",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className={styles.addStakeholderPage}>
      <header className={styles.header}>
        <HeaderTitle
          backLinkText="Shareholders"
          titleSuffix="Add Stakeholder"
          backPath={backPath}
          showBack={true}
        />
      </header>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label htmlFor="abbreviation">Stakeholder Abbreviation</label>
            <input
              type="text"
              id="abbreviation"
              name="abbreviation"
              value={formData.abbreviation}
              onChange={handleInputChange}
              className={styles.inputField}
              placeholder="e.g., STK"
              required
            />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="title">Stakeholder Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={styles.inputField}
              placeholder="e.g., John Doe"
              required
            />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="description">Stakeholder Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={styles.textArea}
              placeholder="Enter a description for the stakeholder"
              required
            />
          </div>

          {/* Voting Rights and Dividend Rights displayed side-by-side */}
          <div className={styles.radioGroupContainer}>
            <div className={styles.radioItem}>
              <label className={styles.fieldLabel}>Voting Rights</label>
              <div className={styles.radioGroup}>
                <label>
                  <input
                    type="radio"
                    name="votingRights"
                    value="yes"
                    checked={formData.votingRights === "yes"}
                    onChange={handleInputChange}
                    className={styles.radioButton}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="votingRights"
                    value="no"
                    checked={formData.votingRights === "no"}
                    onChange={handleInputChange}
                    className={styles.radioButton}
                  />
                  No
                </label>
              </div>
            </div>
            <div className={styles.radioItem}>
              <label className={styles.fieldLabel}>Dividend Rights</label>
              <div className={styles.radioGroup}>
                <label>
                  <input
                    type="radio"
                    name="dividendRights"
                    value="yes"
                    checked={formData.dividendRights === "yes"}
                    onChange={handleInputChange}
                    className={styles.radioButton}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="dividendRights"
                    value="no"
                    checked={formData.dividendRights === "no"}
                    onChange={handleInputChange}
                    className={styles.radioButton}
                  />
                  No
                </label>
              </div>
            </div>
          </div>

          {/* Advanced settings toggle */}
          <div className={styles.advancedToggle} onClick={toggleAdvanced}>
            <span className={styles.advancedText}>
              {advancedOpen ? "Basic Settings" : "Advanced Settings"}
            </span>
          </div>

          {advancedOpen && (
            <div className={styles.advancedSection}>
              <div className={styles.fieldGroup}>
                <label htmlFor="minimumInvestment">
                  Minimum Investment (USD)
                </label>
                <input
                  type="number"
                  id="minimumInvestment"
                  name="minimumInvestment"
                  value={formData.minimumInvestment}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="e.g., 1000"
                />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="lockupPeriod">Lockup Period (Months)</label>
                <input
                  type="number"
                  id="lockupPeriod"
                  name="lockupPeriod"
                  value={formData.lockupPeriod}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="e.g., 12"
                />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="transferRestrictions">
                  Transfer Restrictions
                </label>
                <input
                  type="text"
                  id="transferRestrictions"
                  name="transferRestrictions"
                  value={formData.transferRestrictions}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="e.g., No transfers during lockup"
                />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="vestingSchedule">Vesting Schedule</label>
                <input
                  type="text"
                  id="vestingSchedule"
                  name="vestingSchedule"
                  value={formData.vestingSchedule}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="e.g., 4-year vesting with 1-year cliff"
                />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="conversionTerms">Conversion Terms</label>
                <input
                  type="text"
                  id="conversionTerms"
                  name="conversionTerms"
                  value={formData.conversionTerms}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="e.g., automatic conversion on IPO"
                />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="liquidationPreference">
                  Liquidation Preference (% or multiple)
                </label>
                <input
                  type="text"
                  id="liquidationPreference"
                  name="liquidationPreference"
                  value={formData.liquidationPreference}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="e.g., 1x, 2x, or 20%"
                />
              </div>
              <div className={styles.radioItem}>
                <label className={styles.fieldLabel}>
                  Anti-Dilution Protection
                </label>
                <div className={styles.radioGroup}>
                  <label>
                    <input
                      type="radio"
                      name="antiDilutionProtection"
                      value="yes"
                      checked={formData.antiDilutionProtection === "yes"}
                      onChange={handleInputChange}
                      className={styles.radioButton}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="antiDilutionProtection"
                      value="no"
                      checked={formData.antiDilutionProtection === "no"}
                      onChange={handleInputChange}
                      className={styles.radioButton}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
          )}
          <button type="submit" className={styles.submitButton}>
            Add New Stakeholder
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStakeholderPage;
