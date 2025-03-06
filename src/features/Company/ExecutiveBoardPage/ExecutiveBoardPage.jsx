"use client";

import React from "react";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";
import { useSidebar } from "@/contexts/SidebarContext";
import styles from "./ExecutiveBoardPage.module.css";

const ExecutiveBoardPage = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <HeaderTitle 
            breadcrumbItems={[{ label: "Executive Board" }]}
            onToggleSidebar={toggleSidebar}
            showBack={false}
          />
        </div>
      </header>
      <div className={styles.content}>
        {/* Future content for executive board goes here */}
      </div>
    </div>
  );
};

export default ExecutiveBoardPage;
