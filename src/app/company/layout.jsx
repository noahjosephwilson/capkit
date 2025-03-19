"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/company/components/navbar/Navbar";
import Sidebar from "@/company/components/sidebar/Sidebar";
import Breadcrumb from "@/company/components/breadcrumb/Breadcrumb";
import { ContextProvider, useContextValue } from "@/company/contexts/context";
import { AuthProvider } from "@/company/contexts/authcontext";
import Footer from "@/company/components/footer/Footer"; // adjust path if needed

export default function Layout({ children }) {
  const breadcrumbItems = [
    { name: "Home", link: "/dashboard" },
    { name: "Page", link: "/dashboard/page" },
  ];

  // Disable global scrolling so that only the content container scrolls.
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

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
  const contentRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    // Ensure both the content container and window scroll to the top on navigation.
    requestAnimationFrame(() => {
      if (contentRef.current) {
        contentRef.current.scrollTo(0, 0);
      }
      window.scrollTo(0, 0);
    });
  }, [pathname]);

  return (
    <div
      className="dashboard-layout"
      style={{
        display: "flex",
        height: "calc(100vh - 60px)", // maintain sidebar height consistency
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
        ref={contentRef}
        className="content-container"
        style={{
          flex: 1,
          overflowY: "auto",
          overscrollBehavior: "none",
          backgroundColor: "#fff",
          width: isCollapsed ? "100%" : "auto",
          padding: "20px",
        }}
      >
        {children}
        <Footer />
      </div>
    </div>
  );
}
