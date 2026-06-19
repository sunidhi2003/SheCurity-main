import React, { useState, useEffect } from "react";
import "./SelfDefence.css";

const techniques = [
  {
    img: "https://i.pinimg.com/736x/58/4f/c0/584fc074244c981a87f527741f6fecf0.jpg",
    text: "A palm strike is a quick, powerful hit using the heel of your hand to disable an attacker.",
    title: "Palm Strike ✋",
  },
  {
    img: "https://www.sheknows.com/wp-content/uploads/2018/08/gfd03vsplebet1yqmsk2.jpeg?w=735",
    text: "Knee strikes are powerful, close-range attacks that use the knee to hit an opponent effectively.",
    title: "Knee Strike 🦵",
  },
  {
    img: "https://www.sheknows.com/wp-content/uploads/2018/08/hqebvndkcynozykwyps1.jpeg?w=735",
    text: "Elbow strikes are strong close-range attacks targeting vital areas like the face or ribs.",
    title: "Elbow Strike 💪",
  },
];

const videos = [
  {
    id: "K5UO9zA3GK4",
    title: "Palm Strike Tutorial",
    thumbnail: "https://img.youtube.com/vi/K5UO9zA3GK4/mqdefault.jpg",
  },
  {
    id: "7XI1uAdr_s4",
    title: "Elbow Strike Tutorial",
    thumbnail: "https://img.youtube.com/vi/7XI1uAdr_s4/mqdefault.jpg",
  },
  {
    id: "fji463dsZXo",
    title: "Knee Strike Tutorial",
    thumbnail: "https://img.youtube.com/vi/fji463dsZXo/mqdefault.jpg",
  },
  {
    id: "sY-P5GBwggU",
    title: "Escape from Wrist Grab",
    thumbnail: "https://img.youtube.com/vi/sY-P5GBwggU/mqdefault.jpg",
  },
];

const tips = [
  "Always stay aware of your surroundings.",
  "Trust your instincts—if something feels wrong, it probably is.",
  "Keep your phone charged and share your location with a trusted contact.",
  "Learn basic self-defense moves and practice them regularly.",
  "Walk confidently; attackers target those who appear vulnerable.",
];

const basicTechniques = [
  {
    title: "Palm Strike",
    desc: "A powerful strike using the heel of your palm to the attacker's nose or chin.",
    steps: [
      "Keep your fingers together and thumb tucked in",
      "Extend your arm straight from your shoulder",
      "Strike with the heel of your palm",
      "Aim for sensitive areas like nose, chin, or throat",
    ],
  },
  {
    title: "Elbow Strike",
    desc: "Use your elbow for close-range defense, especially when grabbed from behind.",
    steps: [
      "Keep your elbow bent at 90 degrees",
      "Rotate your body to generate power",
      "Strike with the point of your elbow",
      "Target vulnerable areas like ribs or face",
    ],
  },
  {
    title: "Knee Strike",
    desc: "Effective for close-range defense, especially when grabbed.",
    steps: [
      "Grab the attacker's shoulders or head",
      "Pull them down while raising your knee",
      "Strike with your knee to their groin or face",
      "Use your body weight for maximum impact",
    ],
  },
];

/* ---------- Card (flip effect) ---------- */
const Card = ({ img, text, title }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`card ${flipped ? "flipped" : ""}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="card-inner">
        <div className="card-front">
          <img src={img} alt={title} />
          <h3>{title}</h3>
        </div>
        <div className="card-back">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

/* ---------- Video Card ---------- */
const VideoCard = ({ video, onClick }) => {
  return (
    <div className="video-card" onClick={onClick}>
      <div className="video-thumbnail">
        <img src={video.thumbnail} alt={video.title} />
        <div className="play-button">▶️</div>
      </div>
      <h3>{video.title}</h3>
    </div>
  );
};

/* ---------- Video Modal ---------- */
const VideoModal = ({ videoId, onClose }) => {
  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div
        className="video-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="Video Player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <button className="close-button" onClick={onClose}>
          ✖ Close
        </button>
      </div>
    </div>
  );
};

/* ---------- Main Section ---------- */
const SelfDefenseSection = () => {
  const [selectedMove, setSelectedMove] = useState("palm");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [tipOfDay, setTipOfDay] = useState("");

  useEffect(() => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTipOfDay(randomTip);
  }, []);

  const playInstruction = () => {
    if (!window.speechSynthesis) {
      alert("Your browser does not support voice synthesis.");
      return;
    }
    let speech = new SpeechSynthesisUtterance();
    let instructions = {
      palm: "Step one: Raise your dominant hand with an open palm. Step two: Strike the attacker's nose or chin with force.",
      elbow: "Step one: Raise your elbow and aim at the attacker's chin. Step two: Use your body weight to generate power in the strike.",
      knee: "Step one: Grab the attacker and balance yourself. Step two: Drive your knee into their stomach or groin for maximum impact.",
      escape:
        "Step one: Rotate your wrist toward the attacker’s thumb. Step two: Pull away with force and step back into a defensive stance.",
    };
    speech.text = instructions[selectedMove];
    speech.rate = 0.9;
    speech.pitch = 1.2;
    window.speechSynthesis.speak(speech);
  };

  const showEmergencyHelpline = () => {
    alert(
      "🚨 Emergency Helplines:\n\n📞 Women Helpline: 1091\n📞 Police: 100\n📞 Ambulance: 108"
    );
  };

  return (
    <div className="self-defense-section">
      {/* Hero Section */}
      <div className="highlighted-text">
        <h1>🌸 Empower Yourself with Self-Defense 🌸</h1>
        <p className="subtext">
          "Strength, safety, and awareness—your shield in every situation."
        </p>
        <button className="cta-button" onClick={showEmergencyHelpline}>
          🚨 Emergency Helpline
        </button>
      </div>

      {/* Safety Tip */}
      <div className="tip-box">
        <h3>💡 Safety Tip of the Day</h3>
        <p>{tipOfDay}</p>
      </div>

      {/* 🔥 Basic Techniques Section (like your screenshot) */}
      <h2>📘 Basic Techniques</h2>
      <div className="basic-techniques">
        {basicTechniques.map((tech, i) => (
          <div key={i} className="technique-card">
            <h3>{tech.title}</h3>
            <p>{tech.desc}</p>
            <h4>Steps:</h4>
            <ol>
              {tech.steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      {/* Flip Cards */}
      <h2>🔥 Self-Defense Flip Cards</h2>
      <div className="card-container">
        {techniques.map((tech, index) => (
          <Card key={index} img={tech.img} text={tech.text} title={tech.title} />
        ))}
      </div>

      {/* Videos */}
      <h2>🎥 Video Demonstrations</h2>
      <div className="video-container">
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            video={video}
            onClick={() => setSelectedVideo(video.id)}
          />
        ))}
      </div>

      {selectedVideo && (
        <VideoModal
          videoId={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      {/* Voice Guide */}
      <h2>🔊 Voice-Guided Instructions</h2>
      <div className="voice-guide-container">
        <select
          onChange={(e) => setSelectedMove(e.target.value)}
          value={selectedMove}
        >
          <option value="palm">✋ Palm Strike</option>
          <option value="elbow">💪 Elbow Strike</option>
          <option value="knee">🦵 Knee Strike</option>
          <option value="escape">🏃‍♀️ Escape from Wrist Grab</option>
        </select>
        <button onClick={playInstruction}>▶ Play Instruction</button>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 360° Women Solution | Self-Defense Academy</p>
        <p>
          <a href="/privacy-policy">Privacy Policy</a> |{" "}
          <a href="/contact">Contact Us</a>
        </p>
      </footer>
    </div>
  );
};

export default SelfDefenseSection;
