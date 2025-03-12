"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Home,
  TrendingUp,
  RefreshCw,
  Calendar,
  FileText,
} from "lucide-react";
// Updated import for useAuth:
import { useAuth } from "@/personal/contexts/AuthContext";
import styles from "./Sidebar.module.css";
import { usePersonal } from "@/personal/contexts/context";

// Custom NavLink component
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
                      className={styles["sidebar-menu-sub-button logout-button"]}
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
                        isActive ? styles.active : ""
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
          end={item.label === "Home"}
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
  { label: "Home", icon: Home, link: "/company/companyhome" },
  { label: "Portfolio", icon: TrendingUp, link: "/company/companyhome/dashboard" },
  { label: "Exchange", icon: RefreshCw, link: "/company/companyhome/dashboard2" },
  { label: "Vesting Equity", icon: Calendar, link: "/company/companyhome/dashboard2" },
  { label: "Documents", icon: FileText, link: "/company/companyhome/dashboard3" },
];

const Sidebar = () => {
  const { isCollapsed } = usePersonal();
  const [openMenus, setOpenMenus] = useState({});
  const [activeCategory, setActiveCategory] = useState("");
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

  // When collapsed, render nothing
  if (isCollapsed) {
    return null;
  }

  return (
    <aside className={styles["main-sidebar"]}>
      <nav className={styles["sidebar-nav"]}>
        <ul className={styles["sidebar-menu"]}>
          {menuItems.map((item) => (
            <SidebarMenuItem
              key={item.label + item.link}
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
