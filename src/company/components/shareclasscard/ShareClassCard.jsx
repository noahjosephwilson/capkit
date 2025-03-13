import React from "react";
import { useRouter } from "next/navigation";
import "./ShareClassCard.css";

const ShareClassCard = ({ label, description, cardDescription, onDelete }) => {
  const router = useRouter();

  const handleView = (e) => {
    e.stopPropagation();
    // Navigate to the view page. Adjust the URL as necessary.
    router.push(`/company/companyhome/shareclasses/viewshareclass?label=${encodeURIComponent(label)}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    // Navigate to the edit page. Adjust the URL as necessary.
    router.push(`/company/companyhome/shareclasses/editshareclass?label=${encodeURIComponent(label)}`);
  };

  return (
    <div className="shareclass-card">
      <div
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        ×
      </div>
      <div className="card-header">
        <div className="shareclass-acronym">{label}</div>
        <div className="shareclass-name">{description}</div>
        <hr className="header-divider" />
      </div>
      <div className="card-stats">
        <div className="stat-row">
          <span className="stat-label">Shares authorised</span>
          <span className="stat-value">23,413</span>
        </div>
        <div className="stat-row">
          <span className="stat-label">Shares issued</span>
          <span className="stat-value">0</span>
        </div>
        <div className="stat-row">
          <span className="stat-label">Shares unissued</span>
          <span className="stat-value">23,413</span>
        </div>
        <div className="stat-row">
          <span className="stat-label">Total invested</span>
          <span className="stat-value">$0.00</span>
        </div>
        <div className="stat-row">
          <span className="stat-label">Total unpaid</span>
          <span className="stat-value">$0.00</span>
        </div>
        <div className="stat-row">
          <span className="stat-label">Per stock price</span>
          <span className="stat-value">-</span>
        </div>
        <hr className="stats-divider" />
      </div>
      <div className="card-description">
        <p>
          <strong>Description:</strong> {cardDescription}
        </p>
      </div>
      <div className="card-footer">
        <button className="view-btn" onClick={handleView}>View</button>
        <button className="edit-btn" onClick={handleEdit}>Edit</button>
      </div>
    </div>
  );
};

export default ShareClassCard;
