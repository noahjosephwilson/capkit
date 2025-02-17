import React, { useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { useCompany } from "../../../contexts/CompanyContext";
import { useNavigate } from "react-router-dom";
import "./AddStakeholder.css";

const AddStakeholder = () => {
  const { currentCompanyId } = useCompany();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    nickname: "",
    shareholderType: "",
  });

  const [commonStockTransactions, setCommonStockTransactions] = useState([]);
  const [preferredStockTransactions, setPreferredStockTransactions] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --- Common Stock Transaction Functions ---
  const handleAddCommonTransaction = (e) => {
    e.preventDefault();
    setCommonStockTransactions([
      ...commonStockTransactions,
      { issueDate: "", shares: "", price: "" },
    ]);
  };

  const updateCommonTransaction = (index, field, value) => {
    const updated = [...commonStockTransactions];
    updated[index] = { ...updated[index], [field]: value };
    setCommonStockTransactions(updated);
  };

  const removeCommonTransaction = (index) => {
    const updated = commonStockTransactions.filter((_, i) => i !== index);
    setCommonStockTransactions(updated);
  };

  // --- Preferred Stock Transaction Functions ---
  const handleAddPreferredTransaction = (e) => {
    e.preventDefault();
    setPreferredStockTransactions([
      ...preferredStockTransactions,
      { issueDate: "", shares: "", price: "" },
    ]);
  };

  const updatePreferredTransaction = (index, field, value) => {
    const updated = [...preferredStockTransactions];
    updated[index] = { ...updated[index], [field]: value };
    setPreferredStockTransactions(updated);
  };

  const removePreferredTransaction = (index) => {
    const updated = preferredStockTransactions.filter((_, i) => i !== index);
    setPreferredStockTransactions(updated);
  };

  // --- Submit Handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const submissionData = {
      ...formData,
      commonStockTransactions,
      preferredStockTransactions,
      createdAt: new Date().toISOString(),
    };

    if (!currentCompanyId) {
      const message = "No company is currently selected.";
      console.error(message);
      setError(message);
      return;
    }

    try {
      const stakeholdersRef = collection(db, "companies", currentCompanyId, "stakeholders");
      await addDoc(stakeholdersRef, submissionData);
      console.log("Stakeholder added successfully.");
      setError(null);

      // Optionally clear the form after submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        nickname: "",
        shareholderType: "",
      });
      setCommonStockTransactions([]);
      setPreferredStockTransactions([]);

      // Redirect to the cap table page (nested under dashboard)
      const redirectLink = "/dashboard/cap-table";
      navigate(redirectLink);
    } catch (error) {
      console.error("Error adding stakeholder:", error);
      setError("Error adding stakeholder: " + error.message);
    }
  };

  return (
    <div className="add-stakeholder-container">
      <h2>Add New Stakeholder</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="add-stakeholder-form">
        {/* Personal Information */}
        <fieldset>
          <legend>Personal Information</legend>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nickname">Nickname (Optional)</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              placeholder="Enter nickname"
              value={formData.nickname}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        {/* Shareholder Details */}
        <fieldset>
          <legend>Shareholder Details</legend>
          <div className="form-group">
            <label htmlFor="shareholderType">Shareholder Type</label>
            <select
              id="shareholderType"
              name="shareholderType"
              value={formData.shareholderType}
              onChange={handleChange}
              required
            >
              <option value="" disabled hidden>
                Select shareholder type
              </option>
              <option value="individual">Individual</option>
              <option value="company">Company</option>
              <option value="employee">Employee</option>
              <option value="institutional">Institutional</option>
            </select>
          </div>
        </fieldset>

        {/* Common Stock Details */}
        <fieldset>
          <legend>Common Stock Details</legend>
          <a
            href="#"
            className="add-transaction"
            onClick={handleAddCommonTransaction}
          >
            + Add new transaction
          </a>
          <TransitionGroup>
            {commonStockTransactions.map((transaction, index) => (
              <CSSTransition key={index} timeout={300} classNames="transaction">
                <div className="transaction-block">
                  <span
                    className="remove-transaction"
                    onClick={() => removeCommonTransaction(index)}
                  >
                    x
                  </span>
                  <div className="form-group-inline">
                    <div className="form-group">
                      <label htmlFor={`commonStockIssueDate-${index}`}>
                        Issue Date
                      </label>
                      <input
                        type="date"
                        id={`commonStockIssueDate-${index}`}
                        name={`commonStockIssueDate-${index}`}
                        value={transaction.issueDate}
                        onChange={(e) =>
                          updateCommonTransaction(index, "issueDate", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`commonStockShares-${index}`}>
                        Number of Shares
                      </label>
                      <input
                        type="number"
                        id={`commonStockShares-${index}`}
                        name={`commonStockShares-${index}`}
                        placeholder="Shares"
                        value={transaction.shares}
                        onChange={(e) =>
                          updateCommonTransaction(index, "shares", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`commonStockPrice-${index}`}>
                        Price Paid per Share
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        id={`commonStockPrice-${index}`}
                        name={`commonStockPrice-${index}`}
                        placeholder="Price"
                        value={transaction.price}
                        onChange={(e) =>
                          updateCommonTransaction(index, "price", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </fieldset>

        {/* Preferred Stock Details */}
        <fieldset>
          <legend>Preferred Stock Details</legend>
          <a
            href="#"
            className="add-transaction"
            onClick={handleAddPreferredTransaction}
          >
            + Add new transaction
          </a>
          <TransitionGroup>
            {preferredStockTransactions.map((transaction, index) => (
              <CSSTransition key={index} timeout={300} classNames="transaction">
                <div className="transaction-block">
                  <span
                    className="remove-transaction"
                    onClick={() => removePreferredTransaction(index)}
                  >
                    x
                  </span>
                  <div className="form-group-inline">
                    <div className="form-group">
                      <label htmlFor={`preferredStockIssueDate-${index}`}>
                        Issue Date
                      </label>
                      <input
                        type="date"
                        id={`preferredStockIssueDate-${index}`}
                        name={`preferredStockIssueDate-${index}`}
                        value={transaction.issueDate}
                        onChange={(e) =>
                          updatePreferredTransaction(index, "issueDate", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`preferredStockShares-${index}`}>
                        Number of Shares
                      </label>
                      <input
                        type="number"
                        id={`preferredStockShares-${index}`}
                        name={`preferredStockShares-${index}`}
                        placeholder="Shares"
                        value={transaction.shares}
                        onChange={(e) =>
                          updatePreferredTransaction(index, "shares", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor={`preferredStockPrice-${index}`}>
                        Price Paid per Share
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        id={`preferredStockPrice-${index}`}
                        name={`preferredStockPrice-${index}`}
                        placeholder="Price"
                        value={transaction.price}
                        onChange={(e) =>
                          updatePreferredTransaction(index, "price", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </fieldset>

        <button type="submit" className="submit-button">
          Add Stakeholder
        </button>
      </form>
    </div>
  );
};

export default AddStakeholder;
