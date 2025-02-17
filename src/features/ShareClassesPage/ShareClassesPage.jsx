import React, { useState } from "react";
import "./ShareClassesPage.css";
import ShareClassCard from "../../components/ShareClassCard/ShareClassCard";
import AddShareClassCard from "../../components/AddShareClassCard/AddShareClassCard";

const ShareClassesPage = () => {
  // Initial dummy data with unique ids
  const initialShareClasses = [
    { id: 1, label: "A", description: "Class A Shares: High voting rights" },
    { id: 2, label: "B", description: "Class B Shares: Limited voting rights" },
    { id: 3, label: "C", description: "Class C Shares: Non-voting shares" },
  ];

  const [shareClasses, setShareClasses] = useState(initialShareClasses);

  const handleDeleteCard = (id) => {
    const updatedClasses = shareClasses.filter((share) => share.id !== id);
    setShareClasses(updatedClasses);
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    // For now, just log. In the future, route to your add page.
    console.log("Add Share Class clicked");
  };

  return (
    <>
      {/* Fixed Page Title Container */}
      <div className="page-title-container">
        <h1 className="page-title">Share Classes</h1>
      </div>
      
      <div className="shareholders-page">
        <div className="tab-content">
          <div className="shareclass-list">
            {shareClasses.map((share) => (
              <ShareClassCard
                key={share.id}
                label={share.label}
                description={share.description}
                onDelete={() => handleDeleteCard(share.id)}
              />
            ))}

            {/* Larger Add Share Class Card Component */}
            <AddShareClassCard onAdd={handleAddCard} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareClassesPage;
