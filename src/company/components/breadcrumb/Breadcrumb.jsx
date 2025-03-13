"use client";

import React from "react";
import Link from "next/link";
import styles from "./Breadcrumb.module.css";
import { Sidebar } from "lucide-react";
import { useContextValue } from "@/company/contexts/context";

function Breadcrumb({ breadcrumbItems = [], titleSuffix = "", showBack = false }) {
  const { toggleCollapse } = useContextValue();

  return (
    <header className={styles.container}>
      {/* Toggle Button */}
      <button className={styles.toggleButton} onClick={toggleCollapse}>
        <Sidebar size={24} className={styles.collapseIcon} />
      </button>
      {/* Vertical Separator */}
      <div className={styles.separator} />
      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb" className={styles.breadcrumbNav}>
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.link ? (
              <Link href={item.link} className={styles.breadcrumbItem}>
                {item.name}
              </Link>
            ) : (
              <span className={styles.breadcrumbItem}>{item.name}</span>
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
}

export default Breadcrumb;
