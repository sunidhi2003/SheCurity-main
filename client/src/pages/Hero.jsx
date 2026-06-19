import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import hero from '../images/heroo.png';
import '../styles/hero.css';

const stats = [
  { value: '10K+', label: 'Women Protected' },
  { value: '500+', label: 'SOS Alerts Sent' },
  { value: '50+', label: 'Cities Covered' },
  { value: '24/7', label: 'Active Support' },
];

const Hero = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero-section">
      {/* Background Orbs */}
      <div className="hero-orb hero-orb--1" />
      <div className="hero-orb hero-orb--2" />
      <div className="hero-orb hero-orb--3" />

      {/* Grid Pattern */}
      <div className="hero-grid-pattern" />

      <div className="hero-container">
        <div className={`hero-content ${visible ? 'hero-content--visible' : ''}`}>
          {/* Badge */}
          <div className="hero-badge">
            <span className="hero-badge__dot" />
            🛡️ India's #1 Women Safety Platform
          </div>

          {/* Title */}
          <h1 className="hero-title">
            Your Safety,{' '}
            <span className="hero-title__gradient">Our Priority</span>
            <br />
            <span className="hero-title__sub">Always & Everywhere</span>
          </h1>

          {/* Description */}
          <p className="hero-description">
            SheCurity empowers women with real-time SOS alerts, live location tracking,
            AI-powered safety chatbot, and a trusted community — all in one platform.
          </p>

          {/* CTA Buttons */}
          <div className="hero-ctas">
            <Link to="/red-alert" className="btn-primary-glow hero-cta-primary">
              🚨 Activate SOS
            </Link>
            <Link to="/home#features" className="btn-outline-glow hero-cta-secondary">
              Explore Features
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="hero-trust">
            <span className="hero-trust__item">✅ Free to Use</span>
            <span className="hero-trust__item">🔒 End-to-End Encrypted</span>
            <span className="hero-trust__item">📱 Works Offline</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className={`hero-image-wrapper ${visible ? 'hero-image-wrapper--visible' : ''}`}>
          <div className="hero-image-glow" />
          <img src={hero} alt="SheCurity Women Safety" className="hero-image animate-float" />

          {/* Floating Cards */}
          <div className="hero-float-card hero-float-card--sos">
            <span className="hero-float-card__icon">🚨</span>
            <div>
              <div className="hero-float-card__title">SOS Triggered</div>
              <div className="hero-float-card__sub">Alert sent to 3 contacts</div>
            </div>
          </div>

          <div className="hero-float-card hero-float-card--safe">
            <span className="hero-float-card__icon">📍</span>
            <div>
              <div className="hero-float-card__title">Location Shared</div>
              <div className="hero-float-card__sub">Live tracking active</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="hero-stats">
        {stats.map((stat, i) => (
          <div key={i} className="hero-stat">
            <div className="hero-stat__value">{stat.value}</div>
            <div className="hero-stat__label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Wave Divider */}
      <div className="hero-wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="var(--bg-primary)" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
