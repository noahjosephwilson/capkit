"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [currentCompanyId, setCurrentCompanyId] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Example: read company id from localStorage (or any other source)
    const storedCompanyId = localStorage.getItem("currentCompanyId");
    if (storedCompanyId) {
      setCurrentCompanyId(storedCompanyId);
    }
  }, []);

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  return (
    <Context.Provider
      value={{ currentCompanyId, setCurrentCompanyId, isCollapsed, toggleCollapse }}
    >
      {children}
    </Context.Provider>
  );
};

// Custom hook to access the context
export const useContextValue = () => useContext(Context);

export default Context;
