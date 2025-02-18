// src/components/SideLayout/SideLayout.js
import React, { useState } from "react";
import MainNavbar from "../MainNavbar/MainNavbar";
import AddTask from "../AddTask/AddTask";
import Sidebar from "../MainSidebar/MainSidebar";
import "./SideLayout.css";

const SideLayout = ({ children, onAddTask, onLogout }) => {
  // Define the min, max, and initial widths
  const MIN_WIDTH = 10;
  const MAX_WIDTH = 200;
  const INITIAL_WIDTH = 200;

  const [sidebarWidth, setSidebarWidth] = useState(INITIAL_WIDTH);

  // Handle mouse events for resizing the sidebar
  const handleMouseDown = (e) => {
    const startX = e.clientX;
    const startWidth = sidebarWidth;

    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      let newWidth = startWidth + deltaX;
      if (newWidth < MIN_WIDTH) newWidth = MIN_WIDTH;
      if (newWidth > MAX_WIDTH) newWidth = MAX_WIDTH;
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="side-layout">
      <MainNavbar />
      {/* Body below the navbar */}
      <div className="layout-body">
        {/* Left column: AddTask and Sidebar */}
        <div className="left-column" style={{ width: sidebarWidth }}>
          <div className="scrollable-left-content">
            <AddTask onAddTask={onAddTask} />
            <Sidebar onLogout={onLogout} />
          </div>
          {/* Resize handle */}
          <div className="resize-handle" onMouseDown={handleMouseDown} />
        </div>
        <div className="main-content">{children}</div>
      </div>
    </div>
  );
};

export default SideLayout;
