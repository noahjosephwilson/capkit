import React, { useState, useEffect, useRef, Suspense } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { useCompany } from "../../../contexts/CompanyContext";
import { useAuth } from "../../../contexts/AuthContext";
import "./SearchStakeholderPage.css";

// Lazy-load EditStakeholder to break potential circular dependencies.
const EditStakeholder = React.lazy(() =>
  import("../StakeholderDetailsPage/StakeholderDetailsPage")
);

const placeholderImage = "https://via.placeholder.com/30";

const SearchStakeholderPage = ({ mode }) => {
  // Component state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  // Stakeholders will be an array of objects: { id, fullName, profileImage }
  const [stakeholders, setStakeholders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // selectedStakeholder state for edit mode
  const [selectedStakeholder, setSelectedStakeholder] = useState(null);
  const dropdownRef = useRef(null);

  // Get current company ID and authenticated user from context.
  const { currentCompanyId, setCurrentCompanyId } = useCompany();
  const { currentUser } = useAuth();

  // Fetch company ID if not set.
  useEffect(() => {
    const fetchCompanyId = async () => {
      if (!currentCompanyId && currentUser) {
        try {
          const myCompaniesRef = collection(
            db,
            "users",
            currentUser.uid,
            "mycompanies"
          );
          const querySnapshot = await getDocs(myCompaniesRef);
          if (!querySnapshot.empty) {
            const firstDoc = querySnapshot.docs[0];
            const { companyId } = firstDoc.data();
            setCurrentCompanyId(companyId);
          } else {
            setError("No company found for this user.");
          }
        } catch (err) {
          console.error("Error fetching company id:", err);
          setError("Error fetching company id: " + err.message);
        }
      }
    };

    fetchCompanyId();
  }, [currentCompanyId, currentUser, setCurrentCompanyId]);

  // Fetch stakeholders when dropdown is open.
  useEffect(() => {
    const fetchStakeholdersIfNeeded = async () => {
      if (dropdownOpen && currentCompanyId && stakeholders.length === 0) {
        setLoading(true);
        try {
          const stakeholdersRef = collection(
            db,
            "companies",
            currentCompanyId,
            "stakeholders"
          );
          const snapshot = await getDocs(stakeholdersRef);
          if (snapshot.empty) {
            setStakeholders([]);
          } else {
            const fetchedStakeholders = await Promise.all(
              snapshot.docs.map(async (docSnap) => {
                const data = docSnap.data();
                let fullName = `${data.firstName || ""} ${data.lastName || ""}`.trim();
                if (data.nickname) {
                  fullName += ` (${data.nickname})`;
                }
                let profileImage = placeholderImage;
                if (data.email) {
                  try {
                    const usersRef = collection(db, "users");
                    const q = query(usersRef, where("email", "==", data.email));
                    const userSnapshot = await getDocs(q);
                    if (!userSnapshot.empty) {
                      const userDoc = userSnapshot.docs[0];
                      const userData = userDoc.data();
                      profileImage = userData.profileImage || placeholderImage;
                    }
                  } catch (userErr) {
                    console.error(
                      "Error fetching user profile image for",
                      data.email,
                      userErr
                    );
                  }
                }
                return { id: docSnap.id, fullName, profileImage };
              })
            );
            setStakeholders(fetchedStakeholders);
          }
        } catch (err) {
          console.error("Error fetching stakeholders:", err);
          setError("Error fetching stakeholders: " + err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchStakeholdersIfNeeded();
  }, [dropdownOpen, currentCompanyId, stakeholders.length]);

  // Filter stakeholders based on search text.
  const filteredStakeholders = stakeholders.filter(
    (option) =>
      option &&
      option.fullName &&
      option.fullName.toLowerCase().includes(searchText.toLowerCase())
  );

  // Close dropdown when clicking outside.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handler for input changes.
  const handleInputChange = (event) => {
    setSearchText(event.target.value);
    setDropdownOpen(true);
  };

  // Handler when an option is clicked.
  const handleOptionClick = (option) => {
    if (mode === "edit") {
      // Set the selected stakeholder for editing.
      setSelectedStakeholder(option);
    } else if (mode === "details") {
      setSearchText(option.fullName);
      setDropdownOpen(false);
    }
  };

  // In edit mode, if a stakeholder has been selected, render the EditStakeholder component inside a Suspense.
  if (mode === "edit" && selectedStakeholder) {
    return (
      <Suspense fallback={<div>Loading Edit Form...</div>}>
        <EditStakeholder
          stakeholderId={selectedStakeholder.id}
          onBack={() => setSelectedStakeholder(null)}
        />
      </Suspense>
    );
  }

  return (
    <div className="search-page">
      <h1 className="search-title">Select Stakeholder</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="dropdown-container" ref={dropdownRef}>
        <input
          type="text"
          placeholder="Choose an option..."
          value={searchText}
          onChange={handleInputChange}
          onFocus={() => setDropdownOpen(true)}
          className="dropdown-input"
        />
        {dropdownOpen && (
          <ul className="dropdown-list">
            {loading ? (
              <li className="dropdown-item">Loading...</li>
            ) : stakeholders.length === 0 ? (
              <li className="dropdown-item no-match">There are no stakeholders</li>
            ) : filteredStakeholders.length > 0 ? (
              filteredStakeholders.map((option, index) => (
                <li
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleOptionClick(option)}
                >
                  <img src={option.profileImage} alt="Avatar" className="dropdown-icon" />
                  <span>{option.fullName}</span>
                </li>
              ))
            ) : (
              <li className="dropdown-item no-match">No matches found</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchStakeholderPage;
