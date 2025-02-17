// /src/contexts/CompanyContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const CompanyContext = createContext();

// Provider component that holds the current company ID in state.
// You can modify this to load the company ID from any source (e.g., localStorage, API, etc.)
export const CompanyProvider = ({ children }) => {
  const [currentCompanyId, setCurrentCompanyId] = useState(null);

  useEffect(() => {
    // Example: read company id from localStorage (or any other source)
    const storedCompanyId = localStorage.getItem("currentCompanyId");
    if (storedCompanyId) {
      setCurrentCompanyId(storedCompanyId);
    }
  }, []);

  return (
    <CompanyContext.Provider value={{ currentCompanyId, setCurrentCompanyId }}>
      {children}
    </CompanyContext.Provider>
  );
};

// Custom hook to access the CompanyContext easily
export const useCompany = () => useContext(CompanyContext);

export default CompanyContext;
