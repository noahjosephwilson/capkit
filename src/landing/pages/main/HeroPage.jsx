import React from 'react';
import styles from './HeroPage.module.css';
import {
  CapTableIcon,
  DocumentsIcon,
  VisualsIcon,
  ValuationIcon,
  FundingIcon
} from '@/landing/Icons/Icons.jsx';

function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.contentWrapper}>
        {/* Headline */}
        <h1 className={styles.headline}>
            Your <span className={styles.highlight}> day-one </span> CFO 
        </h1>
        {/* Subheading */}
        <p className={styles.subheading}>
          Manage your startup's equity in two clicks.
        </p>
        {/* Buttons */}
        <div >
          <button className={styles.startButton}>
            Start for Free
            <span className={styles.arrow}>&rarr;</span>
          </button> 
        </div>
        <div className={styles.capabilitiesContainer}>
          <button className={styles.capabilityButton}>
            <CapTableIcon className={styles.icon} />
            Cap Table
          </button>
          <button className={styles.capabilityButton}>
            <DocumentsIcon className={styles.icon} />
            Documents
          </button>
          <button className={styles.capabilityButton}>
            <VisualsIcon className={styles.icon} />
            Visuals
          </button>
          <button className={styles.capabilityButton}>
            <ValuationIcon className={styles.icon} />
            409A Valuation
          </button>
          <button className={styles.capabilityButton}>
            <FundingIcon className={styles.icon} />
            Funding Rounds
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
