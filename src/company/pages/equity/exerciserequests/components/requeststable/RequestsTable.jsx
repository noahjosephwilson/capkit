"use client";
import React, { useState } from "react";
import { FiSearch, FiChevronUp, FiChevronDown } from "react-icons/fi";
import styles from "./RequestsTable.module.css";

/**
 * Convert internal status values to display text.
 * E.g. "pending" => "Requested", "approved" => "Approved", "denied" => "Denied"
 */
function getStatusLabel(status) {
  switch (status) {
    case "pending":
      return "Requested";
    case "approved":
      return "Approved";
    case "denied":
      return "Denied";
    default:
      return status.toUpperCase();
  }
}

function RequestsTable({ requests }) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Custom order for status sorting
  const statusOrder = ["pending", "approved", "denied"];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Filter based on search term (matches name, email, or planType)
  const filteredRequests = requests.filter((r) => {
    const term = search.toLowerCase();
    return (
      r.name.toLowerCase().includes(term) ||
      r.email.toLowerCase().includes(term) ||
      r.planType.toLowerCase().includes(term)
    );
  });

  // Sort the filtered data
  const sortedRequests = [...filteredRequests].sort((a, b) => {
    if (!sortField) return 0;

    if (sortField === "status") {
      // Use custom order for status
      const aIndex = statusOrder.indexOf(a.status);
      const bIndex = statusOrder.indexOf(b.status);
      return sortOrder === "asc" ? aIndex - bIndex : bIndex - aIndex;
    } else if (sortField === "shares") {
      return sortOrder === "asc" ? a.shares - b.shares : b.shares - a.shares;
    } else if (sortField === "requestDate") {
      return sortOrder === "asc"
        ? new Date(a.requestDate) - new Date(b.requestDate)
        : new Date(b.requestDate) - new Date(a.requestDate);
    } else if (
      typeof a[sortField] === "string" &&
      typeof b[sortField] === "string"
    ) {
      const aVal = a[sortField].toLowerCase();
      const bVal = b[sortField].toLowerCase();
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    }

    return 0;
  });

  // Render sort icon for specific columns
  const renderSortIcon = (field) => {
    if (sortField === field) {
      return sortOrder === "asc" ? (
        <FiChevronUp className={styles.sortIcon} />
      ) : (
        <FiChevronDown className={styles.sortIcon} />
      );
    }
    // If column not actively sorted, show an inactive up arrow
    return <FiChevronUp className={styles.sortIconInactive} />;
  };

  return (
    <div className={styles.container}>
      {/* Toolbar with search */}
      <div className={styles.toolbar}>
        <div className={styles.searchContainer}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search requests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <div className={styles.headerContent}>
                  <span className={styles.headerTitle}>Shareholder</span>
                </div>
              </th>
              <th
                onClick={() => handleSort("planType")}
                className={`${styles.sortableHeader} ${styles.pointer}`}
              >
                <div className={styles.headerContent}>
                  <span className={styles.headerTitle}>Plan Type</span>
                  <span className={styles.headerIcons}>
                    {renderSortIcon("planType")}
                  </span>
                </div>
              </th>
              <th
                onClick={() => handleSort("shares")}
                className={`${styles.sortableHeader} ${styles.pointer}`}
              >
                <div className={styles.headerContent}>
                  <span className={styles.headerTitle}>Shares</span>
                  <span className={styles.headerIcons}>
                    {renderSortIcon("shares")}
                  </span>
                </div>
              </th>
              <th
                onClick={() => handleSort("requestDate")}
                className={`${styles.sortableHeader} ${styles.pointer}`}
              >
                <div className={styles.headerContent}>
                  <span className={styles.headerTitle}>Request Date</span>
                  <span className={styles.headerIcons}>
                    {renderSortIcon("requestDate")}
                  </span>
                </div>
              </th>
              <th
                onClick={() => handleSort("status")}
                className={`${styles.sortableHeader} ${styles.pointer}`}
              >
                <div className={styles.headerContent}>
                  <span className={styles.headerTitle}>Status</span>
                  <span className={styles.headerIcons}>
                    {renderSortIcon("status")}
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedRequests.map((req) => (
              <tr key={req.id} className={styles.clickableRow}>
                <td className={styles.nameCell}>
                  <img
                    src={req.profileImage}
                    alt={req.name}
                    className={styles.profileImage}
                  />
                  <div>
                    <div className={styles.name}>{req.name}</div>
                    <div className={styles.email}>{req.email}</div>
                  </div>
                </td>
                <td>{req.planType}</td>
                <td>{req.shares}</td>
                <td>{req.requestDate}</td>
                <td>
                  <span className={`${styles.statusBadge} ${styles[req.status]}`}>
                    {/* "pending" => "Requested", "approved" => "Approved", etc. */}
                    <span className={styles.statusDot} />
                    {getStatusLabel(req.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RequestsTable;
