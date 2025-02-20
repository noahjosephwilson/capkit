"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Home,
  DollarSign,
  Award,
  Wrench,
  FileText,
  Briefcase,
  Star,      // For Premium
  Settings,  // For Control Suite (gear icon)
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext"; // Your auth context
import "./MainSidebar.css";

// Helper: convert a string to a URL-friendly slug.
const slugify = (str) => str.toLowerCase().replace(/\s+/g, "-");

// Custom NavLink that mimics react-router-dom’s NavLink active behavior.
const NavLink = ({ to, end, onClick, children, className }) => {
  const pathname = usePathname(); // Use usePathname from next/navigation
  const isActive = end ? pathname === to : pathname.startsWith(to);

  // Support function or string className
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
              const link = subItem.link;
              return (
                <li key={subItem.label} className="sidebar-menu-sub-item">
                  <NavLink
                    to={link}
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
    // Use the link provided in item directly
    const link = item.link;
    return (
      <li className="sidebar-menu-item">
        <NavLink
          to={link}
          end={item.label === "Dashboard"}
          onClick={() => setActiveCategory(item.label)}
          className={({ isActive }) =>
            `sidebar-menu-button ${isActive ? "active" : ""}`
          }
        >
          <span>
            <item.icon
              className={`sidebar-icon ${
                activeCategory === item.label ? "active" : ""
              }`}
            />
            <span className="menu-label">{item.label}</span>
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
      { label: "Share Classes", link: "/company/companyhome/shareclasses" },
      { label: "Transaction Log", link: "/company/companyhome/transactionlog" },
    ],
  },
  {
    label: "Incentive Plans",
    icon: Award,
    items: [
      { label: "Vested Equity", link: "/company/companyhome/underconstruction" },
      { label: "Stock Options", link: "/company/companyhome/underconstruction" },
      { label: "Incentive Programs", link: "/company/companyhome/underconstruction" },
      { label: "Exercise Requests", link: "/company/companyhome/underconstruction" },
    ],
  },
  {
    label: "Tools",
    icon: Wrench,
    items: [
      { label: "Fundraising Modeling", link: "/company/companyhome/underconstruction" },
      { label: "Stakeholder Scenario", link: "/company/companyhome/underconstruction" },
      { label: "Reporting", link: "/company/companyhome/underconstruction" },
    ],
  },
  {
    label: "Documents",
    icon: FileText,
    items: [
      { label: "View Documents", link: "/company/companyhome/underconstruction" },
      { label: "Create Documents", link: "/company/companyhome/underconstruction" },
      { label: "Pending Agreements", link: "/company/companyhome/underconstruction" },
    ],
  },
  {
    label: "Company",
    icon: Briefcase,
    items: [
      { label: "Executive Board", link: "/company/companyhome/underconstruction" },
      { label: "Communications", link: "/company/companyhome/underconstruction" },
      { label: "Bylaws", link: "/company/companyhome/underconstruction" },
      { label: "Voting", link: "/company/companyhome/underconstruction" },
      { label: "Manage Officers", link: "/company/companyhome/underconstruction" },
      { label: "Company Profile", link: "/company/companyhome/underconstruction" },
      { label: "Billing Info", link: "/company/companyhome/underconstruction" },
    ],
  },
  {
    label: "Premium",
    icon: Star,
    items: [
      { label: "409A Valuation", link: "/company/companyhome/underconstruction" },
      { label: "Incorporation", link: "/company/companyhome/underconstruction" },
      { label: "Convert Entity", link: "/company/companyhome/underconstruction" },
      { label: "File Taxes", link: "/company/companyhome/underconstruction" },
    ],
  },
  {
    label: "Control Suite",
    icon: Settings,
    items: [
      { label: "Profile Settings", link: "/dashboard/profile-settings" },
      { label: "Personal Notifications", link: "/company/companyhome/underconstruction" },
      { label: "Help", link: "/company/companyhome/underconstruction" },
      { label: "Log Out", link: "#" },
    ],
  },
];

const MainSidebar = () => {
  const [openMenus, setOpenMenus] = useState({});
  const [activeCategory, setActiveCategory] = useState("");
  const { logout } = useAuth();

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  // Logout handler: logs out and navigates to home.
  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className="main-sidebar">
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
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

export default MainSidebar;
