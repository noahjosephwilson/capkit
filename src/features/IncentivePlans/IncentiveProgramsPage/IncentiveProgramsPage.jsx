"use client";

import React from "react";
import { useRouter } from "next/navigation";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";
import styles from "./IncentiveProgramsPage.module.css";

const IncentiveProgramsPage = () => {
  const router = useRouter();

  const handleAddIncentivePlan = () => {
    // Adjust the route as necessary
    router.push("/company/companyhome/incentiveprograms/addnewplan");
  };

  const handleCreateNewPool = (poolType) => {
    // Adjust the route as necessary
    router.push(`/company/companyhome/incentiveprograms/addnewplan`);
  };

  const poolTypes = [
    "Stock Options",
    "Restricted Stock Units (RSUs)",
    "Restricted Stock Awards (RSAs)",
    "Performance Based",
    "Other",
  ];

  return (
    <div className={styles.incentiveProgramsPage}>
      <div className={styles.headerContainer}>
        <HeaderTitle titleSuffix="Incentive Programs" showBack={false} />
        <button 
          className={styles.addIncentivePlanButton} 
          onClick={handleAddIncentivePlan}
        >
          + Add New Plan
        </button>
      </div>

      <div className={styles.sectionsContainer}>
        {poolTypes.map((type) => (
          <section key={type} className={styles.poolSection}>
            <h3 className={styles.subTitle}>{type}</h3>
            <div 
              className={styles.emptyPoolContainer}
              onClick={() => handleCreateNewPool(type)}
            >
              <p className={styles.emptyPoolText}>
                + Create a New Pool
              </p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default IncentiveProgramsPage;
