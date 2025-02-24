"use client";

import React from "react";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";
import styles from "./ExerciseRequestsPage.module.css";
import ExerciseRequestsCard from "../../../components/ExerciseRequestsCard/ExerciseRequestsCard";

// Sample data arrays (these would typically come from props or an API)
const pendingRequests = [
  { id: 1, name: "Jane Doe", email: "jane.doe@example.com", planType: "Stock Option", shares: 1000, profileImage: "/images/jane.jpg", status: "pending", requestDate: "2025-02-20" },
  { id: 4, name: "Bob Martin", email: "bob.martin@example.com", planType: "RSA", shares: 750, profileImage: "/images/bob.jpg", status: "pending", requestDate: "2025-02-23" },
];

const approvedRequests = [
  { id: 2, name: "John Smith", email: "john.smith@example.com", planType: "RSU", shares: 500, profileImage: "/images/john.jpg", status: "approved", requestDate: "2025-02-18", actionDate: "2025-02-21", actionBy: "Manager Mike" },
  { id: 5, name: "Sara Connor", email: "sara.connor@example.com", planType: "Performance Based", shares: 300, profileImage: "/images/sara.jpg", status: "approved", requestDate: "2025-02-17", actionDate: "2025-02-20", actionBy: "Manager Mike" },
];

const deniedRequests = [
  { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", planType: "Performance Based", shares: 300, profileImage: "/images/alice.jpg", status: "denied", requestDate: "2025-02-19", actionDate: "2025-02-22", actionBy: "Manager Mike" },
  { id: 6, name: "Tom Baker", email: "tom.baker@example.com", planType: "Other", shares: 200, profileImage: "/images/tom.jpg", status: "denied", requestDate: "2025-02-16", actionDate: "2025-02-19", actionBy: "Manager Mike" },
];

const Section = ({ title, requests }) => (
  <section className={styles.requestSection}>
    <h2 className={styles.sectionTitle}>{title}</h2>
    <div className={styles.requestsContainer}>
      {requests.map((request) => (
        <ExerciseRequestsCard key={request.id} request={request} />
      ))}
    </div>
  </section>
);

const ExerciseRequestsPage = () => {
  return (
    <div className={styles.exerciseRequestsPage}>
      <header className={styles.exerciseRequestsHeader}>
        <div className={styles.headerLeft}>
          <HeaderTitle titleSuffix="Exercise Requests" showBack={false} />
        </div>
      </header>
      <Section title="Pending Requests" requests={pendingRequests} />
      <Section title="Approved Requests" requests={approvedRequests} />
      <Section title="Denied Requests" requests={deniedRequests} />
    </div>
  );
};

export default ExerciseRequestsPage;
