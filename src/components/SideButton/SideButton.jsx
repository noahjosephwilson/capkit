"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./SideButton.css";

const SideButton = ({ label, icon, path, subItems }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
  };

  // Check if this link is active
  const isActive = pathname === path;

  if (!subItems || subItems.length === 0) {
    // Render a simple link (for example, the Dashboard button)
    return (
      <Link href={path}>
        <a className={`side-button${isActive ? " active" : ""}`}>
          <span className="side-button-icon">{icon}</span>
          <span className="side-button-label">{label}</span>
        </a>
      </Link>
    );
  } else {
    // Render a button that toggles the dropdown for subItems
    return (
      <div className="side-button-dropdown">
        <button className="side-button" onClick={toggleDropdown}>
          <span className="side-button-icon">{icon}</span>
          <span className="side-button-label">{label}</span>
          <span className={`dropdown-arrow ${open ? "expanded" : ""}`}>
            {open ? "v" : ">"}
          </span>
        </button>
        {open && (
          <ul className="sub-menu">
            {subItems.map((subItem, index) => {
              const subActive = pathname === subItem.path;
              return (
                <li key={index} className="sub-menu-item">
                  <Link href={subItem.path}>
                    <a className={`sub-menu-link${subActive ? " active" : ""}`}>
                      {subItem.label}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
};

export default SideButton;
