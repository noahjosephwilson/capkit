"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import styles from "./Navbar.module.css";

const Navbar = () => {
  // Declare all hooks unconditionally
  const [mounted, setMounted] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSettingsSubmenu, setShowSettingsSubmenu] = useState(false);
  const [isPersonal, setIsPersonal] = useState(true);
  const [userProfileImage, setUserProfileImage] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);

  const profileRef = useRef(null);
  const menuRef = useRef(null);
  const router = useRouter();
  const { currentUser, logout } = useAuth();

  // Use effects
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 1024);
    };
    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  useEffect(() => {
    if (!isMobileView) {
      setShowMenu(false);
      setShowSettingsSubmenu(false);
    }
  }, [isMobileView]);

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

  useEffect(() => {
    const handleClickOutsideProfile = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideProfile);
    return () => document.removeEventListener("mousedown", handleClickOutsideProfile);
  }, []);

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

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Render menu dropdown options (for both desktop and mobile)
  const renderMenuOptions = () => (
    <>
      <Link href="/dashboard" className={styles["dropdown-item"]}>
        Dashboard
      </Link>
      <Link href="/portfolio" className={styles["dropdown-item"]}>
        Portfolio
      </Link>
      <Link href="/offers" className={styles["dropdown-item"]}>
        Offers
      </Link>
      <Link href="/notifications" className={styles["dropdown-item"]}>
        Notifications
      </Link>
      <Link href="/documents" className={styles["dropdown-item"]}>
        Documents
      </Link>
      {isMobileView && (
        <>
          <div
            className={styles["settings-item"]}
            onClick={() => setShowSettingsSubmenu(!showSettingsSubmenu)}
          >
            <span className={styles["settings-text"]}>Settings</span>
            <ChevronDown size={16} className={styles["submenu-arrow"]} />
          </div>
          {showSettingsSubmenu && (
            <>
              <Link href="/profile" className={styles["submenu-item"]}>
                Profile
              </Link>
              <Link href="/company" className={styles["submenu-item"]}>
                Switch to Company
              </Link>
              <button onClick={handleLogout} className={styles["submenu-item"]}>
                Logout
              </button>
            </>
          )}
        </>
      )}
    </>
  );

  // Now, after all hooks have been called, conditionally render based on mounted state
  if (!mounted) return null;

  return (
    <>
      <header className={styles["personal-navbar"]}>
        <div className={styles["navbar-left"]}>
          <img src="/assets/capkitlogo.png" alt="Logo" className={styles.logo} />
        </div>
        <div className={styles["navbar-right"]}>
          {isMobileView ? (
            <button
              className={styles["hamburger-btn"]}
              onClick={() => setShowMenu(!showMenu)}
              aria-label="Toggle menu"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" />
              </svg>
            </button>
          ) : (
            <div
              className={styles["menu-container"]}
              onClick={() => setShowMenu(!showMenu)}
              ref={menuRef}
              aria-haspopup="true"
              aria-expanded={showMenu}
            >
              <span className={styles["menu-label"]}>Menu</span>
              <ChevronDown size={16} strokeWidth={1.5} className={styles["menu-arrow"]} />
            </div>
          )}
          {!isMobileView && (
            <>
              <div className={styles["toggle-container"]}>
                <div
                  className={`${styles["toggle-option"]} ${!isPersonal ? styles.active : ""}`}
                  onClick={() => {
                    setIsPersonal(false);
                    router.push("/company/dashboard");
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
                <img src="/assets/notification.png" alt="Notifications" className={styles["notification-icon"]} />
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
                    <Link href="/profile" className={styles["dropdown-item"]} role="menuitem">
                      Profile
                    </Link>
                    <Link href="/settings" className={styles["dropdown-item"]} role="menuitem">
                      Settings
                    </Link>
                    <button onClick={handleLogout} className={styles["dropdown-item"]} role="menuitem">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </header>

      {showMenu && (
        <div className={styles["menu-dropdown"]}>
          {renderMenuOptions()}
        </div>
      )}
    </>
  );
};

export default Navbar;
