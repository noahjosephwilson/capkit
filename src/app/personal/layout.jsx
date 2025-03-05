"use client";
import React from "react";
import PersonalLayout from "@/personalcomponents/PersonalLayout/PersonalLayout";
import { CompanyProvider } from "@/contexts/CompanyContext";

export default function DashboardLayout({ children }) {
  return (
    <CompanyProvider>
        {children}
    </CompanyProvider>
  );
}