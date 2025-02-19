// CapTablePage.jsx
import React, { useState, useMemo, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Download, Plus, Edit3, Eye, Trash2, Search } from "lucide-react";
import { useRouter } from "next/navigation"; // Use Next.js router
import { db } from "../../firebase/firebaseConfig";
import { useCompany } from "../../contexts/CompanyContext";
import "./CapTablePage.css";

const CapTablePage = () => {
  const { currentCompanyId } = useCompany();
  const router = useRouter(); // Initialize Next.js router
  const [capTableData, setCapTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Local state for search and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "ownership", direction: "descending" });

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
    router.push("/dashboard/shareholders?tab=add");
  };

  const handleEditStakeholder = (stakeholder) => {
    router.push(`/dashboard/shareholders?tab=edit&id=${stakeholder.id}`);
  };

  const handleViewStakeholder = (stakeholder) => {
    router.push(`/dashboard/shareholders?tab=details&id=${stakeholder.id}`);
  };

  // Delete action (only updates local state in this example)
  const handleDeleteStakeholder = (stakeholder) => {
    if (
      window.confirm(
        `Are you sure you want to delete stakeholder: ${stakeholder.firstName || ""} ${stakeholder.lastName || ""}?`
      )
    ) {
      // In a real integration, delete from Firestore as well.
      setCapTableData((prev) => prev.filter((s) => s.id !== stakeholder.id));
    }
  };

  const handleDownload = () => {
    alert("Download functionality not implemented.");
  };

  if (loading) {
    return <div className="cap-table-page">Loading cap table...</div>;
  }

  if (error) {
    return <div className="cap-table-page error-message">{error}</div>;
  }

  return (
    <div className="cap-table-page">
      {/* Header */}
      <header className="cap-table-header">
        <div className="breadcrumb">Cap Table</div>
        <div className="cap-table-controls">
          <div className="search-container">
            <div className="input-with-icon">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search..."
                className="cap-table-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="cap-table-buttons">
            <button className="cap-table-button" onClick={handleAddPersonNavigation}>
              <Plus size={16} style={{ marginRight: "0.5rem" }} /> Add Person
            </button>
            <button className="cap-table-button" onClick={handleDownload}>
              <Download size={16} style={{ marginRight: "0.5rem" }} /> Download Table
            </button>
          </div>
        </div>
      </header>

      {/* Table */}
      <div className="cap-table-container">
        <table className="cap-table">
          <thead>
            <tr>
              <th onClick={() => requestSort("name")}>
                Name{" "}
                {sortConfig.key === "name" && (
                  <span className="sort-arrow">
                    {sortConfig.direction === "ascending" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th onClick={() => requestSort("role")}>
                Role{" "}
                {sortConfig.key === "role" && (
                  <span className="sort-arrow">
                    {sortConfig.direction === "ascending" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th onClick={() => requestSort("commonShares")}>
                Common Shares{" "}
                {sortConfig.key === "commonShares" && (
                  <span className="sort-arrow">
                    {sortConfig.direction === "ascending" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th onClick={() => requestSort("preferredShares")}>
                Preferred Shares{" "}
                {sortConfig.key === "preferredShares" && (
                  <span className="sort-arrow">
                    {sortConfig.direction === "ascending" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th onClick={() => requestSort("ownership")}>
                % Ownership{" "}
                {sortConfig.key === "ownership" && (
                  <span className="sort-arrow">
                    {sortConfig.direction === "ascending" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th onClick={() => requestSort("invested")}>
                Invested Amount{" "}
                {sortConfig.key === "invested" && (
                  <span className="sort-arrow">
                    {sortConfig.direction === "ascending" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th>Actions</th>
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
                  <td>
                    <div className="name-cell">
                      <img
                        src={entry.image || "https://via.placeholder.com/40"}
                        alt={name}
                        className="cap-table-avatar"
                      />
                      {name}
                    </div>
                  </td>
                  <td>{role}</td>
                  <td>{commonShares ? commonShares.toLocaleString() : "0"}</td>
                  <td>{preferredShares ? preferredShares.toLocaleString() : "0"}</td>
                  <td>{percentOwnership}%</td>
                  <td>{invested ? "$" + invested.toLocaleString() : "0"}</td>
                  <td>
                    <div className="action-buttons">
                      <div className="action-button-container">
                        <button
                          className="action-button view-button"
                          onClick={() => handleViewStakeholder(entry)}
                        >
                          <Eye size={16} />
                        </button>
                        <div className="tooltip">View More</div>
                      </div>
                      <div className="action-button-container">
                        <button
                          className="action-button edit-button"
                          onClick={() => handleEditStakeholder(entry)}
                        >
                          <Edit3 size={16} />
                        </button>
                        <div className="tooltip">Edit</div>
                      </div>
                      <div className="action-button-container">
                        <button
                          className="action-button delete-button"
                          onClick={() => handleDeleteStakeholder(entry)}
                        >
                          <Trash2 size={16} />
                        </button>
                        <div className="tooltip">Delete</div>
                      </div>
                    </div>
                  </td>
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
