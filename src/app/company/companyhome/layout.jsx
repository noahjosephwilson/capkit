// app/dashboard/layout.jsx

import React from "react";
import MainNavbar from "@/components/MainNavbar/MainNavbar";
import MainSidebar from "@/components/MainSidebar/MainSidebar";
import { CompanyProvider } from "@/contexts/CompanyContext";

export default function DashboardLayout({ children }) {
  return (
    <CompanyProvider>
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
          <div style={{ borderRight: "1px solid #eee" }}>
            <MainSidebar />
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
    </CompanyProvider>
  );
}
