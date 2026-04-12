import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './ResumeStack3D.css';

/* Background resumes that "rain" in — each has a unique entry angle */
const fallingCards = [
  { id: 1, name: 'C. Williams',  initX: -180, initRotZ: -35, delay: 0,    bg: '#0e0e1c', accent: '#e94560' },
  { id: 2, name: 'B. Patel',    initX:  160, initRotZ:  28, delay: 0.18,  bg: '#101624', accent: '#0891b2' },
  { id: 3, name: 'D. Tanaka',   initX: -100, initRotZ: -18, delay: 0.36,  bg: '#11111f', accent: '#7c3aed' },
  { id: 4, name: 'E. Reyes',    initX:  120, initRotZ:  22, delay: 0.54,  bg: '#0c131e', accent: '#059669' },
];

export default function ResumeStack3D({ onOpen }) {
  const sceneRef    = useRef(null);
  const topCardRef  = useRef(null);
  const bgRefs      = useRef([]);
  const particleRef = useRef([]);
  const [landed,    setLanded]    = useState(false);
  const [isReady,   setIsReady]   = useState(false);
  const [impacting, setImpacting] = useState(false);

  /* ─── ENTRY ANIMATION ─── */
  useEffect(() => {
    const scene  = sceneRef.current;
    const top    = topCardRef.current;
    const bgs    = bgRefs.current;
    if (!scene || !top || !bgs.length) return;

    // Hide everything initially
    gsap.set([top, ...bgs], { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.4, onComplete: () => { setLanded(true); setIsReady(true); } });

    /* 1 — Background cards fall in, one by one */
    bgs.forEach((card, i) => {
      const cfg = fallingCards[i];
      gsap.set(card, {
        y: -520,
        x: cfg.initX,
        rotation: cfg.initRotZ,
        opacity: 0,
        scale: 0.85,
      });

      tl.to(card, {
        y: (bgs.length - 1 - i) * -7,          // final stacked offset height
        x: 0,
        rotation: (i % 2 === 0 ? -2 : 1.5) * (i + 1) * 0.4,   // slight tilt at rest
        opacity: 1,
        scale: 1 - (bgs.length - 1 - i) * 0.025,
        duration: 0.55,
        ease: 'bounce.out',
      }, cfg.delay);
    });

    /* 2 — User's top card falls last, impact effect */
    gsap.set(top, { y: -600, x: 0, rotation: 8, opacity: 0, scale: 0.9 });
    tl.to(top, {
      y: 0, x: 0, rotation: 0, opacity: 1, scale: 1,
      duration: 0.7,
      ease: 'bounce.out',
      onStart: () => setImpacting(true),
      onComplete: () => {
        setImpacting(false);
        // Subtle settle bounce
        gsap.to(top, { y: -4, duration: 0.18, yoyo: true, repeat: 1, ease: 'power1.inOut' });
      },
    }, '+=0.1');

  }, []);

  /* ─── MOUSE TILT on top card ─── */
  const handleMouseMove = (e) => {
    if (!isReady || !topCardRef.current) return;
    const rect = sceneRef.current.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) / (rect.width  / 2);
    const dy   = (e.clientY - cy) / (rect.height / 2);
    gsap.to(topCardRef.current, {
      rotateY: dx * 12,
      rotateX: -dy * 12,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!topCardRef.current) return;
    gsap.to(topCardRef.current, {
      rotateY: 0, rotateX: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.6)',
    });
  };

  /* ─── CLICK → fly up + open ─── */
  const handleClick = () => {
    if (!isReady) return;
    setIsReady(false);
    const top = topCardRef.current;
    const bgs = bgRefs.current;

    // Fan background cards out
    bgs.forEach((card, i) => {
      gsap.to(card, {
        x: (i % 2 === 0 ? -1 : 1) * (80 + i * 30),
        y: 60 + i * 20,
        rotation: (i % 2 === 0 ? -30 : 30) + i * 8,
        opacity: 0,
        duration: 0.45,
        delay: i * 0.06,
        ease: 'power2.in',
      });
    });

    // Top card flies up
    gsap.to(top, {
      y: -window.innerHeight * 0.7,
      rotation: -5,
      scale: 1.08,
      opacity: 0,
      duration: 0.6,
      delay: 0.15,
      ease: 'power3.in',
      onComplete: onOpen,
    });
  };

  return (
    <div className="rs-root" ref={sceneRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {/* Falling particles / shreds (CSS animated) */}
      <div className={`rs-particles ${impacting ? 'rs-particles--burst' : ''}`}>
        {[...Array(12)].map((_, i) => (
          <span key={i} className="rs-particle" style={{ '--i': i }} />
        ))}
      </div>

      {/* Ground shadow / impact ring */}
      <div className={`rs-impact-ring ${landed ? 'rs-impact-ring--visible' : ''}`} />

      {/* Background cards stack */}
      <div className="rs-stack">
        {fallingCards.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => (bgRefs.current[i] = el)}
            className="rs-bg-card"
            style={{ '--accent': card.accent, '--bg': card.bg, zIndex: i + 1 }}
          >
            <div className="rs-bg-lines">
              {[...Array(7)].map((_, j) => (
                <div key={j} className="rs-bg-line" style={{ width: `${55 + (j * 7)}%` }} />
              ))}
            </div>
            <div className="rs-bg-name">{card.name}</div>
            <div className="rs-bg-corner-tag" style={{ color: card.accent }}>cv</div>
          </div>
        ))}

        {/* ─── TOP / USER CARD ─── */}
        <div
          ref={topCardRef}
          className={`rs-top-card ${isReady ? 'rs-top-card--ready' : ''}`}
          style={{ zIndex: 10 }}
          onClick={handleClick}
        >
          <TopCard />
        </div>
      </div>

      {/* Hint */}
      {isReady && (
        <div className="rs-hint">
          <span className="rs-hint-dot" />
          <span>Click to open full résumé</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </div>
  );
}

/* ─── TOP CARD CONTENT ─── */
function TopCard() {
  return (
    <div className="tc-inner">
      {/* Glow blob */}
      <div className="tc-glow" />

      {/* Header */}
      <div className="tc-header">
        <div className="tc-avatar">
          <span>AG</span>
          <div className="tc-avatar-ring" />
        </div>
        <div className="tc-head-text">
          <div className="tc-badge">RÉSUMÉ</div>
          <h3>Aryan Gupta</h3>
          <p>Full Stack Developer</p>
        </div>
        <div className="tc-open-pill">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
          </svg>
          Open
        </div>
      </div>

      <div className="tc-sep" />

      {/* Skills */}
      <div className="tc-section">
        <div className="tc-section-label">Skills</div>
        <div className="tc-tags">
          {['React', 'Node.js', 'Python', 'Figma', 'MongoDB', 'Express.js'].map(s => (
            <span key={s} className="tc-tag">{s}</span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="tc-section">
        <div className="tc-section-label">Experience</div>
        <div className="tc-exp-item">
          <div className="tc-exp-dot" />
          <div>
            <div className="tc-exp-role">Full Stack Developer</div>
            <div className="tc-exp-co">Freelance · 2024–Present</div>
          </div>
        </div>
        <div className="tc-exp-item">
          <div className="tc-exp-dot" style={{ background: '#8b5cf6' }} />
          <div>
            <div className="tc-exp-role">Frontend Developer</div>
            <div className="tc-exp-co">Academic Projects · 2023–2024</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="tc-footer">
        <span>📧 aryan.gupta9352@gmail.com</span>
        <span>📍 Jaipur, Rajasthan</span>
      </div>
    </div>
  );
}
