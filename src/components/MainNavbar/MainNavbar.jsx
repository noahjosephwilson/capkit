"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase/firebaseConfig";
import { doc, onSnapshot, collection, getDocs, getDoc } from "firebase/firestore";
import styles from "./MainNavbar.module.css";

const MainNavbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
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
    <header className={styles["main-navbar"]}>
      {/* Desktop Navigation */}
      <div className={styles["desktop-nav"]}>
        <div className={styles["navbar-left"]}>
          {/* Logo */}
          <img src="/assets/capkitlogo.png" alt="Logo" className={styles.logo} />

          {/* Company dropdown */}
          <div
            className={`${styles["company-dropdown-container"]} ${showCompanyDropdown ? styles.open : ""}`}
            onClick={() => setShowCompanyDropdown(!showCompanyDropdown)}
            ref={companyRef}
            aria-haspopup="true"
            aria-expanded={showCompanyDropdown}
          >
            <div className={styles["company-box"]}>
              <img
                src={companyImageUrl ? companyImageUrl : "/assets/profile-icon.png"}
                alt="Company"
                className={styles["company-icon"]}
              />
              <span className={styles["company-name"]}>
                {companyName ? companyName : " + Add New Company"}
              </span>
              <span className={`${styles["dropdown-arrow"]} ${showCompanyDropdown ? styles.open : ""}`}>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" />
                </svg>
              </span>
            </div>
            {showCompanyDropdown && (
              <div className={styles["company-dropdown"]} role="menu">
                <Link href="/createaddhome" className={styles["dropdown-item"]} role="menuitem">
                  <span className={styles["big-plus"]}>+</span>&nbsp;&nbsp;&nbsp;Add New Company
                </Link>
              </div>
            )}
          </div>

          {/* Invite Officers button */}
          <button className={styles["invite-btn"]}>
            <img src="/assets/inviteOfficerIcon.png" alt="Invite Icon" className={styles["invite-icon"]} />
            <span>Invite Officers</span>
          </button>
        </div>

        <div className={styles["navbar-right"]}>
          {/* Upgrade button */}
          <button className={styles["upgrade-btn"]}>Upgrade</button>

          {/* Segmented Toggle Control */}
          <div className={styles["toggle-container"]}>
            <div
              className={`${styles["toggle-option"]} ${!isPersonal ? styles.active : ""}`}
              onClick={() => {
                setIsPersonal(false);
                router.push("/company");
              }}
            >
              Company
            </div>
            <div
              className={`${styles["toggle-option"]} ${isPersonal ? styles.active : ""}`}
              onClick={() => {
                setIsPersonal(true);
                router.push("/personal");
              }}
            >
              Personal
            </div>
          </div>

          {/* Notification icon */}
          <div className={styles["notification-container"]}>
            <img src="/assets/notification.png" alt="Notifications" className={styles["notification-icon"]} />
          </div>

          {/* Profile container */}
          <div
            className={styles["profile-container"]}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            ref={profileRef}
            aria-haspopup="true"
            aria-expanded={showProfileMenu}
          >
            <img
              src={userProfileImage || "/assets/profile-icon.png"}
              alt="Profile"
              className={styles["profile-icon"]}
            />
            {showProfileMenu && (
              <div className={styles["profile-dropdown"]} role="menu">
                <Link href="/profile" className={styles["dropdown-item"]} role="menuitem">
                  Profile
                </Link>
                <Link href="/settings" className={styles["dropdown-item"]} role="menuitem">
                  Settings
                </Link>
                <button onClick={handleLogout} className={`${styles["dropdown-item"]} ${styles["logout-btn"]}`} role="menuitem">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={styles["mobile-nav"]}>
        <img src="/assets/capkitlogo.png" alt="Logo" className={styles.logo} />
        <button className={styles["hamburger-btn"]} onClick={() => setShowMobileMenu(!showMobileMenu)}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" />
          </svg>
        </button>
      </div>
      {showMobileMenu && (
        <div className={styles["mobile-dropdown"]}>
          <Link href="/company" className={styles["mobile-dropdown-item"]}>
            {companyName ? companyName : "Add New Company"}
          </Link>
          <button className={styles["mobile-dropdown-item"]}>Invite Officers</button>
          <Link href="/upgrade" className={styles["mobile-dropdown-item"]}>
            Upgrade
          </Link>
          <Link href="/company" className={styles["mobile-dropdown-item"]}>
            Company Dashboard
          </Link>
          <Link href="/personal" className={styles["mobile-dropdown-item"]}>
            Personal Dashboard
          </Link>
          <Link href="/notifications" className={styles["mobile-dropdown-item"]}>
            Notifications
          </Link>
          <Link href="/profile" className={styles["mobile-dropdown-item"]}>
            Profile
          </Link>
          <Link href="/settings" className={styles["mobile-dropdown-item"]}>
            Settings
          </Link>
          <button onClick={handleLogout} className={styles["mobile-dropdown-item"]}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default MainNavbar;
