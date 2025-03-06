"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderTitle from "../../../../components/HeaderTitle/HeaderTitle";
import { useSidebar } from "@/contexts/SidebarContext";
import styles from "./IssueSharesPage.module.css";

const IssueSharesPage = () => {
  const router = useRouter();
  const { toggleSidebar } = useSidebar();

  // Sample options – adjust or load from your data source as needed.
  const shareClassOptions = ["Common", "Preferred", "Class A", "Class B"];
  const recipientOptions = [
    { id: 1, name: "John Doe", image: "https://via.placeholder.com/30" },
    { id: 2, name: "Jane Smith", image: "https://via.placeholder.com/30" },
    { id: 3, name: "Alice Johnson", image: "https://via.placeholder.com/30" },
  ];

  // State for the two dropdowns.
  const [selectedShareClass, setSelectedShareClass] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState({});
  const [shareClassDropdownOpen, setShareClassDropdownOpen] = useState(false);
  const [recipientDropdownOpen, setRecipientDropdownOpen] = useState(false);

  // Additional fields for issuing new shares.
  const [numberOfShares, setNumberOfShares] = useState("");
  const [pricePaid, setPricePaid] = useState("");
  const [amountPaidNow, setAmountPaidNow] = useState("");
  const [amountUnpaid, setAmountUnpaid] = useState("");
  const [dateIssued, setDateIssued] = useState("");

  // Refs for handling clicks outside the dropdowns.
  const shareClassRef = useRef(null);
  const recipientRef = useRef(null);

  // Close both dropdowns on outside click.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareClassRef.current && !shareClassRef.current.contains(event.target)) {
        setShareClassDropdownOpen(false);
      }
      if (recipientRef.current && !recipientRef.current.contains(event.target)) {
        setRecipientDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleShareClassSelect = (option) => {
    setSelectedShareClass(option);
    setShareClassDropdownOpen(false);
  };

  const handleRecipientSelect = (option) => {
    setSelectedRecipient(option);
    setRecipientDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process or submit your data as needed.
    const data = {
      shareClass: selectedShareClass,
      recipient: selectedRecipient,
      numberOfShares,
      pricePaid,
      amountPaidNow,
      amountUnpaid,
      dateIssued,
    };
    console.log("Issuing shares with data:", data);
    // TODO: Add your submission logic (e.g., API call)

    // Optionally reset the form after submission:
    setSelectedShareClass("");
    setSelectedRecipient({});
    setNumberOfShares("");
    setPricePaid("");
    setAmountPaidNow("");
    setAmountUnpaid("");
    setDateIssued("");
  };

  return (
    <div className={styles.issueSharesContainer}>
      {/* Header using the new HeaderTitle API */}
      <header className={styles.issueSharesHeader}>
        <HeaderTitle
          breadcrumbItems={[{ label: "Issue Shares" }]}
          onToggleSidebar={toggleSidebar}
          showBack={false}
        />
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.dropdownSection}>
          {/* Share Class Dropdown */}
          <div className={styles.dropdownContainer} ref={shareClassRef}>
            <label className={styles.dropdownLabel} htmlFor="shareClass">
              Select Share Class
            </label>
            <div
              className={styles.dropdownInputWrapper}
              onClick={() => setShareClassDropdownOpen(!shareClassDropdownOpen)}
            >
              <input
                type="text"
                id="shareClass"
                placeholder="Choose a share class..."
                value={selectedShareClass}
                readOnly
                className={styles.dropdownInput}
              />
            </div>
            {shareClassDropdownOpen && (
              <ul className={styles.dropdownList}>
                {shareClassOptions.map((option, index) => (
                  <li
                    key={index}
                    className={styles.dropdownItem}
                    onClick={() => handleShareClassSelect(option)}
                  >
                    {option}
                  </li>
                ))}
                <li
                  className={styles.dropdownItem}
                  onClick={() =>
                    router.push("/company/companyhome/shareclasses/addshareclass")
                  }
                >
                  + New Share Class
                </li>
              </ul>
            )}
          </div>

          {/* Recipient Dropdown */}
          <div className={styles.dropdownContainer} ref={recipientRef}>
            <label className={styles.dropdownLabel} htmlFor="recipient">
              Select Recipient
            </label>
            <div
              className={styles.dropdownInputWrapper}
              onClick={() => setRecipientDropdownOpen(!recipientDropdownOpen)}
            >
              <input
                type="text"
                id="recipient"
                placeholder="Choose a recipient..."
                value={selectedRecipient.name || ""}
                readOnly
                className={styles.dropdownInput}
              />
            </div>
            {recipientDropdownOpen && (
              <ul className={styles.dropdownList}>
                {recipientOptions.map((option) => (
                  <li
                    key={option.id}
                    className={styles.dropdownItem}
                    onClick={() => handleRecipientSelect(option)}
                  >
                    <img
                      src={option.image}
                      alt="Avatar"
                      className={styles.dropdownIcon}
                    />
                    <span>{option.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Additional Issue Details */}
        <div className={styles.detailsSection}>
          <div className={styles.formGroup}>
            <label htmlFor="numberOfShares">Number of Shares</label>
            <input
              type="number"
              id="numberOfShares"
              placeholder="Enter number of shares"
              value={numberOfShares}
              onChange={(e) => setNumberOfShares(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="pricePaid">Price Paid (per share)</label>
            <input
              type="number"
              id="pricePaid"
              step="0.01"
              placeholder="Enter price per share"
              value={pricePaid}
              onChange={(e) => setPricePaid(e.target.value)}
              required
            />
          </div>

          {/* Flex container for Amount Paid Now and Amount Unpaid */}
          <div className={styles.flexRow}>
            <div className={styles.formGroup}>
              <label htmlFor="amountPaidNow">Amount Paid Now</label>
              <input
                type="number"
                id="amountPaidNow"
                step="0.01"
                placeholder="Enter amount paid now"
                value={amountPaidNow}
                onChange={(e) => setAmountPaidNow(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="amountUnpaid">Amount Unpaid</label>
              <input
                type="number"
                id="amountUnpaid"
                step="0.01"
                placeholder="Enter amount unpaid"
                value={amountUnpaid}
                onChange={(e) => setAmountUnpaid(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="dateIssued">Date Issued</label>
            <input
              type="date"
              id="dateIssued"
              value={dateIssued}
              onChange={(e) => setDateIssued(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default IssueSharesPage;
