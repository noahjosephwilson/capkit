"use client";

import React, { useState, useMemo, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Download, Plus, MoreVertical, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { db } from "../../../firebase/firebaseConfig";
import { useCompany } from "../../../contexts/CompanyContext";
import HeaderTitle from "../../../components/HeaderTitle/HeaderTitle";
import styles from "./CapTablePage.module.css";

const CapTablePage = () => {
  const { currentCompanyId } = useCompany();
  const router = useRouter();
  const [capTableData, setCapTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  // Local state for search and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "ownership", direction: "descending" });

  // New state for panel toggling and details shown options
  const [activePanel, setActivePanel] = useState(null);
  const [detailsShownOptions, setDetailsShownOptions] = useState({
    name: true,
    role: true,
    shares: true,
    ownership: true,
    invested: true,
  });

  const togglePanel = (panel) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  const handleCheckboxChange = (option) => {
    setDetailsShownOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  // Firestore fetch: load stakeholders for the current company
  useEffect(() => {
    const fetchStakeholders = async () => {
      if (!currentCompanyId) {
        setError("No company selected.");
        setLoading(false);
        return;
      }
      try {
        const stakeholdersRef = collection(
          db,
          "companies",
          currentCompanyId,
          "stakeholders"
        );
        const snapshot = await getDocs(stakeholdersRef);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCapTableData(data);
      } catch (err) {
        setError("Error fetching stakeholders: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStakeholders();
  }, [currentCompanyId]);

  // Helper functions to compute values per stakeholder
  const computeCommonShares = (stakeholder) => {
    if (!stakeholder.commonStockTransactions) return 0;
    return stakeholder.commonStockTransactions.reduce((sum, transaction) => {
      const shares = Number(transaction.shares) || 0;
      return sum + shares;
    }, 0);
  };

  const computePreferredShares = (stakeholder) => {
    if (!stakeholder.preferredStockTransactions) return 0;
    return stakeholder.preferredStockTransactions.reduce((sum, transaction) => {
      const shares = Number(transaction.shares) || 0;
      return sum + shares;
    }, 0);
  };

  const computeInvestedAmount = (stakeholder) => {
    let invested = 0;
    if (stakeholder.commonStockTransactions) {
      invested += stakeholder.commonStockTransactions.reduce((sum, transaction) => {
        const shares = Number(transaction.shares) || 0;
        const price = Number(transaction.price) || 0;
        return sum + shares * price;
      }, 0);
    }
    if (stakeholder.preferredStockTransactions) {
      invested += stakeholder.preferredStockTransactions.reduce((sum, transaction) => {
        const shares = Number(transaction.shares) || 0;
        const price = Number(transaction.price) || 0;
        return sum + shares * price;
      }, 0);
    }
    return invested;
  };

  // Calculate overall total shares for ownership percentage
  const overallTotalShares = capTableData.reduce((acc, stakeholder) => {
    const common = computeCommonShares(stakeholder);
    const preferred = computePreferredShares(stakeholder);
    return acc + common + preferred;
  }, 0);

  // Filter data based on search term
  const filteredData = capTableData.filter((entry) => {
    const name = `${entry.firstName || ""} ${entry.lastName || ""}`.toLowerCase();
    const role = (entry.role || "").toLowerCase();
    return (
      name.includes(searchTerm.toLowerCase()) ||
      role.includes(searchTerm.toLowerCase())
    );
  });

  // Sorting logic
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        let aValue, bValue;
        switch (sortConfig.key) {
          case "name":
            aValue = `${a.firstName || ""} ${a.lastName || ""}`.toLowerCase();
            bValue = `${b.firstName || ""} ${b.lastName || ""}`.toLowerCase();
            break;
          case "role":
            aValue = (a.role || "").toLowerCase();
            bValue = (b.role || "").toLowerCase();
            break;
          case "commonShares":
            aValue = computeCommonShares(a);
            bValue = computeCommonShares(b);
            break;
          case "preferredShares":
            aValue = computePreferredShares(a);
            bValue = computePreferredShares(b);
            break;
          case "ownership":
            aValue =
              overallTotalShares > 0
                ? (computeCommonShares(a) + computePreferredShares(a)) / overallTotalShares
                : 0;
            bValue =
              overallTotalShares > 0
                ? (computeCommonShares(b) + computePreferredShares(b)) / overallTotalShares
                : 0;
            break;
          case "invested":
            aValue = computeInvestedAmount(a);
            bValue = computeInvestedAmount(b);
            break;
          default:
            aValue = 0;
            bValue = 0;
        }
        if (typeof aValue === "string") {
          return sortConfig.direction === "ascending"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else if (typeof aValue === "number") {
          return sortConfig.direction === "ascending" ? aValue - bValue : bValue - aValue;
        } else {
          return 0;
        }
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig, overallTotalShares]);

  // Navigation Handlers
  const handleAddPersonNavigation = () => {
    router.push("/company/companyhome/shareholders/addstakeholder");
  };

  const handleEditStakeholder = () => {
    router.push(`/company/companyhome/shareholders/editstakeholder`);
    setDropdownOpen(null);
  };

  const handleViewStakeholder = () => {
    router.push(`/company/companyhome/shareholders/stakeholderdetails`);
    setDropdownOpen(null);
  };

  const handleModifyTransactions = () => {
    router.push(`/company/companyhome/shareholders/modifytransactions`);
    setDropdownOpen(null);
  };

  // Delete action (only updates local state in this example)
  const handleDeleteStakeholder = (stakeholder) => {
    if (
      window.confirm(
        `Are you sure you want to delete stakeholder: ${stakeholder.firstName || ""} ${stakeholder.lastName || ""}?`
      )
    ) {
      setCapTableData((prev) => prev.filter((s) => s.id !== stakeholder.id));
    }
    setDropdownOpen(null);
  };

  const handleDownload = () => {
    alert("Download functionality not implemented.");
  };

  const toggleDropdown = (id) => {
    setDropdownOpen((prev) => (prev === id ? null : id));
  };

  if (loading) {
    return <div className={styles.capTablePage}>Loading cap table...</div>;
  }

  if (error) {
    return <div className={styles.capTablePage}>{error}</div>;
  }

  return (
    <div className={styles.capTablePage}>
      {/* Header */}
      <header className={styles.capTableHeader}>
        <div className={styles.headerLeft}>
          <HeaderTitle titleSuffix="Cap Table" showBack={false} />
        </div>
        <div className={styles.capTableControls}>
          <div className={styles.searchContainer}>
            <div className={styles.inputWithIcon}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search..."
                className={styles.capTableSearch}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.capTableButtons}>
            {/* Details Shown button placed to the left */}
            <button
              className={`${styles.panelButton} ${activePanel === "detailsShown" ? styles.activeButton : ""}`}
              onClick={() => togglePanel("detailsShown")}
            >
              Details Shown
            </button>
            <button className={styles.capTableButton} onClick={handleAddPersonNavigation}>
              <Plus size={16} style={{ marginRight: "0.5rem" }} /> Add Stakeholder
            </button>
            <button className={styles.capTableButton} onClick={handleDownload}>
              <Download size={16} style={{ marginRight: "0.5rem" }} /> Download Table
            </button>
          </div>
        </div>
      </header>

      {/* "Details Shown" Panel */}
      {activePanel === "detailsShown" && (
        <div className={styles.panelContainer}>
          <div className={styles.panelTitle}>Details Shown</div>
          <div className={styles.detailsSection}>
            <h4>Basics</h4>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={detailsShownOptions.name}
                onChange={() => handleCheckboxChange("name")}
              />
              Name
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={detailsShownOptions.role}
                onChange={() => handleCheckboxChange("role")}
              />
              Role
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={detailsShownOptions.shares}
                onChange={() => handleCheckboxChange("shares")}
              />
              Shares
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={detailsShownOptions.ownership}
                onChange={() => handleCheckboxChange("ownership")}
              />
              % Ownership
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={detailsShownOptions.invested}
                onChange={() => handleCheckboxChange("invested")}
              />
              Invested Amount
            </label>
          </div>
        </div>
      )}

      {/* Table */}
      <div className={styles.capTableContainer}>
        <table className={styles.capTable}>
          <thead>
            <tr>
              <th onClick={() => requestSort("name")}>
                Name{" "}
                {sortConfig.key === "name" && (
                  <span className={styles.sortArrow}>
                    {sortConfig.direction === "ascending" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th onClick={() => requestSort("role")}>
                Role{" "}
                {sortConfig.key === "role" && (
                  <span className={styles.sortArrow}>
                    {sortConfig.direction === "ascending" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th onClick={() => requestSort("commonShares")}>
                Common Shares{" "}
                {sortConfig.key === "commonShares" && (
                  <span className={styles.sortArrow}>
                    {sortConfig.direction === "ascending" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th onClick={() => requestSort("preferredShares")}>
                Preferred Shares{" "}
                {sortConfig.key === "preferredShares" && (
                  <span className={styles.sortArrow}>
                    {sortConfig.direction === "ascending" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th onClick={() => requestSort("ownership")}>
                % Ownership{" "}
                {sortConfig.key === "ownership" && (
                  <span className={styles.sortArrow}>
                    {sortConfig.direction === "ascending" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th onClick={() => requestSort("invested")}>
                Invested Amount{" "}
                {sortConfig.key === "invested" && (
                  <span className={styles.sortArrow}>
                    {sortConfig.direction === "ascending" ? "▲" : "▼"}
                  </span>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((entry) => {
              const name = `${entry.firstName || ""} ${entry.lastName || ""}`.trim() || "N/A";
              const role = entry.role || "N/A";
              const commonShares = computeCommonShares(entry);
              const preferredShares = computePreferredShares(entry);
              const totalShares = commonShares + preferredShares;
              const percentOwnership =
                overallTotalShares > 0
                  ? ((totalShares / overallTotalShares) * 100).toFixed(2)
                  : "0.00";
              const invested = computeInvestedAmount(entry);
              return (
                <tr key={entry.id}>
                  <td className={styles.nameCell}>
                    <div className={styles.nameContent}>
                      <img
                        src={entry.image || "https://via.placeholder.com/40"}
                        alt={name}
                        className={styles.capTableAvatar}
                      />
                      <span>{name}</span>
                    </div>
                    <div className={styles.dropdownContainer}>
                      <button
                        className={styles.dropdownTrigger}
                        onClick={() => toggleDropdown(entry.id)}
                      >
                        <MoreVertical size={16} />
                      </button>
                      {dropdownOpen === entry.id && (
                        <div className={styles.dropdownMenu}>
                          <div
                            className={styles.dropdownItem}
                            onClick={() => handleViewStakeholder(entry)}
                          >
                            View Details
                          </div>
                          <div
                            className={styles.dropdownItem}
                            onClick={() => handleEditStakeholder(entry)}
                          >
                            Edit Stakeholder
                          </div>
                          <div
                            className={styles.dropdownItem}
                            onClick={() => handleModifyTransactions(entry)}
                          >
                            Modify Transactions
                          </div>
                          <div
                            className={styles.dropdownItem}
                            onClick={() => handleDeleteStakeholder(entry)}
                          >
                            Delete Stakeholder
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td>{role}</td>
                  <td>{commonShares ? commonShares.toLocaleString() : "0"}</td>
                  <td>{preferredShares ? preferredShares.toLocaleString() : "0"}</td>
                  <td>{percentOwnership}%</td>
                  <td>{invested ? "$" + invested.toLocaleString() : "0"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CapTablePage;
