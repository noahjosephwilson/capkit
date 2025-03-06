"use client";
import React from "react";
import PersonalBreadcrumb from "@/personalcomponents/PersonalBreadcrumb/PersonalBreadcrumb";
import styles from "./HomePage.module.css";

const HomePage = () => {
  // Define the breadcrumb items for this page.
  const breadcrumbItems = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Home" }
  ];

  // Dummy function for toggling the sidebar.
  const handleSidebarToggle = () => {
    console.log("Sidebar toggled");
  };

  return (
    <div className={styles.dashboard}>
      {/* Render the breadcrumb component */}
      <PersonalBreadcrumb
        breadcrumbItems={breadcrumbItems}
        onToggleSidebar={handleSidebarToggle}
        titleSuffix=""
        showBack={false}
      />

      {/* Page content */}
      <header className={styles.header}>
        <h1>Home Page</h1>
        <p>
          Welcome to the home page. This page is fully self-contained and uses a custom layout.
        </p>
      </header>
      <main className={styles.main}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
          Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis
          sagittis ipsum.
        </p>
        <p>
          Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia
          arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
          inceptos himenaeos.
        </p>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2025 HomePage. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
