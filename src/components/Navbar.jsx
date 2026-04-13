import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const navLinks = [
  { path: '/',               label: 'Home',           num: '01' },
  { path: '/about',          label: 'About',          num: '02' },
  { path: '/skills',         label: 'Skills',         num: '03' },
  { path: '/projects',       label: 'Projects',       num: '04' },
  { path: '/experience',     label: 'Experience',     num: '05' },
  { path: '/certifications', label: 'Certificates',   num: '06' },
  { path: '/contact',        label: 'Contact',        num: '07' },
];

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Navbar({ darkMode, setDarkMode }) {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const location                  = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${darkMode ? '' : 'light-mode'}`}>
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-logo">
          <span className="logo-bracket">&lt;</span>
          <span className="logo-name">Aryan</span>
          <span className="logo-dot">.</span>
          <span className="logo-dev">dev</span>
          <span className="logo-bracket">/&gt;</span>
        </NavLink>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <span className="nav-num">{link.num}</span>
              {link.label}
            </NavLink>
          ))}
          <a href="mailto:aryan.gupta9352@gmail.com" className="nav-cta">Hire Me</a>
        </div>

        <div className="navbar-actions">
          {/* Dark / Light mode toggle */}
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark/light mode"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          {/* CV Download dropdown */}
          <div className="cv-dropdown">
            <button className="cv-btn">⬇ Resume</button>
            <div className="cv-dropdown-menu">
              <a href={`${API_URL}/api/download/pdf`} target="_blank" rel="noopener noreferrer" className="cv-option">
                📄 Download PDF
              </a>
              <a href={`${API_URL}/api/download/docx`} target="_blank" rel="noopener noreferrer" className="cv-option">
                📝 Download DOCX
              </a>
            </div>
          </div>

          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  );
}
