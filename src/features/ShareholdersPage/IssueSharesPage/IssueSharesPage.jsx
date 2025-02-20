import React, { useState, useRef, useEffect } from "react";
import styles from "./IssueSharesPage.module.css";

const IssueSharesPage = () => {
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

  // Refs for handling clicks outside the dropdowns.
  const shareClassRef = useRef(null);
  const recipientRef = useRef(null);

  // Close share class dropdown on outside click.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareClassRef.current && !shareClassRef.current.contains(event.target)) {
        setShareClassDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close recipient dropdown on outside click.
  useEffect(() => {
    const handleClickOutside = (event) => {
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
    console.log("Selected Share Class:", selectedShareClass);
    console.log("Selected Recipient:", selectedRecipient);
  };

  return (
    <div className={styles.issueSharesContainer}>
      {/* Using an h2 element styled within the container */}
      <h2>Issue Shares</h2>
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

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default IssueSharesPage;
