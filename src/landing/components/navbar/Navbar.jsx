"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isShrunken, setIsShrunken] = useState(false);

  // Detect mobile view and reset mobile state when switching
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setShowMobileMenu(false);
        setActiveDropdown(null);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Add scroll event listener to update isShrunken state
  useEffect(() => {
    const handleScroll = () => {
      setIsShrunken(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (menu) => {
    setActiveDropdown((prev) => (prev === menu ? null : menu));
  };

  const closeDropdown = () => setActiveDropdown(null);

  const renderArrow = (menu) =>
    activeDropdown === menu ? (
      <ChevronUp className={styles.arrow} size={16} />
    ) : (
      <ChevronDown className={styles.arrow} size={16} />
    );

  // Determine inline style for the logo based on isShrunken state
  const logoStyle = {
    marginLeft: isShrunken ? "50px" : "0px",
    transition: "margin 0.3s ease",
  };

  // Always white navbar (static background)
  const navbarClass = styles["navbar-white"];

  // Desktop navigation
  const renderDesktopNav = () => (
    <div className={styles["desktop-nav"]}>
      <div className={styles["nav-left"]}>
        <Link href="/">
          <Image
            src="/assets/capkitlogo.png"
            alt="Logo"
            width={130}
            height={45}
            className={styles.logo}
            style={logoStyle}
          />
        </Link>
        <div className={styles.navMenu}>
          {/* Products Dropdown */}
          <div className={styles.menuItem}>
            <button
              className={`${styles.navLink} ${activeDropdown === "products" ? styles.active : ""}`}
              onClick={() => toggleDropdown("products")}
            >
              Products {renderArrow("products")}
            </button>
            {activeDropdown === "products" && (
              <div className={styles.dropdownContent}>
                <ul>
                  <li>
                    <Link href="/home/explorehome/products/captable" onClick={closeDropdown}>
                      Cap Table
                    </Link>
                  </li>
                  <li>
                    <Link href="/home/explorehome/products/vestedequity" onClick={closeDropdown}>
                      Vested Equity
                    </Link>
                  </li>
                  <li>
                    <Link href="/home/explorehome/products/fundraising" onClick={closeDropdown}>
                      Fundraising
                    </Link>
                  </li>
                  <li>
                    <Link href="/home/explorehome/products/employeeportfolio" onClick={closeDropdown}>
                      Employee Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link href="/home/explorehome/products/documentsigning" onClick={closeDropdown}>
                      Document Signing
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* About Dropdown */}
          <div className={styles.menuItem}>
            <button
              className={`${styles.navLink} ${activeDropdown === "about" ? styles.active : ""}`}
              onClick={() => toggleDropdown("about")}
            >
              About {renderArrow("about")}
            </button>
            {activeDropdown === "about" && (
              <div className={styles.dropdownContent}>
                <ul>
                  <li>
                    <Link href="/home/explorehome/about/aboutus" onClick={closeDropdown}>
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/home/explorehome/about/ourteam" onClick={closeDropdown}>
                      Our Team
                    </Link>
                  </li>
                  <li>
                    <Link href="/home/explorehome/about/joinus" onClick={closeDropdown}>
                      Join Us
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* Resources Dropdown */}
          <div className={styles.menuItem}>
            <button
              className={`${styles.navLink} ${activeDropdown === "resources" ? styles.active : ""}`}
              onClick={() => toggleDropdown("resources")}
            >
              Resources {renderArrow("resources")}
            </button>
            {activeDropdown === "resources" && (
              <div className={styles.dropdownContent}>
                <ul>
                  <li>
                    <Link href="/home/explorehome/resources/guides" onClick={closeDropdown}>
                      Guides
                    </Link>
                  </li>
                  <li>
                    <Link href="/home/explorehome/resources/FAQ" onClick={closeDropdown}>
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/home/explorehome/resources/contactus" onClick={closeDropdown}>
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/home/explorehome/resources/donate" onClick={closeDropdown}>
                      Donate
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* Pricing Link */}
          <div className={styles.menuItem}>
            <Link href="/home/explorehome/pricing" className={styles.navLink}>
              Pricing
            </Link>
          </div>
        </div>
      </div>
      <div className={styles["nav-right"]}>
        <Link href="/landing/registration/login" className={styles.navLink}>
          Login
        </Link>
        <Link href="/landing/registration/signup" className={styles.signupBtn}>
          Sign up free
        </Link>
      </div>
    </div>
  );

  // Mobile navigation
  const renderMobileNav = () => (
    <div className={styles["mobile-nav"]}>
      <Link href="/">
        <Image
          src="/assets/capkitlogo.png"
          alt="Logo"
          width={130}
          height={45}
          className={styles.logo}
          style={logoStyle}
        />
      </Link>
      <button
        className={styles["hamburger-btn"]}
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
    <div className={styles["mobile-dropdown"]}>
      {/* Products Dropdown */}
      <div className={styles["mobile-dropdown-item"]}>
        <button
          className={styles["mobile-nav-link"]}
          onClick={() => toggleDropdown("products")}
        >
          Products {renderArrow("products")}
        </button>
        {activeDropdown === "products" && (
          <div className={`${styles.dropdownContent} ${styles["mobile-dropdown-content"]}`}>
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
      <div className={styles["mobile-dropdown-item"]}>
        <button
          className={styles["mobile-nav-link"]}
          onClick={() => toggleDropdown("about")}
        >
          About {renderArrow("about")}
        </button>
        {activeDropdown === "about" && (
          <div className={`${styles.dropdownContent} ${styles["mobile-dropdown-content"]}`}>
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
      <div className={styles["mobile-dropdown-item"]}>
        <button
          className={styles["mobile-nav-link"]}
          onClick={() => toggleDropdown("resources")}
        >
          Resources {renderArrow("resources")}
        </button>
        {activeDropdown === "resources" && (
          <div className={`${styles.dropdownContent} ${styles["mobile-dropdown-content"]}`}>
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
      <div className={styles["mobile-dropdown-item"]}>
        <Link
          href="/pricing"
          className={styles["mobile-nav-link"]}
          onClick={() => setShowMobileMenu(false)}
        >
          Pricing
        </Link>
      </div>
      {/* Login & Sign Up */}
      <div className={styles["mobile-dropdown-item"]}>
        <Link
          href="/home/registration/login"
          className={styles["mobile-nav-link"]}
          onClick={() => setShowMobileMenu(false)}
        >
          Login
        </Link>
      </div>
      <div className={styles["mobile-dropdown-item"]}>
        <Link
          href="/home/registration/signup"
          className={styles["mobile-nav-link"]}
          onClick={() => setShowMobileMenu(false)}
        >
          Sign up free
        </Link>
      </div>
    </div>
  );

  return (
    <nav className={`${styles.navbar} ${navbarClass}`}>
      {isMobile ? renderMobileNav() : renderDesktopNav()}
      {isMobile && showMobileMenu && (
        <div className={styles["mobile-dropdown-container"]}>
          {renderMobileDropdown()}
        </div>
      )}
    </nav>
  );
}
