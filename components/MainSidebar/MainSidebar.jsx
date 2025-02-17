import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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
import { useAuth } from "../../contexts/AuthContext"; // Import your auth context
import "./MainSidebar.css";

// Helper: convert a string to a URL-friendly slug.
const slugify = (str) => str.toLowerCase().replace(/\s+/g, "-");

// Allowed items (which should navigate to their original links):
const allowedTopItems = ["Dashboard"];
// Updated allowedSubItems to include "Profile Settings"
const allowedSubItems = ["Cap Table", "Shareholders", "Profile Settings", "Share Classes"];

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
            className={`sidebar-icon ${activeCategory === item.label ? "active" : ""}`}
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
                      {subItem.label}
                    </NavLink>
                  </li>
                );
              }
              // Use the provided link for allowed labels; if not allowed, route to an under-construction page.
              const link = allowedSubItems.includes(subItem.label)
                ? subItem.link
                : `/dashboard/under-construction/${slugify(subItem.label)}`;
              return (
                <li key={subItem.label} className="sidebar-menu-sub-item">
                  <NavLink
                    to={link}
                    end
                    onClick={() => setActiveCategory(item.label)}
                    className={({ isActive }) =>
                      `sidebar-menu-sub-button ${isActive ? "active" : ""}`
                    }
                  >
                    {subItem.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    );
  } else {
    const link = allowedTopItems.includes(item.label)
      ? item.link
      : `/dashboard/under-construction/${slugify(item.label)}`;
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
          <item.icon
            className={`sidebar-icon ${activeCategory === item.label ? "active" : ""}`}
          />
          <span className="menu-label">{item.label}</span>
        </NavLink>
      </li>
    );
  }
};

const menuItems = [
  {
    label: "Dashboard",
    icon: Home,
    link: "/dashboard",
  },
  {
    label: "Equity",
    icon: DollarSign,
    items: [
      { label: "Cap Table", link: "/dashboard/cap-table" },
      { label: "Shareholders", link: "/dashboard/shareholders" },
      { label: "Noteholders", link: "/dashboard/noteholders" },
      // Updated Share Classes link to the new route:
      { label: "Share Classes", link: "/dashboard/shareclasses" },
      { label: "Transaction Log", link: "/dashboard/transaction-log" },
    ],
  },
  {
    label: "Incentive Plans",
    icon: Award,
    items: [
      { label: "Vested Equity", link: "/dashboard/incentive/overview" },
      { label: "Stock Options", link: "/dashboard/incentive/details" },
      { label: "Incentive Programs", link: "/dashboard/incentive/comparisons" },
      { label: "Exercise Requests", link: "/dashboard/incentive/comparisons" },
    ],
  },
  {
    label: "Tools",
    icon: Wrench,
    items: [
      { label: "Fundraising Modeling", link: "/dashboard/tools/tool1" },
      { label: "Stakeholder Scenario", link: "/dashboard/tools/tool2" },
      { label: "Reporting", link: "/dashboard/tools/tool3" },
    ],
  },
  {
    label: "Documents",
    icon: FileText,
    items: [
      { label: "View Documents", link: "/dashboard/documents/policies" },
      { label: "Create Documents", link: "/dashboard/documents/reports" },
      { label: "Pending Agreements", link: "/dashboard/documents/forms" },
    ],
  },
  {
    label: "Company",
    icon: Briefcase,
    items: [
      { label: "Executive Board", link: "/dashboard/company/communication" },
      { label: "Communications", link: "/dashboard/company/about" },
      { label: "Bylaws", link: "/dashboard/company/about" },
      { label: "Voting", link: "/dashboard/company/careers" },
      { label: "Manage Officers", link: "/dashboard/company/team" },
      { label: "Company Profile", link: "/dashboard/company/team" },
      { label: "Billing Info", link: "/dashboard/company/team" },
    ],
  },
  {
    label: "Premium",
    icon: Star,
    items: [
      { label: "409A Valuation", link: "/dashboard/company/communication" },
      { label: "Incorporation", link: "/dashboard/company/about" },
      { label: "Convert Entity", link: "/dashboard/company/careers" },
      { label: "File Taxes", link: "/dashboard/company/team" },
    ],
  },
  {
    label: "Control Suite",
    icon: Settings,
    items: [
      { label: "Profile Settings", link: "/dashboard/profile-settings" },
      { label: "Personal Notifications", link: "/dashboard/company/team" },
      { label: "Help", link: "/dashboard/company/about" },
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

  // Logout handler: logs out and navigates to the home page.
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
