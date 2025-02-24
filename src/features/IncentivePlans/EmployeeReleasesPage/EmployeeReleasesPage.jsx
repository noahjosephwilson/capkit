"use client";

import React, { useState } from "react";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";
import styles from "./EmployeeReleasesPage.module.css";

const EmployeeReleasesPage = () => {
  const [shareholder, setShareholder] = useState("");
  const [plan, setPlan] = useState("");
  const [vestingDate, setVestingDate] = useState("");
  const [reason, setReason] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [files, setFiles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submission (e.g., API call)
    console.log({ shareholder, plan, vestingDate, reason, agreeTerms, files });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  return (
    <div className={styles.employeeReleasesPage}>
      {/* Header */}
      <header className={styles.employeeReleasesHeader}>
        <div className={styles.headerLeft}>
          <HeaderTitle titleSuffix="Employee Releases" showBack={false} />
        </div>
      </header>

      {/* Form Card */}
      <div className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.releaseForm}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="shareholderSelect">Select Shareholder</label>
              <select
                id="shareholderSelect"
                value={shareholder}
                onChange={(e) => setShareholder(e.target.value)}
                className={styles.formControl}
              >
                <option value="">-- Select Shareholder --</option>
                <option value="shareholder1">Shareholder 1</option>
                <option value="shareholder2">Shareholder 2</option>
                <option value="shareholder3">Shareholder 3</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="planSelect">Select Incentive Plan</label>
              <select
                id="planSelect"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className={styles.formControl}
              >
                <option value="">-- Select Plan --</option>
                <option value="stockOption">Stock Option</option>
                <option value="rsu">RSU</option>
                <option value="rsa">RSA</option>
                <option value="performanceBased">Performance Based</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="vestingDate">
                Vesting Date (Entitlement Revoked)
              </label>
              <input
                type="date"
                id="vestingDate"
                value={vestingDate}
                onChange={(e) => setVestingDate(e.target.value)}
                className={styles.formControl}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="files">Upload Evidence (Images/Documents)</label>
              <input
                type="file"
                id="files"
                onChange={handleFileChange}
                className={styles.formControl}
                multiple
              />
            </div>

            <div className={styles.formGroupFull}>
              <label htmlFor="reason">Reason for Denial</label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className={styles.formControl}
                rows="4"
              ></textarea>
            </div>

            <div className={styles.formGroupFull}>
              <div className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className={styles.checkbox}
                />
                <label htmlFor="agreeTerms" className={styles.checkboxLabel}>
                  I agree to the Terms and Conditions
                </label>
              </div>
            </div>
          </div>

          <div className={styles.buttonRow}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={!agreeTerms}
            >
              Submit Release
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeReleasesPage;
