import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, UserPlus } from "lucide-react";
import { useAuth } from "@/company/contexts/authcontext";
import { db } from "@/firebaseConfig";
import { doc, onSnapshot, collection, getDocs, getDoc } from "firebase/firestore";
import styles from "./Navbar.module.css";

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

  // Refs for profile buttons/dropdowns
  const profileButtonDesktopRef = useRef(null);
  const profileDropdownDesktopRef = useRef(null);
  const profileButtonMobileRef = useRef(null);
  const profileDropdownMobileRef = useRef(null);

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
      if (
        (profileButtonDesktopRef.current && profileButtonDesktopRef.current.contains(event.target)) ||
        (profileDropdownDesktopRef.current && profileDropdownDesktopRef.current.contains(event.target)) ||
        (profileButtonMobileRef.current && profileButtonMobileRef.current.contains(event.target)) ||
        (profileDropdownMobileRef.current && profileDropdownMobileRef.current.contains(event.target))
      ) {
        return;
      }
      setShowProfileMenu(false);
    };
    document.addEventListener("click", handleClickOutsideProfile);
    return () => document.removeEventListener("click", handleClickOutsideProfile);
  }, []);

  // Close company dropdown if clicking outside
  useEffect(() => {
    const handleClickOutsideCompany = (event) => {
      if (companyRef.current && !companyRef.current.contains(event.target)) {
        setShowCompanyDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutsideCompany);
    return () => document.removeEventListener("click", handleClickOutsideCompany);
  }, []);

  // Close mobile menu if clicking outside its container
  useEffect(() => {
    const handleClickOutsideMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
        setShowSettingsSubmenu(false);
      }
    };
    document.addEventListener("click", handleClickOutsideMenu);
    return () => document.removeEventListener("click", handleClickOutsideMenu);
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
              size={20}
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
    <header className={`${styles.navbarRoot} ${styles["main-navbar"]}`}>
      {/* Desktop Navigation */}
      <div className={styles["desktop-nav"]}>
        <div className={styles["navbar-left"]}>
          <img src="/assets/capkitlogo.png" alt="Logo" className={styles.logo} />
          <div
            className={`${styles["company-dropdown-container"]} ${showCompanyDropdown ? styles.open : ""}`}
            onClick={() => setShowCompanyDropdown((prev) => !prev)}
            ref={companyRef}
            aria-haspopup="true"
            aria-expanded={showCompanyDropdown}
          >
            <div className={`${styles["company-box"]} ${showCompanyDropdown ? styles["company-box-open"] : ""}`}>
              <img
                src={companyImageUrl || "/assets/profile-icon.png"}
                alt="Company"
                className={styles["company-icon"]}
              />
              <span className={styles["company-name"]}>
                {companyName || " + Add New Company"}
              </span>
              <span className={`${styles["dropdown-arrow"]} ${showCompanyDropdown ? styles.open : ""}`}>
                <svg width="12" height="8" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" />
                </svg>
              </span>
            </div>
            {showCompanyDropdown && (
              <div className={styles["company-dropdown"]} role="menu">
                <Link
                  href="/create-company"
                  className={styles["dropdown-item"]}
                  role="menuitem"
                  onClick={() => setShowCompanyDropdown(false)}
                >
                  Create New Company
                </Link>
                <Link
                  href="/view-companies"
                  className={styles["dropdown-item"]}
                  role="menuitem"
                  onClick={() => setShowCompanyDropdown(false)}
                >
                  View Companies
                </Link>
                <Link
                  href="/manage-companies"
                  className={styles["dropdown-item"]}
                  role="menuitem"
                  onClick={() => setShowCompanyDropdown(false)}
                >
                  + Add New Company
                </Link>
              </div>
            )}
          </div>
          <button className={styles["invite-btn"]}>
            <UserPlus size={20} className={styles["invite-icon"]} />
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
                router.push("/company/dashboard");
              }}
            >
              Company
            </div>
            <div
              className={`${styles["toggle-option"]} ${isPersonal ? styles.active : ""}`}
              onClick={() => {
                setIsPersonal(true);
                router.push("/personal/home");
              }}
            >
              Personal
            </div>
          </div>
          <div
            className={styles["profile-container"]}
            onClick={(e) => {
              e.stopPropagation();
              setShowProfileMenu((prev) => !prev);
            }}
            ref={profileButtonDesktopRef}
            aria-haspopup="true"
            aria-expanded={showProfileMenu}
          >
            <img
              src={userProfileImage || "/assets/profile-icon.png"}
              alt="Profile"
              className={styles["profile-icon"]}
            />
            {showProfileMenu && (
              <div
                className={styles["profile-dropdown"]}
                role="menu"
                ref={profileDropdownDesktopRef}
              >
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
        <div className={styles["mobile-right"]}>
          <div
            className={styles["mobile-profile-container"]}
            onClick={(e) => {
              e.stopPropagation();
              setShowProfileMenu((prev) => !prev);
            }}
            ref={profileButtonMobileRef}
          >
            <img
              src={userProfileImage || "/assets/profile-icon.png"}
              alt="Profile"
              className={styles["profile-icon"]}
            />
            {showProfileMenu && (
              <div
                className={styles["profile-dropdown"]}
                role="menu"
                ref={profileDropdownMobileRef}
              >
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
      </div>

      {/* Mobile Menu Dropdown */}
      {showMenu && (
        <div className={styles["menu-dropdown"]}>
          {renderMenuOptions()}
        </div>
      )}
    </header>
  );
};

export default Navbar;
