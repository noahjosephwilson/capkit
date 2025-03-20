import React from 'react';
import styles from './HeroPage.module.css';

function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.contentWrapper}>
        
        {/* Headline */}
        <h1 className={styles.headline}>
            Equity management <br /> in <span className={styles.highlight}>Two Clicks</span>.
        </h1>

        {/* Subheading */}
        <p className={styles.subheading}>
        </p>
        {/* Buttons */}
        <div >
          <button className={styles.startButton}>
            Start for Free
            <span className={styles.arrow}>&rarr;</span>
          </button> 
        </div>
      </div>
    </section>
  );
}

export default Hero;
