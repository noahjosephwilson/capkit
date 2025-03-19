"use client";
import React from "react";
import Breadcrumb from "@/company/components/breadcrumb/Breadcrumb";
import RequestsTable from "@/company/pages/equity/exerciserequests/components/requeststable/RequestsTable"; // adjust path as needed
import styles from "./ExerciseRequestsPage.module.css";

// Dummy data for demonstration
const pendingRequests = [
  {
    id: 1,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    planType: "Stock Option",
    shares: 1000,
    profileImage: "https://via.placeholder.com/40",
    status: "pending",
    requestDate: "2025-02-20",
  },
  {
    id: 4,
    name: "Bob Martin",
    email: "bob.martin@example.com",
    planType: "RSA",
    shares: 750,
    profileImage: "https://via.placeholder.com/40",
    status: "pending",
    requestDate: "2025-02-23",
  },
];

const approvedRequests = [
  {
    id: 2,
    name: "John Smith",
    email: "john.smith@example.com",
    planType: "RSU",
    shares: 500,
    profileImage: "https://via.placeholder.com/40",
    status: "approved",
    requestDate: "2025-02-18",
    actionDate: "2025-02-21",
    actionBy: "Manager Mike",
  },
  {
    id: 5,
    name: "Sara Connor",
    email: "sara.connor@example.com",
    planType: "Performance Based",
    shares: 300,
    profileImage: "https://via.placeholder.com/40",
    status: "approved",
    requestDate: "2025-02-17",
    actionDate: "2025-02-20",
    actionBy: "Manager Mike",
  },
];

const deniedRequests = [
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    planType: "Performance Based",
    shares: 300,
    profileImage: "https://via.placeholder.com/40",
    status: "denied",
    requestDate: "2025-02-19",
    actionDate: "2025-02-22",
    actionBy: "Manager Mike",
  },
  {
    id: 6,
    name: "Tom Baker",
    email: "tom.baker@example.com",
    planType: "Other",
    shares: 200,
    profileImage: "https://via.placeholder.com/40",
    status: "denied",
    requestDate: "2025-02-16",
    actionDate: "2025-02-19",
    actionBy: "Manager Mike",
  },
];

const allRequests = [...pendingRequests, ...approvedRequests, ...deniedRequests];

function ExerciseRequestsPage() {
  const breadcrumbItems = [{ name: "Exercise Requests" }];

  return (
    <div className={styles.exerciseRequests}>
      <Breadcrumb breadcrumbItems={breadcrumbItems} titleSuffix="" showBack />

      <header className={styles.header}>
        <h1>Exercise Requests</h1>
      </header>

      {/* Render the updated table with sorting */}
      <RequestsTable requests={allRequests} />
    </div>
  );
}

export default ExerciseRequestsPage;
