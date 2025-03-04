// app/dashboard/layout.jsx

import React from "react";
import PersonalNavbar from "@/personalcomponents/PersonalNavbar/PersonalNavbar";
import PersonalSidebar from "@/personalcomponents/PersonalSidebar/PersonalSidebar";
import { CompanyProvider } from "@/contexts/CompanyContext";

export default function DashboardLayout({ children }) {
  return (
    <CompanyProvider>
      <>
        <PersonalNavbar />
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
      </>
    </CompanyProvider>
  );
}
