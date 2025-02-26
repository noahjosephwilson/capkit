"use client";

import React from "react";
import { useRouter } from "next/navigation";
import HeaderTitle from "../../../../components/HeaderTitle/HeaderTitle";
import styles from "./AddNewPlanPage.module.css";

const AddNewPlanPage = () => {
  const router = useRouter();
  const backPath = "/company/companyhome/incentiveprograms";

  return (
    <div className={styles.addNewPlanPage}>
      <header className={styles.header}>
        <HeaderTitle
          backLinkText="Incentive Programs"
          titleSuffix="Add New Plan"
          backPath={backPath}
          showBack={true}
        />
      </header>
      <div className={styles.content}>
        {/* Add your form or additional content for adding a new plan here */}
        <p>Fill out the details below to add a new plan.</p>
      </div>
    </div>
  );
};

export default AddNewPlanPage;
