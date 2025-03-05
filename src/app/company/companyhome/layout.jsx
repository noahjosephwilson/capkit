"use client";

import React from "react";
import MainNavbar from "@/components/MainNavbar/MainNavbar";
import MainSidebar from "@/components/MainSidebar/MainSidebar";
import { CompanyProvider } from "@/contexts/CompanyContext";
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext";
import "./layout.css"; // Import our custom CSS

function DashboardLayoutContent({ children }) {
  const { isCollapsed, toggleSidebar } = useSidebar();
  // When collapsed, reserve 0px; otherwise, 16rem.
  const sidebarWidth = isCollapsed ? "0px" : "16rem";

  return (
    <>
      <MainNavbar />
      <div
        className="dashboard-layout"
        style={{
          marginTop: "60px",
          display: "flex",
          height: "calc(100vh - 60px)",
          backgroundColor: "#fff",
          boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <div
          className="sidebar-container"
          style={{
            width: sidebarWidth,
            borderRight: sidebarWidth !== "0px" ? "1px solid #eee" : "none",
          }}
        >
          <MainSidebar isCollapsed={isCollapsed} toggleCollapse={toggleSidebar} />
        </div>
        <div
          className="content-container"
          style={{
            flex: 1,
            overflowY: "auto",
            backgroundColor: "#fff",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <CompanyProvider>
      <SidebarProvider>
        <DashboardLayoutContent>{children}</DashboardLayoutContent>
      </SidebarProvider>
    </CompanyProvider>
  );
}
