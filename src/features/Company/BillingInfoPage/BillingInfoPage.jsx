"use client";

import React from "react";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";
import { useSidebar } from "@/contexts/SidebarContext";
import styles from "./BillingInfoPage.module.css";

const BillingInfoPage = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <HeaderTitle 
            breadcrumbItems={[{ label: "Billing Info" }]}
            onToggleSidebar={toggleSidebar}
            showBack={false}
          />
        </div>
      </header>
      <div className={styles.content}>
        {/* Future content for billing info goes here */}
      </div>
    </div>
  );
};

export default BillingInfoPage;
