"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase/firebaseConfig";
import { doc, onSnapshot, collection, getDocs, getDoc } from "firebase/firestore";
import styles from "./MainNavbar.module.css";

const Navbar = () => {
  // Desktop states
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  
  // Mobile states
  const [showMenu, setShowMenu] = useState(false);
  const [showSettingsSubmenu, setShowSettingsSubmenu] = useState(false);
  
  // Other states
  const [companyName, setCompanyName] = useState("");
  const [companyImageUrl, setCompanyImageUrl] = useState("");
  const [isPersonal, setIsPersonal] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [userProfileImage, setUserProfileImage] = useState(null);

  const profileRef = useRef(null);
  const companyRef = useRef(null);
  const menuRef = useRef(null);
  const router = useRouter();
  const { currentUser, logout } = useAuth();

  // Determine mobile view (<1024px)
  useEffect(() => {
    const checkMobileView = () => setIsMobileView(window.innerWidth < 1024);
    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  // Auto-close mobile menu when switching to desktop
  useEffect(() => {
    if (!isMobileView) {
      setShowMenu(false);
      setShowSettingsSubmenu(false);
    }
  }, [isMobileView]);

  // Listen for profile image changes from Firestore
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
    return () => document.removeEventListener("mousedown", handleClickOutsideProfile);
  }, []);

  // Close company dropdown if clicking outside
  useEffect(() => {
    const handleClickOutsideCompany = (event) => {
      if (companyRef.current && !companyRef.current.contains(event.target)) {
        setShowCompanyDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideCompany);
    return () => document.removeEventListener("mousedown", handleClickOutsideCompany);
  }, []);

  // Close mobile menu if clicking outside its container
  useEffect(() => {
    const handleClickOutsideMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
        setShowSettingsSubmenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideMenu);
    return () => document.removeEventListener("mousedown", handleClickOutsideMenu);
  }, []);

  // Fetch company info from Firestore
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
          console.error("Error fetching company info:", error);
        }
      }
    };
    fetchMyCompany();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Render the mobile menu options with fixed submenu buttons
  const renderMenuOptions = () => (
    <>
      <Link
        href="/dashboard"
        className={styles["dropdown-item"]}
        onClick={() => setShowMenu(false)}
      >
        Dashboard
      </Link>
      <Link
        href="/portfolio"
        className={styles["dropdown-item"]}
        onClick={() => setShowMenu(false)}
      >
        Portfolio
      </Link>
      <Link
        href="/offers"
        className={styles["dropdown-item"]}
        onClick={() => setShowMenu(false)}
      >
        Offers
      </Link>
      <Link
        href="/notifications"
        className={styles["dropdown-item"]}
        onClick={() => setShowMenu(false)}
      >
        Notifications
      </Link>
      <Link
        href="/documents"
        className={styles["dropdown-item"]}
        onClick={() => setShowMenu(false)}
      >
        Documents
      </Link>
      {isMobileView && (
        <>
          <div
            className={styles["settings-item"]}
            onClick={(e) => {
              e.stopPropagation();
              setShowSettingsSubmenu(!showSettingsSubmenu);
            }}
          >
            <span className={styles["settings-text"]}>Settings</span>
            <ChevronDown
              size={16}
              className={`${styles["submenu-arrow"]} ${showSettingsSubmenu ? styles.open : ""}`}
            />
          </div>
          {showSettingsSubmenu && (
            <>
              <Link
                href="/profile"
                className={styles["submenu-item"]}
                onClick={() => setShowMenu(false)}
              >
                Profile
              </Link>
              <Link
                href="/company"
                className={styles["submenu-item"]}
                onClick={() => setShowMenu(false)}
              >
                Switch to Company
              </Link>
              <button
                onClick={handleLogout}
                className={styles["submenu-item"]}
              >
                Logout
              </button>
            </>
          )}
        </>
      )}
    </>
  );

  return (
    <>
      <header className={styles["main-navbar"]}>
        {/* Desktop Navigation */}
        <div className={styles["desktop-nav"]}>
          <div className={styles["navbar-left"]}>
            <img src="/assets/capkitlogo.png" alt="Logo" className={styles.logo} />
            <div
              className={`${styles["company-dropdown-container"]} ${showCompanyDropdown ? styles.open : ""}`}
              onClick={() => setShowCompanyDropdown(!showCompanyDropdown)}
              ref={companyRef}
              aria-haspopup="true"
              aria-expanded={showCompanyDropdown}
            >
              <div className={styles["company-box"]}>
                <img
                  src={companyImageUrl || "/assets/profile-icon.png"}
                  alt="Company"
                  className={styles["company-icon"]}
                />
                <span className={styles["company-name"]}>
                  {companyName || " + Add New Company"}
                </span>
                <span
                  className={`${styles["dropdown-arrow"]} ${showCompanyDropdown ? styles.open : ""}`}
                >
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>
              </div>
              {showCompanyDropdown && (
                <div className={styles["company-dropdown"]} role="menu">
                  <Link
                    href="/createaddhome"
                    className={styles["dropdown-item"]}
                    role="menuitem"
                    onClick={() => setShowCompanyDropdown(false)}
                  >
                    <span className={styles["big-plus"]}>+</span> Add New Company
                  </Link>
                </div>
              )}
            </div>
            <button className={styles["invite-btn"]}>
              <img
                src="/assets/inviteOfficerIcon.png"
                alt="Invite Icon"
                className={styles["invite-icon"]}
              />
              <span>Invite Officers</span>
            </button>
          </div>
          <div className={styles["navbar-right"]}>
            <button className={styles["upgrade-btn"]}>Upgrade</button>
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
            <div className={styles["notification-container"]}>
              <img
                src="/assets/notification.png"
                alt="Notifications"
                className={styles["notification-icon"]}
              />
            </div>
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
                  <Link
                    href="/profile"
                    className={styles["dropdown-item"]}
                    role="menuitem"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className={styles["dropdown-item"]}
                    role="menuitem"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={styles["dropdown-item"]}
                    role="menuitem"
                  >
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
          <button
            className={styles["hamburger-btn"]}
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Toggle menu"
            ref={menuRef}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {showMenu && (
        <div className={styles["menu-dropdown"]}>
          {renderMenuOptions()}
        </div>
      )}
    </>
  );
};

export default Navbar;
