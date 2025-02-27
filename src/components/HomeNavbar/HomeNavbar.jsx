"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./HomeNavbar.css";

export default function HomeNavbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile view and reset mobile state when switching
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // Always reset mobile menu & dropdown on view change
      if (mobile) {
        setShowMobileMenu(false);
        setActiveDropdown(null);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleDropdown = (menu) => {
    setActiveDropdown((prev) => (prev === menu ? null : menu));
  };

  const closeDropdown = () => setActiveDropdown(null);

  const renderArrow = (menu) =>
    activeDropdown === menu ? (
      <ChevronUp className="arrow" size={16} />
    ) : (
      <ChevronDown className="arrow" size={16} />
    );

  // Always white navbar (static background)
  const navbarClass = "navbar-white";

  // Desktop navigation remains unchanged
  const renderDesktopNav = () => (
    <div className="desktop-nav">
      <div className="nav-left">
        <Link href="/">
          <Image
            src="/assets/capkitlogo.png"
            alt="Logo"
            width={130}
            height={45}
            className="logo"
          />
        </Link>
        <div className="navMenu">
          {/* Products Dropdown */}
          <div className="menuItem">
            <button
              className={`navLink ${
                activeDropdown === "products" ? "active" : ""
              }`}
              onClick={() => toggleDropdown("products")}
            >
              Products {renderArrow("products")}
            </button>
            {activeDropdown === "products" && (
              <div className="dropdownContent">
                <ul>
                  <li>
                    <Link href="/products/product1" onClick={closeDropdown}>
                      Product 1
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/product2" onClick={closeDropdown}>
                      Product 2
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/product3" onClick={closeDropdown}>
                      Product 3
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* About Dropdown */}
          <div className="menuItem">
            <button
              className={`navLink ${activeDropdown === "about" ? "active" : ""}`}
              onClick={() => toggleDropdown("about")}
            >
              About {renderArrow("about")}
            </button>
            {activeDropdown === "about" && (
              <div className="dropdownContent">
                <ul>
                  <li>
                    <Link href="/about/team" onClick={closeDropdown}>
                      Team
                    </Link>
                  </li>
                  <li>
                    <Link href="/about/company" onClick={closeDropdown}>
                      Company
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* Resources Dropdown */}
          <div className="menuItem">
            <button
              className={`navLink ${
                activeDropdown === "resources" ? "active" : ""
              }`}
              onClick={() => toggleDropdown("resources")}
            >
              Resources {renderArrow("resources")}
            </button>
            {activeDropdown === "resources" && (
              <div className="dropdownContent">
                <ul>
                  <li>
                    <Link href="/resources/blog" onClick={closeDropdown}>
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/resources/faq" onClick={closeDropdown}>
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/resources/support" onClick={closeDropdown}>
                      Support
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* Pricing Link */}
          <div className="menuItem">
            <Link href="/pricing" className="navLink">
              Pricing
            </Link>
          </div>
        </div>
      </div>
      <div className="nav-right">
        <Link href="/login" className="navLink">
          Login
        </Link>
        <Link href="/signup" className="signupBtn">
          Sign up free
        </Link>
      </div>
    </div>
  );

  // Mobile navigation with hamburger button
  const renderMobileNav = () => (
    <div className="mobile-nav">
      <Link href="/">
        <Image
          src="/assets/capkitlogo.png"
          alt="Logo"
          width={130}
          height={45}
          className="logo"
        />
      </Link>
      <button
        className="hamburger-btn"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" />
        </svg>
      </button>
    </div>
  );

  // Mobile dropdown rendered only when active
  const renderMobileDropdown = () => (
    <div className="mobile-dropdown">
      {/* Products Dropdown */}
      <div className="mobile-dropdown-item">
        <button
          className="mobile-nav-link"
          onClick={() => toggleDropdown("products")}
        >
          Products {renderArrow("products")}
        </button>
        {activeDropdown === "products" && (
          <div className="mobile-dropdown-submenu">
            <ul>
              <li>
                <Link
                  href="/products/product1"
                  onClick={() => {
                    closeDropdown();
                    setShowMobileMenu(false);
                  }}
                >
                  Product 1
                </Link>
              </li>
              <li>
                <Link
                  href="/products/product2"
                  onClick={() => {
                    closeDropdown();
                    setShowMobileMenu(false);
                  }}
                >
                  Product 2
                </Link>
              </li>
              <li>
                <Link
                  href="/products/product3"
                  onClick={() => {
                    closeDropdown();
                    setShowMobileMenu(false);
                  }}
                >
                  Product 3
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      {/* About Dropdown */}
      <div className="mobile-dropdown-item">
        <button
          className="mobile-nav-link"
          onClick={() => toggleDropdown("about")}
        >
          About {renderArrow("about")}
        </button>
        {activeDropdown === "about" && (
          <div className="mobile-dropdown-submenu">
            <ul>
              <li>
                <Link
                  href="/about/team"
                  onClick={() => {
                    closeDropdown();
                    setShowMobileMenu(false);
                  }}
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href="/about/company"
                  onClick={() => {
                    closeDropdown();
                    setShowMobileMenu(false);
                  }}
                >
                  Company
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      {/* Resources Dropdown */}
      <div className="mobile-dropdown-item">
        <button
          className="mobile-nav-link"
          onClick={() => toggleDropdown("resources")}
        >
          Resources {renderArrow("resources")}
        </button>
        {activeDropdown === "resources" && (
          <div className="mobile-dropdown-submenu">
            <ul>
              <li>
                <Link
                  href="/resources/blog"
                  onClick={() => {
                    closeDropdown();
                    setShowMobileMenu(false);
                  }}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/faq"
                  onClick={() => {
                    closeDropdown();
                    setShowMobileMenu(false);
                  }}
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/support"
                  onClick={() => {
                    closeDropdown();
                    setShowMobileMenu(false);
                  }}
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      {/* Pricing Link */}
      <div className="mobile-dropdown-item">
        <Link
          href="/pricing"
          className="mobile-nav-link"
          onClick={() => setShowMobileMenu(false)}
        >
          Pricing
        </Link>
      </div>
      {/* Login & Sign Up */}
      <div className="mobile-dropdown-item">
        <Link
          href="/login"
          className="mobile-nav-link"
          onClick={() => setShowMobileMenu(false)}
        >
          Login
        </Link>
      </div>
      <div className="mobile-dropdown-item">
        <Link
          href="/signup"
          className="mobile-nav-link"
          onClick={() => setShowMobileMenu(false)}
        >
          Sign up free
        </Link>
      </div>
    </div>
  );

  return (
    <nav className={`navbar ${navbarClass}`}>
      {isMobile ? renderMobileNav() : renderDesktopNav()}
      {isMobile && showMobileMenu && (
        <div className="mobile-dropdown-container">
          {renderMobileDropdown()}
        </div>
      )}
    </nav>
  );
}
