"use client";

import React from "react";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";
import { useSidebar } from "@/contexts/SidebarContext";
import styles from "./VotingPage.module.css";

const VotingPage = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <HeaderTitle 
            breadcrumbItems={[{ label: "Voting" }]}
            onToggleSidebar={toggleSidebar}
            showBack={false}
          />
        </div>
      </header>
      <div className={styles.content}>
        {/* Future content for voting goes here */}
      </div>
    </div>
  );
};

export default VotingPage;
