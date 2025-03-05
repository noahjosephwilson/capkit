"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      // Auto-collapse when window width is below 1024px.
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      }
      // Optionally, if you want to auto-expand when above 1024,
      // uncomment the following else block:
      // else {
      //   setIsCollapsed(false);
      // }
    };

    // Run initial check
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
