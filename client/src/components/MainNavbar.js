import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isLoggedIn, logoutUser } from "../helpers/authHelper";
import EmailSOS from "../pages/SOS";
import "../styles/navbar.css";

const MainNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = isLoggedIn();
  const [showSOSAlert, setShowSOSAlert] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("shecurity-theme") === "dark";
  });
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("shecurity-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const navLinks = [
    { to: "/home", label: "Home" },
    { to: "/self-defense", label: "Self Defense" },
    { to: "/explore", label: "Community" },
    { to: "/resources", label: "Resources" },
    { to: "/ourAbout", label: "About" },
  ];

  return (
    <>
      <nav className={`sc-navbar ${scrolled ? "sc-navbar--scrolled" : ""}`} ref={menuRef}>
        <div className="sc-navbar__container">
          {/* Logo */}
          <Link className="sc-navbar__brand" to="/home">
            <span className="sc-navbar__logo-icon">🛡️</span>
            <span className="sc-navbar__logo-text">
              She<span className="sc-navbar__logo-accent">Curity</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="sc-navbar__links">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  className={`sc-navbar__link ${location.pathname === link.to ? "sc-navbar__link--active" : ""}`}
                  to={link.to}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="sc-navbar__actions">
            {/* Dark Mode Toggle */}
            <button
              className="sc-navbar__theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            {/* SOS Button */}
            {user && (
              <button
                className="btn-sos sc-navbar__sos"
                onClick={() => setShowSOSAlert(true)}
              >
                🚨 SOS
              </button>
            )}

            {/* Auth */}
            {user ? (
              <button className="btn-outline-glow sc-navbar__auth-btn" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link className="btn-primary-glow sc-navbar__auth-btn" to="/login">
                Login
              </Link>
            )}

            {/* Mobile Hamburger */}
            <button
              className={`sc-navbar__hamburger ${menuOpen ? "sc-navbar__hamburger--open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`sc-navbar__mobile-menu ${menuOpen ? "sc-navbar__mobile-menu--open" : ""}`}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              className={`sc-navbar__mobile-link ${location.pathname === link.to ? "sc-navbar__mobile-link--active" : ""}`}
              to={link.to}
            >
              {link.label}
            </Link>
          ))}
          <div className="sc-navbar__mobile-actions">
            <button className="sc-navbar__theme-toggle" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
            {user ? (
              <>
                <button className="btn-sos" onClick={() => setShowSOSAlert(true)}>🚨 SOS Alert</button>
                <button className="btn-outline-glow" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <Link className="btn-primary-glow" to="/login">Login</Link>
            )}
          </div>
        </div>
      </nav>

      {showSOSAlert && (
        <EmailSOS onClose={() => setShowSOSAlert(false)} isVisible={showSOSAlert} />
      )}
    </>
  );
};

export default MainNavbar;
