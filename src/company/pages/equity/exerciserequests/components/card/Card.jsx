"use client";
import React from "react";
import styles from "./Card.module.css";

const Card = ({ request }) => {
  // Choose the status styling based on request.status.
  const statusClass =
    request.status === "pending"
      ? styles.statusPending
      : request.status === "approved"
      ? styles.statusApproved
      : styles.statusDenied;

  // Choose the link text and URL based on status.
  const linkText = request.status === "pending" ? "Review" : "View";
  const linkUrl =
    request.status === "pending"
      ? `/requests/${request.id}/action`
      : `/requests/${request.id}/details`;

  return (
    <div className={styles.requestCard}>
      <div className={styles.cardContent}>
        <img
          src={request.profileImage}
          alt={request.name}
          className={styles.profileImage}
        />
        <span className={styles.requestInfo}>
          {request.name} ({request.planType}) – {request.requestDate}
        </span>
        <span className={`${styles.requestStatus} ${statusClass}`}>
          {request.status.toUpperCase()}
        </span>
        <a href={linkUrl} className={styles.requestLink}>
          {linkText}
        </a>
      </div>
    </div>
  );
};

export default Card;
