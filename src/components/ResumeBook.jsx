import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { resumePages, personalInfo } from '../data/portfolio';
import './ResumeBook.css';

export default function ResumeBook({ onClose }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const bookRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    );
    gsap.fromTo(bookRef.current,
      { scale: 0.7, rotateX: 30, opacity: 0 },
      { scale: 1, rotateX: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.5)', delay: 0.1 }
    );
  }, []);

  const goToPage = (dir) => {
    if (isFlipping) return;
    const nextPage = currentPage + dir;
    if (nextPage < 0 || nextPage >= resumePages.length) return;

    setIsFlipping(true);

    // Quick 3D flip out
    const x = dir > 0 ? -20 : 20;
    gsap.to(bookRef.current, {
      rotateY: x * 4,
      x: x * 2,
      opacity: 0.5,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setCurrentPage(nextPage);
        // Flip in from opposite side
        gsap.fromTo(bookRef.current,
          { rotateY: -x * 4, x: -x * 2, opacity: 0.5 },
          { rotateY: 0, x: 0, opacity: 1, duration: 0.3, ease: 'power2.out',
            onComplete: () => setIsFlipping(false) }
        );
      }
    });
  };

  const handleClose = () => {
    gsap.to(bookRef.current, { scale: 0.7, opacity: 0, duration: 0.3, ease: 'power2.in' });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, delay: 0.15, onComplete: onClose });
  };

  const page = resumePages[currentPage];

  return (
    <div className="resume-overlay" ref={overlayRef} onClick={(e) => e.target === overlayRef.current && handleClose()}>
      <div className="resume-book" ref={bookRef}>
        {/* Book top bar */}
        <div className="book-topbar">
          <div className="book-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            Aryan Gupta — Résumé
          </div>
          <div className="book-pages-indicator">
            {resumePages.map((_, i) => (
              <button
                key={i}
                className={`page-dot ${i === currentPage ? 'active' : ''}`}
                onClick={() => !isFlipping && setCurrentPage(i)}
              />
            ))}
          </div>
          <button className="book-close" onClick={handleClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Page content */}
        <div className="book-page">
          {page.type === 'cover' && <CoverPage data={page.content} />}
          {page.type === 'summary' && <SummaryPage data={page.content} />}
          {page.type === 'experience' && <ExperiencePage data={page.content} />}
          {page.type === 'skills' && <SkillsPage data={page.content} />}
          {page.type === 'projects' && <ProjectsPage data={page.content} />}
        </div>

        {/* Navigation */}
        <div className="book-nav">
          <button
            className={`book-nav-btn ${currentPage === 0 ? 'disabled' : ''}`}
            onClick={() => goToPage(-1)}
            disabled={currentPage === 0}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Previous
          </button>
          <span className="book-page-num">Page {currentPage + 1} of {resumePages.length}</span>
          <button
            className={`book-nav-btn ${currentPage === resumePages.length - 1 ? 'disabled' : ''}`}
            onClick={() => goToPage(1)}
            disabled={currentPage === resumePages.length - 1}
          >
            Next
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===== PAGE COMPONENTS ===== */

function CoverPage({ data }) {
  return (
    <div className="page-cover">
      <div className="cover-bg-pattern" />
      <div className="cover-content">
        <div className="cover-avatar">
          <span>{data.name.split(' ').map(n => n[0]).join('')}</span>
        </div>
        <h1 className="cover-name">{data.name}</h1>
        <div className="cover-title">{data.title}</div>
        <div className="cover-subtitle">{data.subtitle}</div>
        <div className="cover-divider" />
        <div className="cover-contacts">
          {data.contact.map((c, i) => (
            <div key={i} className="cover-contact-item">{c}</div>
          ))}
        </div>
        <div className="cover-links">
          {data.links.map((l, i) => (
            <div key={i} className="cover-link">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
              {l}
            </div>
          ))}
        </div>
      </div>
      <div className="cover-page-num">01</div>
    </div>
  );
}

function SummaryPage({ data }) {
  return (
    <div className="page-content">
      <div className="page-header">
        <h2>{data.heading}</h2>
        <div className="page-header-line" />
      </div>
      <p className="summary-text">{data.text}</p>
      <div className="highlights-grid">
        {data.highlights.map((h, i) => (
          <div key={i} className="highlight-item">
            <div className="highlight-check">✓</div>
            <span>{h}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperiencePage({ data }) {
  return (
    <div className="page-content">
      <div className="page-header">
        <h2>{data.heading}</h2>
        <div className="page-header-line" />
      </div>
      <div className="exp-list">
        {data.items.map((item, i) => (
          <div key={i} className="exp-item">
            <div className="exp-timeline">
              <div className="exp-dot" />
              {i < data.items.length - 1 && <div className="exp-line" />}
            </div>
            <div className="exp-details">
              <div className="exp-header">
                <div className="exp-role">{item.title}</div>
                <div className="exp-duration">{item.duration}</div>
              </div>
              <div className="exp-company">{item.company}</div>
              <p className="exp-desc">{item.description}</p>
              <div className="exp-tags">
                {item.tech.map(t => <span key={t} className="exp-tag">{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsPage({ data }) {
  return (
    <div className="page-content">
      <div className="page-header">
        <h2>{data.heading}</h2>
        <div className="page-header-line" />
      </div>
      <div className="skills-categories">
        {Object.entries(data.categories).map(([cat, skills]) => (
          <div key={cat} className="skill-category">
            <div className="skill-cat-name">{cat}</div>
            <div className="skill-bars">
              {skills.map(skill => (
                <div key={skill.name} className="skill-bar-item">
                  <div className="skill-bar-label">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div
                      className="skill-bar-fill"
                      style={{ width: `${skill.level}%`, background: skill.color || 'var(--accent-primary)' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsPage({ data }) {
  return (
    <div className="page-content">
      <div className="page-header">
        <h2>{data.heading}</h2>
        <div className="page-header-line" />
      </div>
      <div className="proj-list">
        {data.items.map((proj, i) => (
          <div key={i} className="proj-item" style={{ '--proj-color': proj.color }}>
            <div className="proj-emoji">{proj.image}</div>
            <div className="proj-details">
              <div className="proj-name">{proj.title}</div>
              <p className="proj-desc">{proj.description}</p>
              <div className="proj-tech">
                {proj.tech.slice(0,4).map(t => <span key={t} className="proj-tag">{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
