"use client";

import React from "react";
import Image from "next/image";
import styles from "./HeaderTitle.module.css";
import SidebarCollapse from "../../../public/assets/collapsesidebar.png";

function HeaderTitle({
  breadcrumbItems = [],
  onToggleSidebar,
  titleSuffix = "",
  showBack = false,
}) {
  return (
    <header className={styles.container}>
      {/* Toggle Button */}
      <button className={styles.toggleButton} onClick={onToggleSidebar}>
        <Image 
          src={SidebarCollapse} 
          alt="Toggle sidebar" 
          width={24} 
          height={24}
          className={styles.collapseIcon}
        />
      </button>

      {/* Vertical Separator */}
      <div className={styles.separator} />

      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb" className={styles.breadcrumbNav}>
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            <span className={styles.breadcrumbItem}>{item}</span>
            {index < breadcrumbItems.length - 1 && (
              <span className={styles.breadcrumbSeparator}>&gt;</span>
            )}
          </React.Fragment>
        ))}
        {titleSuffix && (
          <span className={styles.breadcrumbItem}>{titleSuffix}</span>
        )}
      </nav>
    </header>
  );
}

export default HeaderTitle;
