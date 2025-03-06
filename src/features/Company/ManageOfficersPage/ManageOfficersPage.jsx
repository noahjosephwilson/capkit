"use client";

import React from "react";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";
import { useSidebar } from "@/contexts/SidebarContext";
import styles from "./ManageOfficersPage.module.css";

const ManageOfficersPage = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <HeaderTitle 
            breadcrumbItems={[{ label: "Manage Officers" }]}
            onToggleSidebar={toggleSidebar}
            showBack={false}
          />
        </div>
      </header>
      <div className={styles.content}>
        {/* Future content for managing officers goes here */}
      </div>
    </div>
  );
};

export default ManageOfficersPage;
