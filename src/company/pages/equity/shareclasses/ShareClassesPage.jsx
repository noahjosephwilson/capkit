"use client";

import React, { useState } from "react";
import Breadcrumb from "@/company/components/breadcrumb/Breadcrumb";
import ShareClassCard from "@/company/pages/equity/shareclasses/components/shareclasscard/ShareClassCard";
import styles from "./ShareClassesPage.module.css";

const ShareClassesPage = () => {
  // Define the breadcrumb items for this page.
  const breadcrumbItems = [{ name: "Share Classes" }];

  const initialShareClasses = [
    {
      id: 1,
      label: "COM",
      description: "Class A Shares: High voting rights",
      cardDescription: "This is a description for COM.",
    },
    {
      id: 2,
      label: "PRE1",
      description: "Class B Shares: Limited voting rights",
      cardDescription: "This is a description for PRE1.",
    },
    {
      id: 3,
      label: "PRE2",
      description: "Class C Shares: Non-voting shares",
      cardDescription: "This is a description for PRE2.",
    },
    {
      id: 4,
      label: "SERA",
      description: "Class C Shares: Non-voting shares",
      cardDescription: "This is a description for SERA.",
    },
    {
      id: 5,
      label: "SERB",
      description: "Class C Shares: Non-voting shares",
      cardDescription: "This is a description for SERB.",
    },
  ];

  const [shareClasses, setShareClasses] = useState(initialShareClasses);

  return (
    <div className={styles.shareClasses}>
      <div className={styles.header}>
        <Breadcrumb
          breadcrumbItems={breadcrumbItems}
          titleSuffix=""
          showBack={true}
        />
        <button className={styles.addClassButton}>+ Add Class</button>
      </div>
      <main className={styles.main}>
        <section className={styles.currentClasses}>
          <div className={styles.shareClassList}>
            {shareClasses.map((share) => (
              <ShareClassCard
                key={share.id}
                label={share.label}
                description={share.description}
                cardDescription={share.cardDescription}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ShareClassesPage;
