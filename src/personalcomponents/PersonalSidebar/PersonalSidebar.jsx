"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Home,
  TrendingUp,
  RefreshCw,
  Calendar,
  FileText,
  Settings,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import "./PersonalSidebar.css";

// Import your collapse image file here:
import DashboardPointer from "../../../public/assets/collapsesidebar.png";

// Helper: convert a string to a URL-friendly slug.
const slugify = (str) => str.toLowerCase().replace(/\s+/g, "-");

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
  toggleCollapse,
}) => {
  if (item.items) {
    return (
      <li className="sidebar-menu-item">
        <button
          className="sidebar-menu-button"
          onClick={() => onToggle(item.label)}
        >
          <item.icon
            className={`sidebar-icon ${
              activeCategory === item.label ? "active" : ""
            }`}
          />
          <span className="menu-label">{item.label}</span>
          <ChevronDown className={`dropdown-arrow ${isOpen ? "open" : ""}`} />
        </button>
        {isOpen && (
          <ul className="sidebar-menu-sub">
            {item.items.map((subItem) => {
              if (subItem.label === "Log Out") {
                return (
                  <li key={subItem.label} className="sidebar-menu-sub-item">
                    <NavLink
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
                      }}
                      className="sidebar-menu-sub-button logout-button"
                    >
                      <span>{subItem.label}</span>
                    </NavLink>
                  </li>
                );
              }
              // For "Share Classes", we want the active state to cover child routes.
              const useExact = subItem.label !== "Share Classes";
              return (
                <li key={subItem.label} className="sidebar-menu-sub-item">
                  <NavLink
                    to={subItem.link}
                    end={useExact}
                    onClick={() => setActiveCategory(item.label)}
                    className={({ isActive }) =>
                      `sidebar-menu-sub-button ${isActive ? "active" : ""}`
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
    // For the Home item, we attach the collapse toggle on the pointer image.
    return (
      <li className="sidebar-menu-item">
        <NavLink
          to={item.link}
          end={item.label === "Home"}
          onClick={() => setActiveCategory(item.label)}
          className={({ isActive }) =>
            `sidebar-menu-button ${isActive ? "active" : ""}`
          }
        >
          <span className="dashboard-content">
            <item.icon
              className={`sidebar-icon ${
                activeCategory === item.label ? "active" : ""
              }`}
            />
            <span className="menu-label">{item.label}</span>
            {item.label === "Home" && (
              <Image
                src={DashboardPointer}
                alt="Collapse Sidebar"
                width={20}
                height={20}
                className="dashboard-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleCollapse();
                }}
              />
            )}
          </span>
        </NavLink>
      </li>
    );
  }
};

const menuItems = [
  {
    label: "Home",
    icon: Home,
    link: "/company/companyhome",
  },
  {
    label: "Portfolio",
    icon: TrendingUp,
    link: "/company/companyhome/dashboard",
  },
  {
    label: "Exchange",
    icon: RefreshCw,
    link: "/company/companyhome/dashboard2",
  },
  {
    label: "Vesting Equity",
    icon: Calendar,
    link: "/company/companyhome/dashboard2",
  },
  {
    label: "Documents",
    icon: FileText,
    link: "/company/companyhome/dashboard3",
  },
];

const PersonalSidebar = () => {
  const [openMenus, setOpenMenus] = useState({});
  const [activeCategory, setActiveCategory] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { logout } = useAuth();

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // If collapsed, only render the collapse image.
  if (isCollapsed) {
    return (
      <aside className="main-sidebar collapsed">
        <div className="collapsed-sidebar" onClick={toggleCollapse}>
          <Image
            src={DashboardPointer}
            alt="Expand Sidebar"
            width={25}
            height={28}
            className="dashboard-pointer"
          />
        </div>
      </aside>
    );
  }

  return (
    <aside className="main-sidebar">
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <SidebarMenuItem
              key={item.label + item.link}
              item={item}
              isOpen={item.items ? openMenus[item.label] : false}
              onToggle={toggleMenu}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              handleLogout={handleLogout}
              toggleCollapse={toggleCollapse}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default PersonalSidebar;
