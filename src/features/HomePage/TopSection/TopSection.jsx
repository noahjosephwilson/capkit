"use client";
import React from 'react';
import { motion } from 'framer-motion';
import styles from './TopSection.module.css';

const TopSection = () => {
  return (
    <div className={styles.topContainer}>
      <header className={styles.header}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.headerContent}
        >
          <div className={styles.logo}>EquiPro</div>
          <nav className={styles.nav}>
            <a href="#features" className={styles.navLink}>Features</a>
            <a href="#about" className={styles.navLink}>About</a>
            <a href="#contact" className={styles.navLink}>Contact</a>
          </nav>
        </motion.div>
      </header>

      <motion.section 
        className={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className={styles.heroContent}>
          <div className={styles.leftContent}>
            <motion.h1 
              className={styles.heroSlogan}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              One Site. All The Tools.
            </motion.h1>
            <motion.h2 
              className={styles.heroTitle}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Build Your Empire with the Cheapest Startup Management Platform
            </motion.h2>
            <motion.p 
              className={styles.heroSubtitle}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Manage your startup like never before. Our platform offers cap table management, vested equity tracking, issuing shares, document creation &amp; signing, employee equity tracking &amp; vesting schedules, and custom profiles – all in one place. It’s the cheapest cap table management tool on the market. We’re bringing startup management to everyone.
            </motion.p>
            <motion.div
              className={styles.bulletsContainer}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.65 }}
            >
              <ul className={styles.bulletList}>
                <li>Offer equity in minutes</li>
                <li>Keep cap table clean</li>
                <li>Motivate your team</li>
              </ul>
            </motion.div>
            <motion.div
              className={styles.buttonsContainer}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <a href="#signup" className={styles.ctaButton}>Sign Up Free</a>
              <a href="#login" className={styles.loginButton}>Log In</a>
            </motion.div>
            <motion.div
              className={styles.ratingContainer}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.75 }}
            >
              <span className={styles.ratingStars}>★★★★★</span>
              <span className={styles.ratingText}>Rated 5/5 Stars</span>
            </motion.div>
          </div>
          <div className={styles.rightContent}>
            <motion.img 
              src="/assets/landingpage.jpg" 
              alt="Startup Management" 
              className={styles.heroImage}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default TopSection;
