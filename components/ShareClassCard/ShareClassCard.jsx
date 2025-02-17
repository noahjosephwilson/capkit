import React from "react";
import "./ShareClassCard.css";

const ShareClassCard = ({ label, description, onDelete }) => {
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
      <div className="shareclass-content">
        <div className="shareclass-label">{label}</div>
        <div className="shareclass-description">{description}</div>
      </div>
      <div className="see-more">See More →</div>
    </div>
  );
};

export default ShareClassCard;
