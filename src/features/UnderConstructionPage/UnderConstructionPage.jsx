// src/pages/UnderConstructionPage.jsx
import React from "react";
import "./UnderConstructionPage.css";

const UnderConstructionPage = () => {
  return (
    <div className="uc-container">
      <h1 className="uc-title">This Page is Under Construction</h1>
      <p className="uc-message">
        We're working hard to build this page. Please check back soon!
      </p>
      <div className="uc-animation">
        <div className="uc-gear uc-gear1"></div>
        <div className="uc-gear uc-gear2"></div>
        <div className="uc-gear uc-gear3"></div>
      </div>
    </div>
  );
};

export default UnderConstructionPage;
