import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolio';
import './About.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.65, ease: 'easeOut' } }),
};

export default function About() {
  const facts = [
    { icon: '🎓', label: 'Education',  value: 'JK Lakshmipat University, Jaipur (B.Tech CS)' },
    { icon: '📍', label: 'Location',   value: 'Jaipur, Rajasthan' },
    { icon: '🌐', label: 'Languages',  value: 'Hindi, English, French (Beginner)' },
    { icon: '☕', label: 'Fuel',       value: 'Coffee & Sugar' },
    { icon: '📰', label: 'Hobbies',    value: 'News Reading & Analysis, Trading' },
    { icon: '🚀', label: 'Goal',       value: 'Build Products That Matter' },
  ];

  const values = [
    { title: 'Clean Code',          desc: 'Code is communication — readable, maintainable, and elegant.',                              icon: '✨', color: '#6366f1' },
    { title: 'User-First',          desc: 'Every decision starts with the end user. Performance is non-negotiable.',                   icon: '👤', color: '#06b6d4' },
    { title: 'Continuous Learning', desc: 'Technology evolves fast. I dedicate daily time to learning and experimenting.',             icon: '📚', color: '#10b981' },
    { title: 'Collaboration',       desc: 'The best products emerge from diverse teams with open communication.',                      icon: '🤝', color: '#f59e0b' },
  ];

  return (
    <div className="about-page">
      {/* ── Page header ── */}
      <motion.div className="about-hero" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="about-hero-label">
          <span className="about-label-line" />
          About Me
        </div>
        <h1 className="about-hero-title">
          The Human<br />
          <span className="about-hero-accent">Behind The Code</span>
        </h1>
        <p className="about-hero-sub">Developer & AI/ML enthusiast from Jaipur, perpetual student by choice.</p>
      </motion.div>

      {/* ── Identity card + facts ── */}
      <div className="about-ident-row">
        <motion.div className="about-id-card" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
          <div className="about-id-glow" />
          <div className="about-avatar-wrap">
            <div className="about-avatar">
              <span>AG</span>
              <div className="about-avatar-ring" />
            </div>
          </div>
          <div className="about-id-name">{personalInfo.name}</div>
          <div className="about-id-role">{personalInfo.title}</div>
          <div className="about-avail">
            <span className="about-avail-dot" />
            Available for opportunities
          </div>
          <div className="about-dl-group">
            <a
              href={`${API_URL}/api/download/pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary about-dl-btn"
            >
              📄 Download PDF
            </a>
            <a
              href={`${API_URL}/api/download/docx`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline about-dl-btn"
            >
              📝 Download DOCX
            </a>
          </div>
        </motion.div>

        <motion.div className="about-facts-grid" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}>
          {facts.map((f, i) => (
            <motion.div key={i} className="about-fact-item" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 2}>
              <div className="about-fact-icon">{f.icon}</div>
              <div>
                <div className="about-fact-label">{f.label}</div>
                <div className="about-fact-val">{f.value}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Story ── */}
      <motion.div className="about-story-section" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <div className="about-story-number">01</div>
        <div className="about-story-content">
          <h2 className="about-story-heading">My Story</h2>
          <div className="about-story-text">
            <p>I started coding during my early college days, fascinated by how a few lines of Python could reveal patterns in complex data. That curiosity quickly grew into a passion for building — from sleek user interfaces to intelligent machine learning systems.</p>
            <p>Currently pursuing my B.Tech in Computer Science at JK Lakshmipat University, Jaipur, I've built AI models for real Indian problems — predicting train delays across Rajasthan, measuring stock market volatility on the NSE, and creating a doctor-patient conversational chatbot using deep learning.</p>
            <p>Beyond AI/ML, I love crafting full-stack applications. Rent-Karo, my peer-to-peer rental platform, is a testament to that. I'm fascinated by the intersection of design, data, and engineering — building things that don't just <em>work</em>, but <em>feel</em> good.</p>
          </div>
        </div>
      </motion.div>

      {/* ── Values ── */}
      <div className="about-values-section">
        <motion.div className="about-values-header" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="about-story-number">02</div>
          <h2 className="about-story-heading">What I Believe In</h2>
        </motion.div>
        <div className="about-values-grid">
          {values.map((v, i) => (
            <motion.div
              key={i}
              className="about-value-card"
              style={{ '--vc': v.color }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              whileHover={{ y: -6 }}
            >
              <div className="about-value-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
              <div className="about-value-bar" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
