"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./PersonalBreadcrumb.module.css";
import SidebarCollapse from "../../../public/assets/collapsesidebar.png";

const PersonalBreadcrumb = ({
  breadcrumbItems = [],
  onToggleSidebar,
  titleSuffix = "",
}) => {
  return (
    <header className={styles.container}>
      {/* Toggle Button for Sidebar Collapse */}
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
            {item.link ? (
              <Link href={item.link} className={styles.breadcrumbItem}>
                {item.label}
              </Link>
            ) : (
              <span className={styles.breadcrumbItem}>{item.label}</span>
            )}
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
};

export default PersonalBreadcrumb;
