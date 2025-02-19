'use client';

import React, { useEffect } from 'react';
import './HomePage.css';

// Define the Capkit component so that <Capkit /> works.
function Capkit() {
  return <span>Capkit</span>;
}

const HomePage = () => {
  useEffect(() => {
    // Intersection Observer for fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.1 }
    );

    fadeElements.forEach(el => observer.observe(el));
    return () => fadeElements.forEach(el => observer.unobserve(el));
  }, []);

  return (
    <div className="home">
      {/* HERO SECTION */}
      <section className="snap-section hero-section fade-in">
        <div className="hero-content">
          <h1>
            Welcome to <span className="highlight"><Capkit /></span>
          </h1>
          <p className="hero-subtext">
            Streamline your equity management and focus on growing your startup.
          </p>
          <div className="cta-buttons">
            <a href="/signup" className="btn primary-btn">Get Started</a>
            <a href="/signin" className="btn secondary-btn">Sign In</a>
          </div>
        </div>
        <div className="hero-image-container">
          <img
            src="/assets/MoreHappy.png"
            alt="Startup Hero"
            className="hero-image"
          />
        </div>
      </section>

      {/* LATEST SECTION (New 4-Card Layout) */}
      <section className="snap-section latest-section fade-in">
        <h2>Explore the latest from <Capkit /></h2>
        <div className="latest-cards">

          {/* Card 1 */}
          <div className="latest-card">
            <div className="card-brand-year">2024 in review</div>
            <h3 className="card-title">State of Private Markets</h3>
            <p className="card-subtitle">Q4 State of Private Markets</p>
            <p className="card-desc">
              Read the latest findings on startup markets, including trends
              and highlights.
            </p>
            <a href="/markets" className="viewmore-link">View more</a>
          </div>

          {/* Card 2 */}
          <div className="latest-card">
            <div className="card-brand-year">2025</div>
            <h3 className="card-title">Founder Ownership Report</h3>
            <p className="card-subtitle">Founder Ownership Report</p>
            <p className="card-desc">
              Learn how startups divide their equity among co-founders and
              other key shareholders in this comprehensive guide.
            </p>
            <a href="/founder-report" className="viewmore-link">View more</a>
          </div>

          {/* Card 3 */}
          <div className="latest-card">
            <div className="card-brand-year"><Capkit /> + Stripe</div>
            <h3 className="card-title">Incorporate your company</h3>
            <p className="card-subtitle">Launch faster</p>
            <p className="card-desc">
              The best ways to incorporate your company, ensuring legal
              compliance and streamlined operations.
            </p>
            <a href="/incorporate" className="viewmore-link">View more</a>
          </div>

          {/* Card 4 */}
          <div className="latest-card">
            <div className="card-brand-year">Capkit Tools</div>
            <h3 className="card-title">Start fundraising</h3>
            <p className="card-subtitle">A simpler round</p>
            <p className="card-desc">
              A faster, easier, and more cost-effective way to manage your
              next fundraising round.
            </p>
            <a href="/fundraising" className="viewmore-link">View more</a>
          </div>

        </div>
      </section>

      {/* FEATURE SECTION 1 */}
      <section className="snap-section feature-section fade-in">
        <div className="feature-image-container">
          <img
            src="/assets/startup.png"
            alt="Equity Tracking"
            className="feature-image"
          />
        </div>
        <div className="feature-text">
          <h2>Simple Equity Tracking</h2>
          <p>
            Manage your cap table with ease—from founder shares to employee stock options.
          </p>
        </div>
      </section>

      {/* FEATURE SECTION 2 */}
      <section className="snap-section feature-section fade-in">
        <div className="feature-image-container">
          <img
            src="/assets/combinator.png"
            alt="Investor & Employee Friendly"
            className="feature-image"
          />
        </div>
        <div className="feature-text">
          <h2>Investor &amp; Employee Friendly</h2>
          <p>
            Keep stakeholders happy with transparent, up-to-date equity distribution info.
          </p>
        </div>
      </section>

      {/* FEATURE SECTION 3 */}
      <section className="snap-section feature-section fade-in">
        <div className="feature-image-container">
          <img
            src="/assets/people.png"
            alt="Compliance & Security"
            className="feature-image"
          />
        </div>
        <div className="feature-text">
          <h2>Compliance &amp; Security</h2>
          <p>
            Reduce legal complexity and ensure compliance with the latest regulations.
          </p>
        </div>
      </section>

      {/* FEATURE SECTION 4 – Cap Table Visualization */}
      <section className="snap-section feature-section fade-in">
        <div className="feature-image-container">
          <img
            src="/assets/captable.png"
            alt="Cap Table Visualization"
            className="feature-image"
          />
        </div>
        <div className="feature-text">
          <h2>Cap Table Visualization</h2>
          <p>
            Get a clear, dynamic overview of your equity distribution and ownership structure in one place.
          </p>
        </div>
      </section>

      {/* TESTIMONIAL SECTION */}
      <section className="snap-section testimonial-section fade-in">
        <div className="testimonial-content">
          <img
            src="/assets/MoreHappy.png"
            alt="Testimonial"
            className="testimonial-image"
          />
          <div className="testimonial-text">
            <h2>"Tracking equity for startups is very complex. Capkit makes it easier."</h2>
            <p>
              This platform is a game changer for managing cap tables and equity distributions without the hassle.
            </p>
          </div>
        </div>
      </section>

      {/* CALL-TO-ACTION SECTION */}
      <section className="snap-section cta-section fade-in">
        <h2>Ready to simplify your equity management?</h2>
        <p>Sign up now or learn more about how Capkit can help you scale.</p>
        <div className="cta-buttons">
          <a href="/signup" className="btn primary-btn">Get Started</a>
          <a href="/learn-more" className="btn secondary-btn">Learn More</a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;




