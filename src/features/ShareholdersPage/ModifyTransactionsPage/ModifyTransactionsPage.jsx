"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";
import styles from "./ModifyTransactionsPage.module.css";

const ModifyTransactionsPage = () => {
  const router = useRouter();
  const backPath = "/company/companyhome/shareholders";

  const [formData, setFormData] = useState({
    transactionType: "",
    shares: "",
    price: "",
    description: "",
  });

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
          <div className={styles.fieldGroup}>
            <label htmlFor="transactionType">Transaction Type</label>
            <select
              id="transactionType"
              name="transactionType"
              value={formData.transactionType}
              onChange={handleInputChange}
              className={styles.inputField}
              required
            >
              <option value="">Select transaction type</option>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
              <option value="transfer">Transfer</option>
            </select>
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="shares">Number of Shares</label>
            <input
              type="number"
              id="shares"
              name="shares"
              value={formData.shares}
              onChange={handleInputChange}
              className={styles.inputField}
              placeholder="Enter number of shares"
              required
            />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="price">Price per Share (USD)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className={styles.inputField}
              placeholder="Enter price per share"
              required
            />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="description">Transaction Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={styles.textArea}
              placeholder="Enter a description for the transaction"
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Modify Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModifyTransactionsPage;
