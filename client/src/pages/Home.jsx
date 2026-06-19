import React, { useState } from 'react';
import About from './About';
import Hero from '../pages/Hero';
import Features from './Features';
import Parallelx from '../components/Parallelx';
import Chatbot from '../components/views/Chatbot';
import '../styles/home.css';

const Home = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <>
      <Hero />
      <Features />
      <Parallelx />
      <About />

      {/* Floating Chatbot Button */}
      <button
        className={`chatbot-fab ${isChatbotOpen ? 'chatbot-fab--open' : ''}`}
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        aria-label="Open Safety Chatbot"
        title="AI Safety Assistant"
      >
        {isChatbotOpen ? '✕' : '🤖'}
        {!isChatbotOpen && <span className="chatbot-fab__label">Safety AI</span>}
      </button>

      {/* Chatbot Panel */}
      {isChatbotOpen && (
        <div className="chatbot-panel">
          <div className="chatbot-panel__header">
            <div className="chatbot-panel__header-info">
              <span className="chatbot-panel__avatar">🤖</span>
              <div>
                <div className="chatbot-panel__name">SheCurity AI</div>
                <div className="chatbot-panel__status">
                  <span className="chatbot-panel__dot" />
                  Online — Ready to help
                </div>
              </div>
            </div>
            <button className="chatbot-panel__close" onClick={() => setIsChatbotOpen(false)}>✕</button>
          </div>
          <div className="chatbot-panel__body">
            <Chatbot />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
