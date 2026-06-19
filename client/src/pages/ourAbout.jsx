import React  from "react";
 import "../styles/ourAbout.css";

const features = [
  {
    title: "🚨 Red Alert SOS",
    desc: "With a single tap, send an SOS signal that instantly shares your live location, audio recording, and danger status with your trusted circle and local police stations. The alert remains active until you are confirmed safe.",
    img: "https://www.searchenginejournal.com/wp-content/uploads/2020/01/bc1be38b-cef6-4f2b-9ed4-ff6d1098047c-5e3375687b680.jpeg",
    reverse: false,
  },
  {
    title: "🗺️ Real-time Map Tracking",
    desc: "Let your family and friends monitor your journey live. The system notifies them if your route changes unexpectedly, ensuring they can intervene quickly when something doesn’t feel right.",
    img: "https://i.pinimg.com/736x/5f/ca/09/5fca09f8f5825ecdf8378eab8d80a84b.jpg",
    reverse: true,
  },
  {
    title: "☁️ Cloud Video Evidence",
    desc: "Secretly record video, audio, or photos in high-stress situations. All files are auto-encrypted and uploaded to the cloud, so even if your device is taken or destroyed, the evidence is safe and retrievable.",
    img: "https://images.unsplash.com/photo-1508780709619-79562169bc64?q=80&w=1200",
    reverse: false,
  },
  {
    title: "📝 Digital Police Complaint",
    desc: "No more paperwork delays. File a verified complaint through the app with just a few clicks. Your profile data auto-fills the forms and sends directly to the nearest police station.",
    img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1200",
    reverse: true,
  },
  {
    title: "⚖️ Women’s Law Guide",
    desc: "Know your rights. Browse through a curated library of women’s safety laws, helpline numbers, and legal guides that empower you to take informed actions instantly.",
    img: "https://www.writinglaw.com/wp-content/uploads/2021/10/Most-Important-Legal-Rights-of-Women-in-India.png",
    reverse: false,
  },
  {
    title: "🛡️ Self-Defence Lessons",
    desc: "Learn effective defence moves through illustrated guides and expert-led videos. Gain confidence to protect yourself with techniques that actually work in real-life scenarios.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Nu8vvlrOVF-aVSJuzpf_TwqPQD7PWt7cxgwLQD0jk1FAZeb9NgQNaD_klcviwtSjCgI&usqp=CAU",
    reverse: true,
  },
  {
    title: "🤝 Local Safety Community",
    desc: "Join hands with nearby volunteers, NGOs, and safety groups. Build a support network where help is always around the corner.",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200",
    reverse: false,
  },
  {
    title: "📞 Fake Call Escape",
    desc: "Trigger a realistic fake call to get out of uncomfortable situations. Choose from custom voices (parent, friend, office boss) to make it more convincing.",
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200",
    reverse: true,
  },
  {
    title: "🤖 Safety Chatbot",
    desc: "Our 24/7 AI chatbot answers your safety queries instantly, connects you to local emergency services, and guides you step-by-step during distress situations.",
    img: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?q=80&w=1200",
    reverse: false,
  },
  {
    title: "👥 Trusted Circle",
    desc: "Add your closest family and friends as emergency contacts. During an SOS, they get live updates of your location, battery status, and safety checks until you are secure.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200",
    reverse: true,
  },
];

const Bubble = ({ size, color, style }) => (
  <div className={`bubble ${size} ${color || ""}`} style={style}></div>
);

const Feature = ({ title, desc, img, reverse }) => (
  <section className={`ourAbout-feature ${reverse ? "reverse" : ""}`}>
    <img src={img} alt={title} />
    <div className="text">
      <h2>{title}</h2>
      <p>{desc}</p>
    </div>
  </section>
);

const OurAbout = () => {
  return (
    <div className="ourAbout">
      {/* Bubbles */}
      <Bubble size="small" style={{ top: 50, left: 20 }} />
      <Bubble size="medium" color="blue" style={{ top: 300, right: 50 }} />
      <Bubble size="large" style={{ bottom: 150, left: -80 }} />
      <Bubble size="small" color="blue" style={{ bottom: 100, right: 100 }} />

      {/* Features */}
      {features.map((f, index) => (
        <Feature
          key={index}
          title={f.title}
          desc={f.desc}
          img={f.img}
          reverse={f.reverse}
        />
      ))}
    </div>
  );
};

export default OurAbout;