import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Home,
  DollarSign,
  Award,
  FileText,
  Briefcase,
} from "lucide-react";
import { useAuth } from "@/company/contexts/authcontext";
import { useContextValue } from "@/company/contexts/context";
import styles from "./Sidebar.module.css";

const NavLink = ({ to, end, onClick, children, className }) => {
  const pathname = usePathname();
  const isActive = end ? pathname === to : pathname.startsWith(to);
  const computedClassName =
    typeof className === "function" ? className({ isActive }) : className;

  return (
    <Link href={to} scroll={true} onClick={onClick}>
      {React.cloneElement(React.Children.only(children), {
        className: computedClassName,
      })}
    </Link>
  );
};

const SidebarMenuItem = ({
  item,
  isOpen,
  onToggle,
  activeCategory,
  setActiveCategory,
  handleLogout,
}) => {
  if (item.items) {
    return (
      <li className={styles["sidebar-menu-item"]}>
        <button
          className={styles["sidebar-menu-button"]}
          onClick={() => onToggle(item.label)}
        >
          <item.icon
            className={`${styles["sidebar-icon"]} ${
              activeCategory === item.label ? styles.active : ""
            }`}
          />
          <span className={styles["menu-label"]}>{item.label}</span>
          <ChevronDown
            className={`${styles["dropdown-arrow"]} ${
              isOpen ? styles.open : ""
            }`}
          />
        </button>
        {isOpen && (
          <ul className={styles["sidebar-menu-sub"]}>
            {item.items.map((subItem) => {
              if (subItem.label === "Log Out") {
                return (
                  <li key={subItem.label} className={styles["sidebar-menu-sub-item"]}>
                    <NavLink
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
                      }}
                      className={
                        styles["sidebar-menu-sub-button"] +
                        " " +
                        styles["logout-button"]
                      }
                    >
                      <span>{subItem.label}</span>
                    </NavLink>
                  </li>
                );
              }
              const useExact = subItem.label !== "Share Classes";
              return (
                <li key={subItem.label} className={styles["sidebar-menu-sub-item"]}>
                  <NavLink
                    to={subItem.link}
                    end={useExact}
                    onClick={() => setActiveCategory(item.label)}
                    className={({ isActive }) =>
                      `${styles["sidebar-menu-sub-button"]} ${
                        isActive ? styles.activeSub : ""
                      }`
                    }
                  >
                    <span>{subItem.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    );
  } else {
    return (
      <li className={styles["sidebar-menu-item"]}>
        <NavLink
          to={item.link}
          end={item.label === "Dashboard"}
          onClick={() => setActiveCategory(item.label)}
          className={({ isActive }) =>
            `${styles["sidebar-menu-button"]} ${isActive ? styles.active : ""}`
          }
        >
          <span className={styles["dashboard-content"]}>
            <item.icon
              className={`${styles["sidebar-icon"]} ${
                activeCategory === item.label ? styles.active : ""
              }`}
            />
            <span className={styles["menu-label"]}>{item.label}</span>
          </span>
        </NavLink>
      </li>
    );
  }
};

const menuItems = [
  {
    label: "Dashboard",
    icon: Home,
    link: "/company/dashboard",
  },
  {
    label: "Equity",
    icon: DollarSign,
    items: [
      { label: "Cap Table", link: "/company/equity/captable" },
      { label: "Shareholders", link: "/company/equity/shareholders" },
      { label: "Share Transactions", link:  "/company/equity/sharetransactions" },
      { label: "Exercise Requests", link: "/company/equity/exerciserequests" },
      { label: "Share Classes", link: "/company/equity/shareclasses" },
      { label: "Transaction Log", link: "/company/equity/shareclasses" },
    ],
  },
  {
    label: "Instruments",
    icon: Award,
    items: [
      { label: "Stock Options", link: "/company/instruments/stockoptions" },
      { label: "Restricted Stock", link: "/company/instruments/restrictedstock" },
      { label: "Performance Stock", link: "/company/instruments/performancestock" },
      { label: "SAFE", link: "/company/instruments/SAFE" },
      { label: "Convertible Notes", link: "/company/instruments/convertiblenotes" },
      { label: "Warrants", link: "/company/instruments/warrants" },
    ],
  },
  {
    label: "Company",
    icon: Briefcase,
    items: [
      { label: "Manage Officers", link: "/company/company/manageofficers" },
      { label: "Company Profile", link: "/company/company/companyprofile" },
      { label: "Executive Board", link: "/company/company/executiveboard" },
      { label: "Communication", link: "/company/company/communication" },
      { label: "Voting", link: "/company/company/voting" },
    ],
  },
  {
    label: "Documents",
    icon: FileText,
    items: [
      { label: "View Documents", link: "/company/documents/viewdocuments" },
      { label: "Create Documents", link: "/company/documents/createdocuments" },
      { label: "Pending Agreements", link: "/company/documents/pendingagreements" },
    ],
  },
];

const Sidebar = () => {
  const { isCollapsed } = useContextValue();
  const [openMenus, setOpenMenus] = useState({});
  const [activeCategory, setActiveCategory] = useState("");
  const { logout } = useAuth();

  // Check for mobile view (<1024px)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobileView = () => setIsMobile(window.innerWidth < 1024);
    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  // Do not render the sidebar on mobile view
  if (isMobile) {
    return null;
  }

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    // The wrapper div applies a gap so the aside itself can use a full 100vh for scrolling.
    <div style={{ marginTop: "5px" }}>
      <aside className={`${styles["main-sidebar"]} ${isCollapsed ? styles.collapsed : ""}`}>
        <nav className={styles["sidebar-nav"]}>
          <ul className={styles["sidebar-menu"]}>
            {menuItems.map((item) => (
              <SidebarMenuItem
                key={item.label}
                item={item}
                isOpen={item.items ? openMenus[item.label] : false}
                onToggle={toggleMenu}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                handleLogout={handleLogout}
              />
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
