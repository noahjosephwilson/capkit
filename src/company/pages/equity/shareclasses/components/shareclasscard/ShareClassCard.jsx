import React from "react";
import { useRouter } from "next/navigation";
import styles from "./ShareClassCard.module.css";

const ShareClassCard = ({ label, description, cardDescription }) => {
  const router = useRouter();

  const handleView = (e) => {
    e.stopPropagation();
    router.push(
      `/company/companyhome/shareclasses/viewshareclass?label=${encodeURIComponent(
        label
      )}`
    );
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    router.push(
      `/company/companyhome/shareclasses/editshareclass?label=${encodeURIComponent(
        label
      )}`
    );
  };

  return (
    <div className={styles["shareclass-card"]}>
      <div className={styles["card-header"]}>
        <div className={styles["shareclass-acronym"]}>{label}</div>
        <div className={styles["shareclass-name"]}>{description}</div>
        <hr className={styles["header-divider"]} />
      </div>
      <div className={styles["card-stats"]}>
        <div className={styles["stat-row"]}>
          <span className={styles["stat-label"]}>Shares authorised</span>
          <span className={styles["stat-value"]}>23,413</span>
        </div>
        <div className={styles["stat-row"]}>
          <span className={styles["stat-label"]}>Shares issued</span>
          <span className={styles["stat-value"]}>0</span>
        </div>
        <div className={styles["stat-row"]}>
          <span className={styles["stat-label"]}>Shares unissued</span>
          <span className={styles["stat-value"]}>23,413</span>
        </div>
        <div className={styles["stat-row"]}>
          <span className={styles["stat-label"]}>Total invested</span>
          <span className={styles["stat-value"]}>$0.00</span>
        </div>
        <div className={styles["stat-row"]}>
          <span className={styles["stat-label"]}>Total unpaid</span>
          <span className={styles["stat-value"]}>$0.00</span>
        </div>
        <div className={styles["stat-row"]}>
          <span className={styles["stat-label"]}>Per stock price</span>
          <span className={styles["stat-value"]}>-</span>
        </div>
        <hr className={styles["stats-divider"]} />
      </div>
      <div className={styles["card-description"]}>
        <p>
          <strong>Description:</strong> {cardDescription}
        </p>
      </div>
      <div className={styles["card-footer"]}>
        <button className={styles["edit-btn"]} onClick={handleEdit}>
          Edit
        </button>
        <button className={styles["view-btn"]} onClick={handleView}>
          View
        </button>
      </div>
    </div>
  );
};

export default ShareClassCard;
