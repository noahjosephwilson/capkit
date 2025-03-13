"use client";

import React from "react";
import Navbar from "@/company/components/navbar/Navbar";
import Sidebar from "@/company/components/sidebar/Sidebar";
import Breadcrumb from "@/company/components/breadcrumb/Breadcrumb";
import { ContextProvider, useContextValue } from "@/company/contexts/context";
import { AuthProvider } from "@/company/contexts/authcontext";

export default function Layout({ children }) {
  const breadcrumbItems = [
    { name: "Home", link: "/dashboard" },
    { name: "Page", link: "/dashboard/page" },
  ];

  // Access collapse state from context.
  // Since Layout is inside ContextProvider, we need to extract it using a child component.
  // One pattern is to wrap the main content in a child component that calls useContextValue.
  return (
    <AuthProvider>
      <ContextProvider>
        <Navbar />
        <Breadcrumb breadcrumbItems={breadcrumbItems} />
        <MainLayout>{children}</MainLayout>
      </ContextProvider>
    </AuthProvider>
  );
}

function MainLayout({ children }) {
  const { isCollapsed } = useContextValue();

  return (
    <div
      className="dashboard-layout"
      style={{
        display: "flex",
        height: "calc(100vh - 60px)",
        backgroundColor: "#fff",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      {!isCollapsed && (
        <div style={{ borderRight: "1px solid #eee" }}>
          <Sidebar />
        </div>
      )}
      <div
        className="content-container"
        style={{
          flex: 1,
          overflowY: "auto",
          backgroundColor: "#fff",
          width: isCollapsed ? "100%" : "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}
