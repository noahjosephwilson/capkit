"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase/firebaseConfig"; // Firestore instance
import { doc, onSnapshot, collection, getDocs, getDoc } from "firebase/firestore";
import "./MainNavbar.css";
import profileIcon from "../../../public/assets/profile-icon.png";
import notificationIcon from "../../../public/assets/notification.png";
import inviteIcon from "../../../public/assets/inviteOfficerIcon.png";

const MainNavbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyImageUrl, setCompanyImageUrl] = useState("");
  const [isPersonal, setIsPersonal] = useState(false);
  const profileRef = useRef(null);
  const companyRef = useRef(null);
  const router = useRouter();
  const { currentUser, logout } = useAuth();

  // New state for the user's profile image from Firestore
  const [userProfileImage, setUserProfileImage] = useState(null);

  // Real-time listener: fetch the user's profile image from Firestore
  useEffect(() => {
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);
      const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserProfileImage(data.profileImage || null);
        }
      });
      return () => unsubscribe();
    }
  }, [currentUser]);

  // Close profile dropdown if clicking outside
  useEffect(() => {
    const handleClickOutsideProfile = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideProfile);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideProfile);
    };
  }, []);

  // Close company dropdown if clicking outside
  useEffect(() => {
    const handleClickOutsideCompany = (event) => {
      if (companyRef.current && !companyRef.current.contains(event.target)) {
        setShowCompanyDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideCompany);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideCompany);
    };
  }, []);

  // Fetch the user's mycompanies subcollection.
  useEffect(() => {
    const fetchMyCompany = async () => {
      if (currentUser) {
        try {
          const myCompaniesRef = collection(db, "users", currentUser.uid, "mycompanies");
          const querySnapshot = await getDocs(myCompaniesRef);

          if (querySnapshot.empty) {
            setCompanyName("");
            setCompanyImageUrl("");
          } else {
            const firstDoc = querySnapshot.docs[0];
            const { companyId } = firstDoc.data();
            console.log("Found companyId from mycompanies:", companyId);
            const companyDocRef = doc(db, "companies", companyId);
            const companySnap = await getDoc(companyDocRef);
            if (companySnap.exists()) {
              const companyData = companySnap.data();
              setCompanyName(companyData.companyName || "");
              setCompanyImageUrl(companyData.imageUrl || "");
            } else {
              setCompanyName("");
              setCompanyImageUrl("");
            }
          }
        } catch (error) {
          console.error("Error fetching company info from mycompanies:", error);
        }
      }
    };

    fetchMyCompany();
  }, [currentUser]);

  // Logout handler using Next.js router
  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="main-navbar">
      <div className="navbar-left">
        {/* Non-clickable brand */}
        <span className="brand">Orbat</span>

        {/* Company dropdown */}
        <div
          className={`company-dropdown-container ${showCompanyDropdown ? "open" : ""}`}
          onClick={() => setShowCompanyDropdown(!showCompanyDropdown)}
          ref={companyRef}
          aria-haspopup="true"
          aria-expanded={showCompanyDropdown}
        >
          <div className="company-box">
            <img
              src={companyImageUrl ? companyImageUrl : profileIcon}
              alt="Company"
              className="company-icon"
            />
            <span className="company-name">
              {companyName ? companyName : " + Add New Company"}
            </span>
            <span className={`dropdown-arrow ${showCompanyDropdown ? "open" : ""}`}>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" />
              </svg>
            </span>
          </div>
          {showCompanyDropdown && (
            <div className="company-dropdown" role="menu">
              <Link href="/createaddhome" className="dropdown-item" role="menuitem">
                <span className="big-plus">+</span>&nbsp;&nbsp;&nbsp;Add New Company
              </Link>
            </div>
          )}
        </div>

        {/* Upgrade button */}
        <button className="upgrade-btn">Upgrade</button>
      </div>

      <div className="navbar-right">
        {/* Invite Officer Button */}
        <button className="invite-btn">
          <img src={inviteIcon} alt="Invite Icon" className="invite-icon" />
          <span>Invite Officers</span>
        </button>

        {/* Segmented Toggle Control */}
        <div className="toggle-container">
          <div
            className={`toggle-option ${!isPersonal ? "active" : ""}`}
            onClick={() => setIsPersonal(false)}
          >
            Company
          </div>
          <div
            className={`toggle-option ${isPersonal ? "active" : ""}`}
            onClick={() => setIsPersonal(true)}
          >
            Personal
          </div>
        </div>

        {/* Notification icon */}
        <div className="notification-container">
          <img src={notificationIcon} alt="Notifications" className="notification-icon" />
        </div>

        {/* Profile container */}
        <div
          className="profile-container"
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          ref={profileRef}
          aria-haspopup="true"
          aria-expanded={showProfileMenu}
        >
          <img src={userProfileImage || profileIcon} alt="Profile" className="profile-icon" />
          {showProfileMenu && (
            <div className="profile-dropdown" role="menu">
              <Link href="/profile" className="dropdown-item" role="menuitem">
                Profile
              </Link>
              <Link href="/settings" className="dropdown-item" role="menuitem">
                Settings
              </Link>
              <button onClick={handleLogout} className="dropdown-item logout-btn" role="menuitem">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default MainNavbar;
