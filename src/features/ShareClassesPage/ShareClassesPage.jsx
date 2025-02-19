import React, { useState } from "react";
import "./ShareClassesPage.css";
import ShareClassCard from "../../components/ShareClassCard/ShareClassCard";

const ShareClassesPage = () => {
  const initialShareClasses = [
    {
      id: 1,
      label: "COM",
      description: "Class A Shares: High voting rights",
      cardDescription: "This is a description for COM.",
    },
    {
      id: 2,
      label: "PRE1",
      description: "Class B Shares: Limited voting rights",
      cardDescription: "This is a description for PRE1.",
    },
    {
      id: 3,
      label: "PRE2",
      description: "Class C Shares: Non-voting shares",
      cardDescription: "This is a description for PRE2.",
    },
    {
      id: 4,
      label: "SERA",
      description: "Class C Shares: Non-voting shares",
      cardDescription: "This is a description for SERA.",
    },
    {
      id: 5,
      label: "SERB",
      description: "Class C Shares: Non-voting shares",
      cardDescription: "This is a description for SERB.",
    },
  ];

  const [shareClasses, setShareClasses] = useState(initialShareClasses);

  const handleDeleteCard = (id) => {
    const updatedClasses = shareClasses.filter((share) => share.id !== id);
    setShareClasses(updatedClasses);
  };

  const handleAddCard = () => {
    console.log("Add Share Class clicked");
  };

  return (
    <div className="share-classes-page">
      <header className="share-classes-header">
        <div className="breadcrumb">Share Classes</div>
        <button className="share-classes-button" onClick={handleAddCard}>
          + Add Class
        </button>
      </header>
      <div className="tab-content">
        <div className="shareclass-list">
          {shareClasses.map((share) => (
            <ShareClassCard
              key={share.id}
              label={share.label}
              description={share.description}
              cardDescription={share.cardDescription}
              onDelete={() => handleDeleteCard(share.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShareClassesPage;
