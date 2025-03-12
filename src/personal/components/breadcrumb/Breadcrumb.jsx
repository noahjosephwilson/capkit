"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Breadcrumb.module.css";
import SidebarCollapse from "../../../../public/assets/collapsesidebar.png";
import { usePersonal } from "@/personal/contexts/context";

function Breadcrumb({ breadcrumbItems = [], titleSuffix = "", showBack = false }) {
  const { toggleCollapse } = usePersonal();

  return (
    <header className={styles.container}>
      {/* Toggle Button */}
      <button className={styles.toggleButton} onClick={toggleCollapse}>
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
