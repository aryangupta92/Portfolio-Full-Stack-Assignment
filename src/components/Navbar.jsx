import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const navLinks = [
  { path: '/', label: 'Home', num: '01' },
  { path: '/about', label: 'About', num: '02' },
  { path: '/skills', label: 'Skills', num: '03' },
  { path: '/projects', label: 'Projects', num: '04' },
  { path: '/experience', label: 'Experience', num: '05' },
  { path: '/contact', label: 'Contact', num: '06' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
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
          <a
            href="mailto:aryan.gupta9352@gmail.com"
            className="nav-cta"
          >
            Hire Me
          </a>
        </div>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
