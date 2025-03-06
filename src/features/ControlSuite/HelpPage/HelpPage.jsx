"use client";

import React from "react";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";
import { useSidebar } from "@/contexts/SidebarContext";
import styles from "./HelpPage.module.css";

const HelpPage = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <HeaderTitle 
            breadcrumbItems={[{ label: "Help" }]}
            onToggleSidebar={toggleSidebar}
            showBack={false}
          />
        </div>
      </header>
      <div className={styles.content}>
        {/* Future content for help goes here */}
      </div>
    </div>
  );
};

export default HelpPage;
