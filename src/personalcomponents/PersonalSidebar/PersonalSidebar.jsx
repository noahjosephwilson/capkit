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
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import "./PersonalSidebar.css";
import DashboardPointer from "../../../public/assets/collapsesidebar.png";
import { usePersonal } from "@/contexts/PersonalContext";

// Custom NavLink component
const NavLink = ({ to, end, onClick, children, className }) => {
  const pathname = usePathname();
  const isActive = end ? pathname === to : pathname.startsWith(to);
  const computedClassName =
    typeof className === "function" ? className({ isActive }) : className;

  return (
    <Link href={to} onClick={onClick}>
      {React.cloneElement(React.Children.only(children), { className: computedClassName })}
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
        <button className="sidebar-menu-button" onClick={() => onToggle(item.label)}>
          <item.icon className={`sidebar-icon ${activeCategory === item.label ? "active" : ""}`} />
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
                    className={({ isActive }) => `sidebar-menu-sub-button ${isActive ? "active" : ""}`}
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
      <li className="sidebar-menu-item">
        <NavLink
          to={item.link}
          end={item.label === "Home"}
          onClick={() => setActiveCategory(item.label)}
          className={({ isActive }) => `sidebar-menu-button ${isActive ? "active" : ""}`}
        >
          <span className="dashboard-content">
            <item.icon className={`sidebar-icon ${activeCategory === item.label ? "active" : ""}`} />
            <span className="menu-label">{item.label}</span>
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

const PersonalSidebar = () => {
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
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default PersonalSidebar;
