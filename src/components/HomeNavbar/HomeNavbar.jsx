"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
// Import arrow icons from lucide-react
import { ChevronDown, ChevronUp } from "lucide-react";
import "./HomeNavbar.css";

export default function HomeNavbar() {
  // Track which dropdown (if any) is open
  const [activeDropdown, setActiveDropdown] = useState(null);
  // Track if the window is scrolled down
  const [scrolled, setScrolled] = useState(false);
  // Track if the navbar is hovered
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (menu) => {
    setActiveDropdown((prev) => (prev === menu ? null : menu));
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  // Render the arrow icon: ChevronUp when open, ChevronDown when closed.
  const renderArrow = (menu) =>
    activeDropdown === menu ? (
      <ChevronUp className="arrow" size={16} />
    ) : (
      <ChevronDown className="arrow" size={16} />
    );

  // Determine the navbar background: transparent when at top and not hovered.
  const navbarClass = scrolled || hovered ? "navbar-white" : "navbar-transparent";

  return (
    <nav
      className={`navbar ${navbarClass}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="navContainer">
        {/* Left Section: Logo + Navigation Menu */}
        <div className="leftSection">
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
                className={`navLink ${activeDropdown === "products" ? "active" : ""}`}
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

            {/* Solutions Dropdown */}
            <div className="menuItem">
              <button
                className={`navLink ${activeDropdown === "solutions" ? "active" : ""}`}
                onClick={() => toggleDropdown("solutions")}
              >
                Solutions {renderArrow("solutions")}
              </button>
              {activeDropdown === "solutions" && (
                <div className="dropdownContent">
                  <ul>
                    <li>
                      <Link href="/solutions/solution1" onClick={closeDropdown}>
                        Solution 1
                      </Link>
                    </li>
                    <li>
                      <Link href="/solutions/solution2" onClick={closeDropdown}>
                        Solution 2
                      </Link>
                    </li>
                    <li>
                      <Link href="/solutions/solution3" onClick={closeDropdown}>
                        Solution 3
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="menuItem">
              <button
                className={`navLink ${activeDropdown === "resources" ? "active" : ""}`}
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

            {/* Pricing: now a direct link */}
            <div className="menuItem">
              <Link href="/pricing" className="navLink">
                Pricing
              </Link>
            </div>
          </div>
        </div>

        {/* Right Section: Login & Sign Up */}
        <div className="rightSection">
          <Link href="/home/registration/login" className="navLink">
            Login
          </Link>
          <Link href="/home/registration/signup" className="signupBtn">
            Sign up free
          </Link>
        </div>
      </div>
    </nav>
  );
}
