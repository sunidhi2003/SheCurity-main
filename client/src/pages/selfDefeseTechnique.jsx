import React, { useState } from "react";
import "../styles/SelfD.css";

const techniques = [
  {
    icon: "🚨",
    title: "Basic Safety Awareness",
    level: "beginner",
    desc: "Prevention is the best defense. Stay aware of your surroundings at all times.",
    tips: [
      "Be aware of your surroundings — avoid distractions like phone while walking",
      "Avoid dark, isolated areas especially at night",
      "Trust your instincts — if something feels wrong, leave",
      "Keep your phone charged and share location with trusted contacts",
      "Walk confidently — attackers target those who appear distracted or vulnerable",
    ],
  },
  {
    icon: "✋",
    title: "Wrist Release Technique",
    level: "beginner",
    desc: "If someone grabs your wrist, rotate your hand toward the attacker's thumb and pull away sharply. The thumb is the weakest grip point.",
    tips: [
      "Rotate your wrist toward the attacker's thumb",
      "Pull sharply and quickly in one motion",
      "Step back immediately after breaking free",
      "Shout loudly to attract attention",
    ],
  },
  {
    icon: "🦵",
    title: "Kick to Vulnerable Areas",
    level: "intermediate",
    desc: "Target sensitive areas to create distance and escape. Strike quickly and run immediately — do not stay to fight.",
    tips: [
      "Groin kick — most effective against male attackers",
      "Knee strike — stomp or kick the knee sideways",
      "Shin scrape — drag your heel down their shin",
      "Instep stomp — stamp hard on their foot",
      "Always run immediately after striking",
    ],
  },
  {
    icon: "👊",
    title: "Palm Strike",
    level: "intermediate",
    desc: "Use the heel of your palm to strike the nose or chin. Safer and more effective than a closed fist — less risk of injuring your hand.",
    tips: [
      "Keep fingers bent back, strike with heel of palm",
      "Target: nose, chin, or throat",
      "Drive through the target, don't just tap",
      "Follow up with a knee strike if needed",
      "Create distance and run",
    ],
  },
  {
    icon: "😱",
    title: "Use Your Voice",
    level: "beginner",
    desc: "A loud, assertive voice attracts attention and can startle attackers. Don't be afraid to make noise.",
    tips: [
      'Shout: "STOP!", "HELP!", "BACK OFF!", "FIRE!"',
      "Yelling 'FIRE' often gets faster response than 'HELP'",
      "Use a firm, commanding tone — not pleading",
      "Keep shouting to attract bystanders",
    ],
  },
  {
    icon: "🎒",
    title: "Everyday Objects for Defense",
    level: "beginner",
    desc: "You always have tools available. Use everyday objects to create distance and escape.",
    tips: [
      "Keys — hold between fingers, target eyes or face",
      "Bag — swing to create distance or block",
      "Water bottle — strike sensitive areas",
      "Umbrella — use as a barrier or strike",
      "Pepper spray — if legally available, carry it",
    ],
  },
  {
    icon: "🤼",
    title: "Bear Hug Escape",
    level: "intermediate",
    desc: "If grabbed from behind with arms pinned, use your body weight and momentum to escape.",
    tips: [
      "Drop your weight suddenly by bending knees",
      "Stomp hard on attacker's foot",
      "Throw your head back to hit their face",
      "Grab and twist fingers if possible",
      "Once free, run and shout for help",
    ],
  },
  {
    icon: "🧠",
    title: "Mental Preparedness",
    level: "advanced",
    desc: "Your mindset is your most powerful weapon. Mental preparation can mean the difference between freezing and acting.",
    tips: [
      "Visualize escape scenarios in advance",
      "Practice saying 'NO' loudly and firmly",
      "Know your exits in any location you enter",
      "Have an emergency plan and share it with contacts",
      "Stay calm — panic reduces your ability to think clearly",
    ],
  },
];

const doNots = [
  "Do not freeze — force yourself to act",
  "Do not try to fight unnecessarily — escape is always the goal",
  "Do not stay after striking — run immediately",
  "Do not panic — take a breath and think",
  "Do not go to a second location with an attacker",
];

const levelColors = {
  beginner: { bg: "rgba(34,197,94,0.12)", color: "#22c55e", label: "Beginner" },
  intermediate: { bg: "rgba(245,158,11,0.12)", color: "#f59e0b", label: "Intermediate" },
  advanced: { bg: "rgba(239,68,68,0.12)", color: "#ef4444", label: "Advanced" },
};

export default function SelfDefensePage() {
  const [expanded, setExpanded] = useState(0);

  return (
    <div className="selfdefense-page">
      <div className="selfdefense-bg-orb selfdefense-bg-orb--1" />
      <div className="selfdefense-bg-orb selfdefense-bg-orb--2" />

      <div className="selfdefense-container">
        {/* Header */}
        <div className="selfdefense-header">
          <div className="section-badge">🥋 Self Defense</div>
          <h1 className="section-title">
            Self-Defense Techniques{" "}
            <span className="gradient-text">for Women</span>
          </h1>
          <p className="section-subtitle">
            Self-defense is about awareness, confidence, and escaping safely.
            These techniques are practical and require no prior training.
          </p>
        </div>

        {/* Techniques */}
        <div className="selfdefense-techniques">
          {techniques.map((tech, i) => {
            const lvl = levelColors[tech.level];
            return (
              <div
                key={i}
                className={`selfdefense-card ${expanded === i ? "selfdefense-card--open" : ""}`}
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <div className="selfdefense-card__header">
                  <div className="selfdefense-card__left">
                    <span className="selfdefense-card__icon">{tech.icon}</span>
                    <div>
                      <div className="selfdefense-card__title">{tech.title}</div>
                      <span
                        className="selfdefense-card__level"
                        style={{ background: lvl.bg, color: lvl.color }}
                      >
                        {lvl.label}
                      </span>
                    </div>
                  </div>
                  <span className="selfdefense-card__chevron">{expanded === i ? "▲" : "▼"}</span>
                </div>

                {expanded === i && (
                  <div className="selfdefense-card__body">
                    <p className="selfdefense-card__desc">{tech.desc}</p>
                    <ul className="selfdefense-card__tips">
                      {tech.tips.map((tip, j) => (
                        <li key={j} className="selfdefense-card__tip">
                          <span className="selfdefense-card__tip-dot">→</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Do NOT section */}
        <div className="selfdefense-donot">
          <h2 className="selfdefense-donot__title">🚫 What NOT To Do</h2>
          <div className="selfdefense-donot__list">
            {doNots.map((item, i) => (
              <div key={i} className="selfdefense-donot__item">
                <span>✗</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency */}
        <div className="selfdefense-emergency">
          <div className="selfdefense-emergency__icon">🆘</div>
          <div>
            <div className="selfdefense-emergency__title">Emergency Actions</div>
            <div className="selfdefense-emergency__text">
              Use the SheCurity SOS feature, call emergency services (112), and share your live location with trusted contacts immediately.
            </div>
          </div>
          <a href="tel:112" className="btn-primary-glow selfdefense-emergency__btn">
            Call 112
          </a>
        </div>

        <p className="selfdefense-quote">
          "Self-defense is not about strength. It's about awareness and confidence."
        </p>
      </div>
    </div>
  );
}
