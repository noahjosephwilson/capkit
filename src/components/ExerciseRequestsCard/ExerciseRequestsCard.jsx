"use client";

import React from "react";
import styles from "./ExerciseRequestsCard.module.css";

const ExerciseRequestsCard = ({ request }) => {
  // Determine status style
  let statusClass = "";
  if (request.status === "pending") {
    statusClass = styles.statusPending;
  } else if (request.status === "approved") {
    statusClass = styles.statusApproved;
  } else if (request.status === "denied") {
    statusClass = styles.statusDenied;
  }
  // Determine hyperlink text and URL based on status
  const linkText =
    request.status === "pending" ? "Review Request" : "View Details";
  const linkUrl =
    request.status === "pending"
      ? `/requests/${request.id}/action`
      : `/requests/${request.id}/details`;

  return (
    <div className={styles.requestCard}>
      <div className={styles.leftColumn}>
        <div className={styles.profileSection}>
          <img
            src={request.profileImage}
            alt={request.name}
            className={styles.profileImage}
          />
          <div className={styles.requestDetails}>
            <h3 className={styles.requestName}>{request.name}</h3>
            <p className={styles.requestEmail}>{request.email}</p>
          </div>
        </div>
        <div className={styles.planInfo}>
          <p>
            <strong>Plan Type:</strong> {request.planType}
          </p>
          <p>
            <strong>Number of Shares:</strong> {request.shares}
          </p>
          <p>
            <strong>Date of Request:</strong> {request.requestDate}
          </p>
        </div>
      </div>
      {request.status !== "pending" && (
        <div className={styles.rightColumn}>
          <p>
            <strong>
              {request.status === "approved"
                ? "Date Approved:"
                : "Date Denied:"}
            </strong>{" "}
            {request.actionDate}
          </p>
          <p>
            <strong>
              {request.status === "approved" ? "Approved By:" : "Denied By:"}
            </strong>{" "}
            {request.actionBy}
          </p>
        </div>
      )}
      <div className={styles.footerRow}>
        <div className={`${styles.requestStatus} ${statusClass}`}>
          {request.status.toUpperCase()}
        </div>
        <a href={linkUrl} className={styles.requestLink}>
          {linkText}
        </a>
      </div>
    </div>
  );
};

export default ExerciseRequestsCard;
