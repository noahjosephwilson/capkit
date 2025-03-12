"use client";
import React, { createContext, useContext, useState } from "react";

const PersonalContext = createContext();

export const PersonalProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  return (
    <PersonalContext.Provider value={{ isCollapsed, toggleCollapse }}>
      {children}
    </PersonalContext.Provider>
  );
};

export const usePersonal = () => useContext(PersonalContext);
