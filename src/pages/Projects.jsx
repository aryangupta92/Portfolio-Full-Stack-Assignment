import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/portfolio';
import './Projects.css';

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="projects-page">
      {/* Header */}
      <motion.div className="projects-hero" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="projects-hero-label">
          <span className="proj-label-bar" />
          Projects
        </div>
        <h1 className="projects-hero-title">
          Things I've<br />
          <span className="projects-hero-accent">Built</span>
        </h1>
        <p className="projects-hero-sub">A selection of projects that showcase my range and passion for crafting great experiences.</p>
      </motion.div>

      {/* Projects grid */}
      <div className="projects-grid">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            className={`proj-card ${hoveredId && hoveredId !== project.id ? 'proj-card--dimmed' : ''}`}
            style={{ '--pc': project.color }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.55 }}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => setSelected(project)}
          >
            {/* Accent stripe */}
            <div className="proj-card-stripe" />

            {/* Number */}
            <div className="proj-card-number">
              {String(i + 1).padStart(2, '0')}
            </div>

            {/* Emoji */}
            <div className="proj-card-emoji">{project.image}</div>

            {/* Meta */}
            <div className="proj-card-meta">
              <span className="proj-card-year">{project.year}</span>
              <span className="proj-card-cat">{project.category}</span>
            </div>

            <h3 className="proj-card-title">{project.title}</h3>
            <p className="proj-card-desc">{project.description}</p>

            {/* Tech tags */}
            <div className="proj-card-tags">
              {project.tech.slice(0, 4).map(t => (
                <span key={t} className="proj-card-tag">{t}</span>
              ))}
            </div>

            {/* Links */}
            <div className="proj-card-links">
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                 className="proj-card-link" onClick={e => e.stopPropagation()}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Code
              </a>
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                 className="proj-card-link" onClick={e => e.stopPropagation()}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Live
              </a>
              <button className="proj-card-expand" onClick={() => setSelected(project)}>
                View Details →
              </button>
            </div>

            {/* Hover glow */}
            <div className="proj-card-glow" />
          </motion.div>
        ))}
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="proj-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="proj-modal"
              style={{ '--pc': selected.color }}
              initial={{ scale: 0.8, y: 60, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 40, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="proj-modal-close" onClick={() => setSelected(null)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>

              <div className="proj-modal-banner" style={{ background: `linear-gradient(135deg, ${selected.color}18, transparent)` }}>
                <div className="proj-modal-emoji">{selected.image}</div>
                <div>
                  <div className="proj-modal-cat">{selected.category} · {selected.year}</div>
                  <h2 className="proj-modal-title">{selected.title}</h2>
                </div>
              </div>

              <div className="proj-modal-body">
                <p className="proj-modal-desc">{selected.longDescription}</p>
                <div className="proj-modal-tech-label">Tech Stack</div>
                <div className="proj-modal-tech">
                  {selected.tech.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <div className="proj-modal-actions">
                  <a href={selected.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View Code
                  </a>
                  <a href={selected.live} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                    Visit Live Site
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
