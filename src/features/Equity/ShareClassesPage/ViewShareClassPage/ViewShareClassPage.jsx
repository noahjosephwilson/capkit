"use client";

import React, { useEffect, useState } from "react";
import HeaderTitle from "../../../../components/HeaderTitle/HeaderTitle";
import { useSidebar } from "@/contexts/SidebarContext";
import styles from "./ViewShareClassPage.module.css";
import { useSearchParams } from "next/navigation";

const ViewShareClassPage = () => {
  const searchParams = useSearchParams();
  const label = searchParams.get("label");

  // Retrieve the sidebar toggle function from SidebarContext.
  const { toggleSidebar } = useSidebar();

  // Local state to hold share class data
  const [shareClassData, setShareClassData] = useState(null);

  // Example: Simulate fetching share class data based on the label query parameter.
  useEffect(() => {
    if (label) {
      // In a real application, replace the following with an API call.
      const fetchedData = {
        title: "Class A Shares",
        abbreviation: label,
        description: "This share class represents common stock.",
        sharesAuthorised: "23,413",
        sharesIssued: "0",
        sharesUnissued: "23,413",
        totalInvested: "$0.00",
        totalUnpaid: "$0.00",
        perStockPrice: "-",
      };
      setShareClassData(fetchedData);
    }
  }, [label]);

  // While loading, show a header with breadcrumbs.
  if (!shareClassData) {
    return (
      <div className={styles.viewShareClassPage}>
        <header className={styles.header}>
          <HeaderTitle
            breadcrumbItems={[
              { label: "Share Classes", link: "/company/companyhome/shareclasses" },
              { label: "View Class" },
            ]}
            onToggleSidebar={toggleSidebar}
            showBack={true}
          />
        </header>
        <div className={styles.content}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.viewShareClassPage}>
      <header className={styles.header}>
        <HeaderTitle
          breadcrumbItems={[
            { label: "Share Classes", link: "/company/companyhome/shareclasses" },
            { label: "View Class" },
          ]}
          onToggleSidebar={toggleSidebar}
          showBack={true}
        />
      </header>
      <div className={styles.content}>
        <h2 className={styles.title}>{shareClassData.title}</h2>
        <p className={styles.abbreviation}>
          <strong>Abbreviation:</strong> {shareClassData.abbreviation}
        </p>
        <p className={styles.description}>
          <strong>Description:</strong> {shareClassData.description}
        </p>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Shares Authorised:</span>
            <span className={styles.statValue}>{shareClassData.sharesAuthorised}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Shares Issued:</span>
            <span className={styles.statValue}>{shareClassData.sharesIssued}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Shares Unissued:</span>
            <span className={styles.statValue}>{shareClassData.sharesUnissued}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Total Invested:</span>
            <span className={styles.statValue}>{shareClassData.totalInvested}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Total Unpaid:</span>
            <span className={styles.statValue}>{shareClassData.totalUnpaid}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Per Stock Price:</span>
            <span className={styles.statValue}>{shareClassData.perStockPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewShareClassPage;
