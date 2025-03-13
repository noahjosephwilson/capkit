"use client";

import React from "react";
import Navbar from "@/personal/components/navbar/Navbar";
import Sidebar from "@/personal/components/sidebar/Sidebar";
import Breadcrumb from "@/personal/components/breadcrumb/Breadcrumb";
import { PersonalProvider } from "@/personal/contexts/context";
import { AuthProvider } from "@/personal/contexts/AuthContext";

export default function DashboardLayout({ children }) {
  const breadcrumbItems = [
    { name: "Home", link: "/dashboard" },
    { name: "Page", link: "/dashboard/page" },
  ];

  return (
    <AuthProvider>
      <PersonalProvider>
        <Navbar />
        <Breadcrumb breadcrumbItems={breadcrumbItems} />
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
            <Sidebar />
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
    </AuthProvider>
  );
}
