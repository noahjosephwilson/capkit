"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import styles from "./PersonalNavbar.module.css";

const PersonalNavbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);
  const router = useRouter();
  const { currentUser, logout } = useAuth();
  const [userProfileImage, setUserProfileImage] = useState(null);
  const [isPersonal, setIsPersonal] = useState(true); // Default to personal view

  // Real-time listener for user's profile image from Firestore
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

  // Close profile dropdown when clicking outside
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

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className={styles["personal-navbar"]}>
      <div className={styles["navbar-left"]}>
        {/* Logo */}
        <img src="/assets/capkitlogo.png" alt="Logo" className={styles.logo} />
      </div>

      <div className={styles["navbar-right"]}>
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
          <img
            src="/assets/notification.png"
            alt="Notifications"
            className={styles["notification-icon"]}
          />
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
              <button
                onClick={handleLogout}
                className={`${styles["dropdown-item"]} ${styles["logout-btn"]}`}
                role="menuitem"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default PersonalNavbar;
