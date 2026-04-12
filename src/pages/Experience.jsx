import { motion } from 'framer-motion';
import { experience } from '../data/portfolio';
import './Experience.css';

export default function Experience() {
  return (
    <div className="exp-page">
      {/* Header */}
      <motion.div className="exp-hero" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="exp-hero-label">
          <span className="exp-label-bar" />
          Experience
        </div>
        <h1 className="exp-hero-title">
          My<br />
          <span className="exp-hero-accent">Journey</span>
        </h1>
        <p className="exp-hero-sub">From student to senior developer — a timeline of growth and learning.</p>
      </motion.div>

      {/* Timeline */}
      <div className="exp-timeline">
        {experience.map((item, i) => (
          <motion.div
            key={i}
            className={`exp-item exp-item--${item.type}`}
            initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
          >
            {/* Side */}
            <div className="exp-item-side">
              {/* connector */}
              <div className="exp-connector">
                <div className={`exp-node exp-node--${item.type}`}>
                  {item.type === 'work' ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                    </svg>
                  )}
                </div>
                {i < experience.length - 1 && <div className="exp-line" />}
              </div>
            </div>

            {/* Card */}
            <div className="exp-card">
              <div className="exp-card-top">
                <div className="exp-type-badge">{item.type === 'work' ? 'Work' : 'Education'}</div>
                <div className="exp-duration">{item.duration}</div>
              </div>
              <h3 className="exp-role">{item.title}</h3>
              <div className="exp-company">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                </svg>
                {item.company}
              </div>
              <p className="exp-desc">{item.description}</p>
              <div className="exp-tags">
                {item.tech.map(t => <span key={t} className="exp-tag">{t}</span>)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        className="exp-cta"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="exp-cta-glow" />
        <div className="exp-cta-icon">🚀</div>
        <div className="exp-cta-text">
          <h3>Ready for the next chapter</h3>
          <p>Currently open to exciting opportunities and collaborations</p>
        </div>
        <a href="mailto:aryan.gupta9352@gmail.com" className="btn-primary">Let's Talk</a>
      </motion.div>
    </div>
  );
}
