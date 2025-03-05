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
import { useAuth } from "../../contexts/AuthContext";
import "./MainSidebar.css";

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
    // Dashboard item without collapse pointer.
    return (
      <li className="sidebar-menu-item">
        <NavLink
          to={item.link}
          end={item.label === "Dashboard"}
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
      { label: "Issue Shares", link: "/company/companyhome/shareholders" },
      { label: "Transfer Shares", link: "/company/companyhome/shareholders" },
      { label: "Share Classes", link: "/company/companyhome/shareclasses" },
    ],
  },
  {
    label: "Vesting Plans",
    icon: Award,
    items: [
      { label: "Stock Options", link: "/company/companyhome/exerciserequests" },
      { label: "Restricted Stock", link: "/company/companyhome/employeereleases" },
      { label: "Incentive Stock", link: "/company/companyhome/employeereleases" },
      { label: "SAFEs", link: "/company/companyhome/incentiveprograms" },
      { label: "Convertible Notes", link: "/company/companyhome/incentiveprograms" },
      { label: "Warrants", link: "/company/companyhome/incentiveprograms" },
      { label: "Exercise Requests", link: "/company/companyhome/employeereleases" },
      { label: "Investor Releases", link: "/company/companyhome/employeereleases" },
    ],
  },
  {
    label: "Company",
    icon: Briefcase,
    items: [
      { label: "Voting", link: "/company/companyhome/voting" },
      { label: "Bylaws", link: "/company/companyhome/bylaws" },
      { label: "Executive Board", link: "/company/companyhome/executiveboard" },
      { label: "Manage Officers", link: "/company/companyhome/manageofficers" },
      { label: "Company Profile", link: "/company/companyhome/companyprofile" },
      { label: "Bank Account", link: "/company/companyhome/billinginfo" },
      { label: "Transaction Log", link: "/company/companyhome/transactionlog" },
    ],
  },
  {
    label: "Documents",
    icon: FileText,
    items: [
      { label: "View Documents", link: "/company/companyhome/viewdocuments" },
      { label: "Create Documents", link: "/company/companyhome/createdocument" },
      { label: "Pending Agreements", link: "/company/companyhome/pendingagreements" },
      { label: "Verify Transactions", link: "/company/companyhome/createdocument" },
    ],
  },
  {
    label: "Control Suite",
    icon: Settings,
    items: [
      { label: "Profile Settings", link: "/company/companyhome/profilesettings" },
      { label: "Personal Notifications", link: "/company/companyhome/personalnotifications" },
      { label: "Help", link: "/company/companyhome/help" },
      { label: "Log Out", link: "#" },
    ],
  },
];

const MainSidebar = ({ isCollapsed, toggleCollapse }) => {
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
    <aside className={`main-sidebar ${isCollapsed ? "collapsed" : ""}`}>
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
