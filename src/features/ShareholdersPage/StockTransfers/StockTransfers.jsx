import React, { useState, useEffect, useRef } from "react";
import "./StockTransfers.css";

// A reusable searchable dropdown component specific to StockTransfers
const SearchableDropdown = ({ label, options, selected, onSelect, placeholder }) => {
  const [searchText, setSearchText] = useState(selected || "");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Filter options based on the search text.
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchText.toLowerCase())
  );

  // Close dropdown when clicking outside.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    setDropdownOpen(true);
  };

  const handleOptionClick = (option) => {
    setSearchText(option);
    setDropdownOpen(false);
    onSelect(option);
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      {label && <label className="dropdown-label">{label}</label>}
      <input
        type="text"
        placeholder={placeholder || "Choose an option..."}
        value={searchText}
        onChange={handleInputChange}
        onFocus={() => setDropdownOpen(true)}
        className="dropdown-input"
      />
      {dropdownOpen && (
        <ul className="dropdown-list">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                className="dropdown-item"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))
          ) : (
            <li className="dropdown-item no-match">No matches found</li>
          )}
        </ul>
      )}
    </div>
  );
};

const StockTransfers = () => {
  // Sample stakeholder list; adjust as needed.
  const stakeholders = [
    "Alice Johnson",
    "Bob Smith",
    "Charlie Williams",
    "Diana Evans",
    "Evan Brown",
    "Fiona Davis",
  ];

  // State for the two dropdowns.
  const [fromStakeholder, setFromStakeholder] = useState("");
  const [toStakeholder, setToStakeholder] = useState("");

  // Transfer details fields.
  const [transferDate, setTransferDate] = useState("");
  const [commonShares, setCommonShares] = useState("");
  const [commonSharePrice, setCommonSharePrice] = useState("");
  const [preferredShares, setPreferredShares] = useState("");
  const [preferredSharePrice, setPreferredSharePrice] = useState("");

  // Only show transfer details form when both dropdowns have a value.
  const transferDetailsVisible = fromStakeholder !== "" && toStakeholder !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    const transferData = {
      fromStakeholder,
      toStakeholder,
      transferDate,
      commonShares,
      commonSharePrice,
      preferredShares,
      preferredSharePrice,
    };
    console.log("Submitting stock transfer:", transferData);
    // TODO: Add your submission logic (e.g., API call)

    // Optionally reset the form after submission:
    setFromStakeholder("");
    setToStakeholder("");
    setTransferDate("");
    setCommonShares("");
    setCommonSharePrice("");
    setPreferredShares("");
    setPreferredSharePrice("");
  };

  return (
    <div className="stock-transfers-container">
      <h2>Stock Transfers</h2>
      
      <div className="dropdown-section">
        <SearchableDropdown
          label="From Stakeholder"
          options={stakeholders}
          selected={fromStakeholder}
          onSelect={setFromStakeholder}
          placeholder="Select From Stakeholder..."
        />
        <SearchableDropdown
          label="To Stakeholder"
          options={stakeholders}
          selected={toStakeholder}
          onSelect={setToStakeholder}
          placeholder="Select To Stakeholder..."
        />
      </div>

      {transferDetailsVisible && (
        <div className="transfer-details">
          <h3>Transfer Details</h3>
          <form onSubmit={handleSubmit} className="transfer-form">
            <div className="form-group-inline">
              <div className="form-group">
                <label htmlFor="transferDate">Date of Transfer</label>
                <input
                  type="date"
                  id="transferDate"
                  value={transferDate}
                  onChange={(e) => setTransferDate(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group-inline">
              <div className="form-group">
                <label htmlFor="commonShares">Common Shares</label>
                <input
                  type="number"
                  id="commonShares"
                  placeholder="Number of Common Shares"
                  value={commonShares}
                  onChange={(e) => setCommonShares(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="commonSharePrice">Price per Common Share</label>
                <input
                  type="number"
                  step="0.01"
                  id="commonSharePrice"
                  placeholder="Amount Paid per Common Share"
                  value={commonSharePrice}
                  onChange={(e) => setCommonSharePrice(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group-inline">
              <div className="form-group">
                <label htmlFor="preferredShares">Preferred Shares</label>
                <input
                  type="number"
                  id="preferredShares"
                  placeholder="Number of Preferred Shares"
                  value={preferredShares}
                  onChange={(e) => setPreferredShares(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="preferredSharePrice">Price per Preferred Share</label>
                <input
                  type="number"
                  step="0.01"
                  id="preferredSharePrice"
                  placeholder="Amount Paid per Preferred Share"
                  value={preferredSharePrice}
                  onChange={(e) => setPreferredSharePrice(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="submit-button">
              Submit Transfer
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default StockTransfers;
