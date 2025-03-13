"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Home,
  DollarSign,
  Award,
  FileText,
  Briefcase,
  Settings,
} from "lucide-react";
import { useAuth } from "@/company/contexts/authcontext";
import { useContextValue } from "@/company/contexts/context";
import styles from "./Sidebar.module.css";

// Custom NavLink component that mimics active behavior.
const NavLink = ({ to, end, onClick, children, className }) => {
  const pathname = usePathname();
  const isActive = end ? pathname === to : pathname.startsWith(to);
  const computedClassName =
    typeof className === "function" ? className({ isActive }) : className;

  return (
    <Link href={to} onClick={onClick}>
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
                  <li
                    key={subItem.label}
                    className={styles["sidebar-menu-sub-item"]}
                  >
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
                <li
                  key={subItem.label}
                  className={styles["sidebar-menu-sub-item"]}
                >
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
            `${styles["sidebar-menu-button"]} ${
              isActive ? styles.active : ""
            }`
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
    link: "/company/companyhome",
  },
  {
    label: "Equity",
    icon: DollarSign,
    items: [
      { label: "Cap Table", link: "/company/companyhome/captable" },
      { label: "Shareholders", link: "/company/companyhome/shareholders" },
      { label: "Share Transactions", link: "/company/companyhome/shareholders" },
      { label: "Exercise Requests", link: "/company/companyhome/shareholders" },
      { label: "Investor Releases", link: "/company/companyhome/shareholders" },
      { label: "Share Classes", link: "/company/companyhome/shareclasses" },
    ],
  },
  {
    label: "Instruments",
    icon: Award,
    items: [
      { label: "Stock Options", link: "/company/companyhome/exerciserequests" },
      { label: "Restricted Stock", link: "/company/companyhome/employeereleases" },
      { label: "Performance Stock", link: "/company/companyhome/employeereleases" },
      { label: "SAFEs", link: "/company/companyhome/incentiveprograms" },
      { label: "Convertible Notes", link: "/company/companyhome/incentiveprograms" },
      { label: "Warrants", link: "/company/companyhome/incentiveprograms" },
    ],
  },
  {
    label: "Company",
    icon: Briefcase,
    items: [
      { label: "Manage Officers", link: "/company/companyhome/voting" },
      { label: "Company Profile", link: "/company/companyhome/voting" },
      { label: "Executive Board", link: "/company/companyhome/voting" },
      { label: "Transaction Log", link: "/company/companyhome/voting" },
      { label: "Communication", link: "/company/companyhome/voting" },
      { label: "Voting", link: "/company/companyhome/voting" },
      
    ],
  },
  {
    label: "Documents",
    icon: FileText,
    items: [
      { label: "View Documents", link: "/company/companyhome/viewdocuments" },
      { label: "Create Documents", link: "/company/companyhome/createdocument" },
      { label: "Pending Agreements", link: "/company/companyhome/pendingagreements" },
    ],
  },
];

const Sidebar = () => {
  const { isCollapsed } = useContextValue(); // Access collapse state from context
  const [openMenus, setOpenMenus] = React.useState({});
  const [activeCategory, setActiveCategory] = React.useState("");
  const { logout } = useAuth();

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
    <aside
      className={`${styles["main-sidebar"]} ${
        isCollapsed ? styles.collapsed : ""
      }`}
    >
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
  );
};

export default Sidebar;
