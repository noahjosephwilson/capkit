import React, { useState, useEffect, useRef } from "react";
import "./StockTransfers.css";

// A reusable searchable dropdown component specific to StockTransfers
const SearchableDropdown = ({
  label,
  options,
  selected,
  onSelect,
  placeholder,
  className,
}) => {
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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
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
    <div className={`dropdown-container ${className || ""}`} ref={dropdownRef}>
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

  // Options for share class type.
  const shareClassOptions = ["Common", "Preferred"];

  // State for the two stakeholder dropdowns.
  const [fromStakeholder, setFromStakeholder] = useState("");
  const [toStakeholder, setToStakeholder] = useState("");

  // Transfer details state.
  const [transferDetail, setTransferDetail] = useState({
    shareClassType: "",
    numberOfShares: "",
    transferDate: "",
    amountPaid: "",
    amountToBePaid: "",
  });

  // Only show transfer details form when both stakeholder dropdowns have a value.
  const transferDetailsVisible = fromStakeholder !== "" && toStakeholder !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    const transferData = {
      fromStakeholder,
      toStakeholder,
      ...transferDetail,
    };
    console.log("Submitting stock transfer:", transferData);
    // TODO: Add your submission logic (e.g., API call)

    // Optionally reset the form after submission:
    setFromStakeholder("");
    setToStakeholder("");
    setTransferDetail({
      shareClassType: "",
      numberOfShares: "",
      transferDate: "",
      amountPaid: "",
      amountToBePaid: "",
    });
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
            {/* Group Share Class Type and Number of Shares on the same row */}
            <div className="form-group-inline">
              <div className="form-group shareclass-fixed">
                <SearchableDropdown
                  label="Share Class Type"
                  options={shareClassOptions}
                  selected={transferDetail.shareClassType}
                  onSelect={(val) =>
                    setTransferDetail({
                      ...transferDetail,
                      shareClassType: val,
                    })
                  }
                  placeholder="Select Class..."
                />
              </div>
              <div className="form-group">
                <label htmlFor="numberOfShares">Number of Shares</label>
                <input
                  type="number"
                  id="numberOfShares"
                  placeholder="Enter number of shares"
                  value={transferDetail.numberOfShares}
                  onChange={(e) =>
                    setTransferDetail({
                      ...transferDetail,
                      numberOfShares: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className="form-group-inline">
              <div className="form-group">
                <label htmlFor="transferDate">Date of Transfer</label>
                <input
                  type="date"
                  id="transferDate"
                  value={transferDetail.transferDate}
                  onChange={(e) =>
                    setTransferDetail({
                      ...transferDetail,
                      transferDate: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className="form-group-inline">
              <div className="form-group">
                <label htmlFor="amountPaid">Amount Paid</label>
                <input
                  type="number"
                  step="0.01"
                  id="amountPaid"
                  placeholder="Enter amount paid"
                  value={transferDetail.amountPaid}
                  onChange={(e) =>
                    setTransferDetail({
                      ...transferDetail,
                      amountPaid: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="amountToBePaid">Amount To Be Paid</label>
                <input
                  type="number"
                  step="0.01"
                  id="amountToBePaid"
                  placeholder="Enter amount to be paid"
                  value={transferDetail.amountToBePaid}
                  onChange={(e) =>
                    setTransferDetail({
                      ...transferDetail,
                      amountToBePaid: e.target.value,
                    })
                  }
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
