import React, { useState } from "react";
import "../styles/SafetyInfo.css";

const laws = [
  {
    icon: "📜",
    title: "Constitutional Rights",
    tag: "Constitution",
    color: "#7c3aed",
    items: [
      { label: "Article 14", desc: "Equality before law — no discrimination on any basis." },
      { label: "Article 15(3)", desc: "Special provisions for women and children." },
      { label: "Article 21", desc: "Right to life & personal liberty — includes right to live with dignity." },
      { label: "Article 39(d)", desc: "Equal pay for equal work for men and women." },
    ],
  },
  {
    icon: "⚖️",
    title: "Criminal Laws (IPC / BNS)",
    tag: "Criminal",
    color: "#c026d3",
    items: [
      { label: "Section 354", desc: "Assault on women — outraging modesty. Punishable with 1–5 years." },
      { label: "Section 354A", desc: "Sexual harassment — unwelcome physical contact, demands, remarks." },
      { label: "Section 354D", desc: "Stalking — following, contacting, monitoring online. Up to 5 years." },
      { label: "Section 509", desc: "Insulting modesty of a woman by word, gesture or act." },
      { label: "Section 376", desc: "Rape & aggravated rape — minimum 10 years, up to life imprisonment." },
    ],
  },
  {
    icon: "🏠",
    title: "Domestic Violence Act, 2005",
    tag: "Domestic",
    color: "#f43f5e",
    items: [
      { label: "Physical Abuse", desc: "Protection from bodily harm, assault, or threat of harm." },
      { label: "Emotional Abuse", desc: "Covers verbal abuse, humiliation, and mental cruelty." },
      { label: "Economic Abuse", desc: "Denial of financial resources, property, or employment." },
      { label: "Right to Residence", desc: "Cannot be evicted from shared household without court order." },
      { label: "Protection Orders", desc: "Court can issue immediate protection and monetary relief." },
    ],
  },
  {
    icon: "💼",
    title: "POSH Act, 2013 (Workplace Safety)",
    tag: "Workplace",
    color: "#0ea5e9",
    items: [
      { label: "Coverage", desc: "Applies to all workplaces — offices, colleges, remote work, NGOs." },
      { label: "ICC Mandatory", desc: "Every org with 10+ employees must have Internal Complaints Committee." },
      { label: "Complaint Window", desc: "Complaint must be filed within 3 months of incident." },
      { label: "Penalty", desc: "Employer can be fined ₹50,000 for non-compliance." },
    ],
  },
  {
    icon: "🌐",
    title: "Cyber Safety Laws (IT Act)",
    tag: "Cyber",
    color: "#10b981",
    items: [
      { label: "IT Act 66E", desc: "Violation of privacy — capturing/publishing private images. Up to 3 years." },
      { label: "IT Act 67", desc: "Publishing obscene content online. Up to 5 years imprisonment." },
      { label: "IT Act 66C/D", desc: "Identity theft and impersonation online." },
      { label: "Cyber Stalking", desc: "Covered under IPC 354D — monitoring via internet is punishable." },
      { label: "Revenge Porn", desc: "Sharing intimate images without consent — criminal offense." },
    ],
  },
  {
    icon: "👶",
    title: "POCSO Act, 2012",
    tag: "Child Safety",
    color: "#f59e0b",
    items: [
      { label: "Protection", desc: "Protects children under 18 from sexual offenses." },
      { label: "Mandatory Reporting", desc: "Any person aware of offense must report to police." },
      { label: "Special Courts", desc: "Designated courts for speedy trial of cases." },
      { label: "Punishment", desc: "Minimum 7 years to life imprisonment for penetrative assault." },
    ],
  },
];

const helplines = [
  { name: "Women Helpline", number: "181", icon: "👩" },
  { name: "Police Emergency", number: "112", icon: "🚔" },
  { name: "Domestic Violence", number: "1091", icon: "🏠" },
  { name: "Child Helpline", number: "1098", icon: "👶" },
  { name: "Cyber Crime", number: "1930", icon: "💻" },
  { name: "National Emergency", number: "112", icon: "🆘" },
];

const WomenSafetyLaws = () => {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="safety-page">
      <div className="safety-bg-orb safety-bg-orb--1" />
      <div className="safety-bg-orb safety-bg-orb--2" />

      <div className="safety-container">
        {/* Header */}
        <div className="safety-header">
          <div className="section-badge">⚖️ Legal Rights</div>
          <h1 className="section-title">
            Women Safety Laws{" "}
            <span className="gradient-text">in India</span>
          </h1>
          <p className="section-subtitle">
            Knowing your legal rights empowers you to stay safe, take action, and seek justice.
          </p>
        </div>

        {/* Emergency Helplines */}
        <div className="safety-helplines">
          <h2 className="safety-helplines__title">🚨 Emergency Helplines</h2>
          <div className="safety-helplines__grid">
            {helplines.map((h, i) => (
              <a key={i} href={`tel:${h.number}`} className="safety-helpline-card">
                <span className="safety-helpline-card__icon">{h.icon}</span>
                <div>
                  <div className="safety-helpline-card__name">{h.name}</div>
                  <div className="safety-helpline-card__number">{h.number}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Law Cards */}
        <div className="safety-laws-grid">
          {laws.map((law, i) => (
            <div
              key={i}
              className={`safety-law-card ${expanded === i ? "safety-law-card--open" : ""}`}
              style={{ "--law-color": law.color }}
            >
              <div className="safety-law-card__header" onClick={() => setExpanded(expanded === i ? null : i)}>
                <div className="safety-law-card__left">
                  <span className="safety-law-card__icon">{law.icon}</span>
                  <div>
                    <div className="safety-law-card__title">{law.title}</div>
                    <span className="safety-law-card__tag">{law.tag}</span>
                  </div>
                </div>
                <span className="safety-law-card__chevron">{expanded === i ? "▲" : "▼"}</span>
              </div>

              {expanded === i && (
                <div className="safety-law-card__body">
                  {law.items.map((item, j) => (
                    <div key={j} className="safety-law-item">
                      <div className="safety-law-item__label">{item.label}</div>
                      <div className="safety-law-item__desc">{item.desc}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Steps */}
        <div className="safety-action-box">
          <h2 className="safety-action-box__title">📌 What To Do If You're in Danger</h2>
          <div className="safety-action-steps">
            {[
              { step: "1", text: "Call emergency helpline immediately (112)" },
              { step: "2", text: "Go to nearest police station — file Zero FIR (can be filed anywhere)" },
              { step: "3", text: "Preserve evidence — messages, screenshots, call logs" },
              { step: "4", text: "Contact a women's NGO or legal aid center" },
              { step: "5", text: "Use SheCurity SOS to alert trusted contacts" },
            ].map((s, i) => (
              <div key={i} className="safety-action-step">
                <div className="safety-action-step__num">{s.step}</div>
                <div className="safety-action-step__text">{s.text}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="safety-quote">
          💜 "Knowing the law is the first step toward safety."
        </p>
      </div>
    </div>
  );
};

export default WomenSafetyLaws;
