import React from "react";
import "./ShareClassCard.css";

const ShareClassCard = ({ label, description, cardDescription, onDelete }) => {
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
        <button className="view-btn">View</button>
        <button className="edit-btn">Edit</button>
      </div>
    </div>
  );
};

export default ShareClassCard;
