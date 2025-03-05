"use client";

import React from "react";
import PersonalNavbar from "@/personalcomponents/PersonalNavbar/PersonalNavbar";
import PersonalSidebar from "@/personalcomponents/PersonalSidebar/PersonalSidebar";
import PersonalBreadcrumb from "@/personalcomponents/PersonalBreadcrumb/PersonalBreadcrumb";
import { CompanyProvider } from "@/contexts/CompanyContext";
import { PersonalProvider } from "@/contexts/PersonalContext";

export default function DashboardLayout({ children }) {
  const breadcrumbItems = [
    { name: "Home", link: "/dashboard" },
    { name: "Page", link: "/dashboard/page" },
  ];

  return (
    <CompanyProvider>
      <PersonalProvider>
        <PersonalNavbar />
        <PersonalBreadcrumb breadcrumbItems={breadcrumbItems} />
        <div
          className="dashboard-layout"
          style={{
            display: "flex",
            height: "calc(100vh - 60px)",
            backgroundColor: "#fff",
            boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ borderRight: "1px solid #eee" }}>
            <PersonalSidebar />
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
      </PersonalProvider>
    </CompanyProvider>
  );
}
