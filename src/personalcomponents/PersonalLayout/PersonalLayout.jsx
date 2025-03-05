"use client";
import React, { useState } from "react";
import PersonalNavbar from "@/personalcomponents/PersonalNavbar/PersonalNavbar";
import PersonalSidebar from "@/personalcomponents/PersonalSidebar/PersonalSidebar";
import PersonalBreadcrumb from "@/personalcomponents/PersonalBreadcrumb/PersonalBreadcrumb";

const PersonalLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  // Define your breadcrumb items (customize as needed)
  const breadcrumbItems = [
    { label: "Home", link: "/personal/home" },
    { label: "Dashboard", link: "/personal/dashboard" },
    // Add additional breadcrumb items here…
  ];

  return (
    <div className="personal-layout">
      {/* Top Navbar */}
      <PersonalNavbar onToggleSidebar={toggleSidebar} />

      {/* Main Container: Sidebar + Content Area */}
      <div
        className="main-container"
        style={{
          display: "flex",
          height: "calc(100vh - 60px)", // Adjust if your navbar height changes
        }}
      >
        {/* Sidebar */}
        <PersonalSidebar isCollapsed={isSidebarCollapsed} />

        {/* Content Area */}
        <div
          className="content-area"
          style={{ flex: 1, overflowY: "auto", padding: "20px" }}
        >
          {/* Breadcrumb rendered at the top of content */}
          <PersonalBreadcrumb
            breadcrumbItems={breadcrumbItems}
            onToggleSidebar={toggleSidebar}
          />
          {children}
        </div>
      </div>
    </div>
  );
};

export default PersonalLayout;
