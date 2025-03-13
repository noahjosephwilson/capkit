"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import RightPage from "./right/RightPage";
import styles from "./AddCodePage.module.css";

const AddCodePage = () => {
  const router = useRouter();
  const [joinCompanyCode, setJoinCompanyCode] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that the join company code is not empty.
    const newErrors = {};
    if (!joinCompanyCode.trim()) {
      newErrors.joinCompanyCode = "This field is required";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    // Process the join company code.
    console.log({ joinCompanyCode });
    
    // Navigate to the dashboard (or another route) on success.
    router.push("/company");
  };

  return (
    <div className={styles["ccd-page"]}>
      <div className={styles["left-container"]}>
        {/* Header strip with back arrow and Orbat name */}
        <div className={styles["ccd-header"]}>
          <div
            className={styles["ccd-back"]}
            onClick={() =>
              router.push("/landing/newcompany/home")
            }
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={styles["ccd-back-text"]}>Capkit</span>
          </div>
        </div>

        {/* Main content */}
        <div className={styles["ccd-content"]}>
          <h1>Add Company Code</h1>
          <p className={styles["ccd-disclaimer"]}>
            All fields marked with * are required.
          </p>
          <form onSubmit={handleSubmit} className={styles["ccd-form"]}>
            <label>Join Company Code *</label>
            {errors.joinCompanyCode && (
              <div className={styles["field-error"]}>
                {errors.joinCompanyCode}
              </div>
            )}
            <input
              type="text"
              value={joinCompanyCode}
              onChange={(e) => setJoinCompanyCode(e.target.value)}
              required
            />
            <button type="submit" className={styles["ccd-submit-button"]}>
              Submit
            </button>
          </form>
        </div>
      </div>
      <RightPage />
    </div>
  );
};

export default AddCodePage;
