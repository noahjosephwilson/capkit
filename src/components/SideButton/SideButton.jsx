import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./SideButton.css";

const SideButton = ({ label, icon, path, subItems }) => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(prev => !prev);
  };

  if (!subItems || subItems.length === 0) {
    // Render a simple NavLink (for example, the Dashboard button)
    return (
      <NavLink
        to={path}
        className={({ isActive }) =>
          "side-button" + (isActive ? " active" : "")
        }
      >
        <span className="side-button-icon">{icon}</span>
        <span className="side-button-label">{label}</span>
      </NavLink>
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
            {subItems.map((subItem, index) => (
              <li key={index} className="sub-menu-item">
                <NavLink
                  to={subItem.path}
                  className={({ isActive }) =>
                    "sub-menu-link" + (isActive ? " active" : "")
                  }
                >
                  {subItem.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
};

export default SideButton;
