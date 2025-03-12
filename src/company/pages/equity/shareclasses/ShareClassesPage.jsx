"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ShareClassCard from "../../../components/ShareClassCard/ShareClassCard";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";
import { useSidebar } from "@/contexts/SidebarContext";
import styles from "./ShareClassesPage.module.css";

const ShareClassesPage = () => {
  const router = useRouter();
  const { toggleSidebar } = useSidebar();

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

  const handleDeleteCard = (id) => {
    const updatedClasses = shareClasses.filter((share) => share.id !== id);
    setShareClasses(updatedClasses);
  };

  const handleAddCard = () => {
    router.push("/company/companyhome/shareclasses/addshareclass");
  };

  return (
    <div className={styles.shareClassesPage}>
      <header className={styles.shareClassesHeader}>
        <HeaderTitle
          breadcrumbItems={[{ label: "Share Classes" }]}
          onToggleSidebar={toggleSidebar}
          showBack={false}
        />
        <button className={styles.shareClassesButton} onClick={handleAddCard}>
          + Add Class
        </button>
      </header>
      <div className={styles.tabContent}>
        <div className={styles.shareclassList}>
          {shareClasses.map((share) => (
            <ShareClassCard
              key={share.id}
              label={share.label}
              description={share.description}
              cardDescription={share.cardDescription}
              onDelete={() => handleDeleteCard(share.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShareClassesPage;
