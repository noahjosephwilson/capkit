import React from "react";
import "./AddShareClassCard.css";

const AddShareClassCard = ({ onAdd }) => {
  return (
    <div className="add-shareclass-card" onClick={onAdd}>
      <div className="add-icon">+</div>
      <div className="add-text">Add Share Class</div>
    </div>
  );
};

export default AddShareClassCard;
