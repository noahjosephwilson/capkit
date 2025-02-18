"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './HomeNavbar.css';

// Custom hook to detect window size
const useWindowSize = () => {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { width } = useWindowSize();
  const pathname = usePathname();

  // Determine if the view is mobile based on the window width (e.g., 1024px or 64rem)
  const isMobileView = width <= 64 * 16;

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Automatically close the mobile menu when transitioning to desktop view
  useEffect(() => {
    if (!isMobileView) {
      setMobileMenuOpen(false);
    }
  }, [isMobileView]);

  // Close dropdowns and mobile menu when navigating to specific pages
  useEffect(() => {
    if (['/', '/login', '/signup'].includes(pathname)) {
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    }
  }, [pathname]);

  // Handler to reset dropdown/mobile state when clicking on navigation buttons
  const handleNavClick = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <h1>
        <Link href="/" className="logo" onClick={handleNavClick}>
          Orbat
        </Link>
      </h1>

      {/* Hamburger Menu for Mobile View */}
      {isMobileView && (
        <div className="hamburger" onClick={toggleMobileMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      )}

      {/* Navigation Links */}
      <ul className={`nav-links ${isMobileView && isMobileMenuOpen ? 'mobile-menu' : ''}`}>
        <li className="nav-item">
          <span onClick={() => toggleDropdown('products')}>
            Products <span className="caret">{activeDropdown === 'products' ? '▲' : '▼'}</span>
          </span>
          {activeDropdown === 'products' && (
            <ul className="dropdown-menu">
              <li>
                <Link href="/products/product1" onClick={handleNavClick}>
                  Product 1
                </Link>
              </li>
              <li>
                <Link href="/products/product2" onClick={handleNavClick}>
                  Product 2
                </Link>
              </li>
              <li>
                <Link href="/products/product3" onClick={handleNavClick}>
                  Product 3
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className="nav-item">
          <span onClick={() => toggleDropdown('solutions')}>
            Solutions <span className="caret">{activeDropdown === 'solutions' ? '▲' : '▼'}</span>
          </span>
          {activeDropdown === 'solutions' && (
            <ul className="dropdown-menu">
              <li>
                <Link href="/solutions/solution1" onClick={handleNavClick}>
                  Solution 1
                </Link>
              </li>
              <li>
                <Link href="/solutions/solution2" onClick={handleNavClick}>
                  Solution 2
                </Link>
              </li>
              <li>
                <Link href="/solutions/solution3" onClick={handleNavClick}>
                  Solution 3
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className="nav-item">
          <span onClick={() => toggleDropdown('resources')}>
            Resources <span className="caret">{activeDropdown === 'resources' ? '▲' : '▼'}</span>
          </span>
          {activeDropdown === 'resources' && (
            <ul className="dropdown-menu">
              <li>
                <Link href="/resources/blog" onClick={handleNavClick}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/resources/faq" onClick={handleNavClick}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/resources/support" onClick={handleNavClick}>
                  Support
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className="nav-item">
          <span onClick={() => toggleDropdown('pricing')}>
            Pricing <span className="caret">{activeDropdown === 'pricing' ? '▲' : '▼'}</span>
          </span>
          {activeDropdown === 'pricing' && (
            <ul className="dropdown-menu">
              <li>
                <Link href="/pricing/basic" onClick={handleNavClick}>
                  Basic
                </Link>
              </li>
              <li>
                <Link href="/pricing/pro" onClick={handleNavClick}>
                  Pro
                </Link>
              </li>
              <li>
                <Link href="/pricing/enterprise" onClick={handleNavClick}>
                  Enterprise
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          {/* Changed href from "/signin" to "/login" to match your login page route */}
          <Link href="/home/registration/login" onClick={handleNavClick}>
            Login
          </Link>
        </li>
        <li>
          <Link href="/home/registration/signup" className="signup-btn" onClick={handleNavClick}>
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
