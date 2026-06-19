import React, { useEffect, useRef } from "react";
import "../styles/features.css";

const featuresData = [
  {
    icon: "🚨",
    title: "SOS Emergency Alert",
    description: "One-tap SOS sends your live location, audio/video recording, and alerts to trusted contacts and authorities instantly.",
    action: () => window.open("/red-alert", "_blank"),
    btnLabel: "Activate SOS",
    color: "#f43f5e",
    gradient: "linear-gradient(135deg, rgba(244,63,94,0.15), rgba(244,63,94,0.05))",
    tag: "Critical",
  },
  {
    icon: "📍",
    title: "Live Location Tracking",
    description: "Real-time GPS tracking shared with trusted contacts. View live dashboard and location history anytime.",
    action: () => window.open("/alert", "_blank"),
    btnLabel: "Track Now",
    color: "#c026d3",
    gradient: "linear-gradient(135deg, rgba(192,38,211,0.15), rgba(192,38,211,0.05))",
    tag: "Live",
  },
  {
    icon: "📋",
    title: "Digital Police Complaint",
    description: "File an incident report digitally with evidence. Secure, encrypted, and directly forwarded to authorities.",
    action: () => window.open("/complaint-form", "_blank"),
    btnLabel: "File Complaint",
    color: "#7c3aed",
    gradient: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(124,58,237,0.05))",
    tag: "Official",
  },
  {
    icon: "⚖️",
    title: "Women's Law Guide",
    description: "Know your rights. Access comprehensive guides on laws protecting women in India — IPC, POCSO, and more.",
    action: () => window.open("/law", "_blank"),
    btnLabel: "Know Your Rights",
    color: "#0ea5e9",
    gradient: "linear-gradient(135deg, rgba(14,165,233,0.15), rgba(14,165,233,0.05))",
    tag: "Legal",
  },
  {
    icon: "🥋",
    title: "Self Defence Lessons",
    description: "Learn practical self-defense techniques with step-by-step video guides curated by certified trainers.",
    action: () => window.open("/self-defense", "_blank"),
    btnLabel: "Start Learning",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))",
    tag: "Training",
  },
  {
    icon: "📞",
    title: "Fake Call Escape",
    description: "Simulate a real incoming call to escape uncomfortable or dangerous situations discreetly and safely.",
    action: () => window.open("/caller-input", "_blank"),
    btnLabel: "Activate Fake Call",
    color: "#10b981",
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))",
    tag: "Escape",
  },
  {
    icon: "🤝",
    title: "Safety Community",
    description: "Connect with a trusted community of women. Share experiences, tips, and support each other.",
    action: () => window.open("/explore", "_self"),
    btnLabel: "Join Community",
    color: "#8b5cf6",
    gradient: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(139,92,246,0.05))",
    tag: "Community",
  },
  {
    icon: "🆘",
    title: "Emergency Contacts",
    description: "Instant access to national and state-wise emergency helplines — police, ambulance, women's helpline.",
    action: () => window.open("/emer-contact", "_blank"),
    btnLabel: "View Contacts",
    color: "#ef4444",
    gradient: "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05))",
    tag: "Emergency",
  },
  {
    icon: "🤖",
    title: "AI Safety Chatbot",
    description: "24/7 AI-powered chatbot for safety advice, legal guidance, and emotional support whenever you need it.",
    action: null,
    btnLabel: "Chat Now",
    color: "#06b6d4",
    gradient: "linear-gradient(135deg, rgba(6,182,212,0.15), rgba(6,182,212,0.05))",
    tag: "AI",
  },
];

const FeatureCard = ({ feature, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("feature-card--visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="feature-card"
      style={{ "--card-color": feature.color, "--card-gradient": feature.gradient, "--delay": `${index * 0.08}s` }}
    >
      <div className="feature-card__bg" />
      <div className="feature-card__header">
        <div className="feature-card__icon-wrap">
          <span className="feature-card__icon">{feature.icon}</span>
        </div>
        <span className="feature-card__tag">{feature.tag}</span>
      </div>
      <h3 className="feature-card__title">{feature.title}</h3>
      <p className="feature-card__desc">{feature.description}</p>
      {feature.action && (
        <button className="feature-card__btn" onClick={feature.action}>
          {feature.btnLabel}
          <span className="feature-card__btn-arrow">→</span>
        </button>
      )}
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="features-section">
      <div className="features-section__bg-orb features-section__bg-orb--1" />
      <div className="features-section__bg-orb features-section__bg-orb--2" />

      <div className="features-section__container">
        <div className="features-section__header">
          <div className="section-badge">✨ Platform Features</div>
          <h2 className="section-title">
            Everything You Need to{" "}
            <span className="gradient-text">Stay Safe</span>
          </h2>
          <p className="section-subtitle">
            A complete safety ecosystem built for women — from emergency alerts to legal guidance,
            all in one powerful platform.
          </p>
        </div>

        <div className="features-grid">
          {featuresData.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
