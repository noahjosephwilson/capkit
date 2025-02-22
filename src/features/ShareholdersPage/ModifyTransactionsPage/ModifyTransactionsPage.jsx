"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";
import styles from "./ModifyTransactionsPage.module.css";

const ModifyTransactionsPage = () => {
  const router = useRouter();
  const backPath = "/company/companyhome/shareholders";

  const [formData, setFormData] = useState({
    transactionNumber: "",
    shareClass: "",
    shareNumber: "",
    amountPaid: "",
    amountToPay: "",
    transactionDate: "",
  });

  // Example transaction number options
  const transactionNumbers = [
    { value: "", label: "Select Transaction Number" },
    { value: "T001", label: "Transaction 001" },
    { value: "T002", label: "Transaction 002" },
    { value: "T003", label: "Transaction 003" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Modified Transaction:", formData);
    // Implement transaction modification logic here.
  };

  return (
    <div className={styles.modifyTransactionPage}>
      <header className={styles.header}>
        <HeaderTitle
          backLinkText="Shareholders"
          titleSuffix="Modify Transactions"
          backPath={backPath}
          showBack={true}
        />
      </header>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Top Dropdown for Transaction Number */}
          <div className={styles.fieldGroup}>
            <label htmlFor="transactionNumber">Transaction Number</label>
            <select
              id="transactionNumber"
              name="transactionNumber"
              value={formData.transactionNumber}
              onChange={handleInputChange}
              className={styles.selectInput}
              required
            >
              {transactionNumbers.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Render additional fields when a transaction number is selected */}
          {formData.transactionNumber !== "" && (
            <>
              <div className={styles.fieldGroup}>
                <label htmlFor="shareClass">Share Class</label>
                <input
                  type="text"
                  id="shareClass"
                  name="shareClass"
                  value={formData.shareClass}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="e.g., Common, Preferred"
                  required
                />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="shareNumber">Share Number</label>
                <input
                  type="number"
                  id="shareNumber"
                  name="shareNumber"
                  value={formData.shareNumber}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="Enter number of shares"
                  required
                />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="amountPaid">Amount Paid (USD)</label>
                <input
                  type="number"
                  id="amountPaid"
                  name="amountPaid"
                  value={formData.amountPaid}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="Enter amount paid"
                  required
                />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="amountToPay">Amount To Pay (USD)</label>
                <input
                  type="number"
                  id="amountToPay"
                  name="amountToPay"
                  value={formData.amountToPay}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="Enter amount to pay"
                  required
                />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="transactionDate">Transaction Date</label>
                <input
                  type="date"
                  id="transactionDate"
                  name="transactionDate"
                  value={formData.transactionDate}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  required
                />
              </div>
            </>
          )}
          <button type="submit" className={styles.submitButton}>
            Modify Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModifyTransactionsPage;
