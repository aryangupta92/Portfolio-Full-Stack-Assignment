import { useState } from 'react';
import { motion } from 'framer-motion';
import './Certifications.css';

const certifications = [
  {
    title: 'Python for Data Science',
    issuer: 'NPTEL / IIT',
    year: '2024',
    category: 'AI/ML',
    color: '#f59e0b',
    icon: '🐍',
    description: 'Completed 12-week NPTEL course covering Python programming for data science applications.',
  },
  {
    title: 'Machine Learning Fundamentals',
    issuer: 'Coursera / Self-Paced',
    year: '2024',
    category: 'AI/ML',
    color: '#6366f1',
    icon: '🤖',
    description: 'Core machine learning algorithms including regression, classification, and clustering techniques.',
  },
  {
    title: 'React.js Development',
    issuer: 'Udemy',
    year: '2023',
    category: 'Frontend',
    color: '#06b6d4',
    icon: '⚛️',
    description: 'Comprehensive React.js, hooks, state management, and building production-ready applications.',
  },
  {
    title: 'MongoDB & Node.js',
    issuer: 'MongoDB University',
    year: '2024',
    category: 'Backend',
    color: '#10b981',
    icon: '🍃',
    description: 'Database design, aggregation pipelines, and building REST APIs with Express and Mongoose.',
  },
  {
    title: 'UI/UX Design Principles',
    issuer: 'Figma Community / LinkedIn Learning',
    year: '2023',
    category: 'Design',
    color: '#ec4899',
    icon: '🎨',
    description: 'User research, wireframing, prototyping and design systems using Figma.',
  },
  {
    title: 'Introduction to Cloud Computing',
    issuer: 'NPTEL',
    year: '2024',
    category: 'Cloud',
    color: '#8b5cf6',
    icon: '☁️',
    description: 'Cloud architecture, deployment models (IaaS/PaaS/SaaS), and introduction to AWS services.',
  },
];

const achievements = [
  { icon: '🏆', title: 'University Project Award', desc: 'Recognized for Train Delay Prediction Model at JK Lakshmipat University tech fest.', year: '2024' },
  { icon: '💡', title: '5 Projects Completed', desc: 'Built 5 full-stack and AI/ML projects spanning web, data science, and finance.', year: '2023-24' },
  { icon: '📈', title: 'Stock Market Analyser', desc: 'Created original volatility model for Indian stock market using novel statistical approach.', year: '2024' },
  { icon: '🎓', title: 'B.Tech Computer Science', desc: 'Pursuing core CS degree at JK Lakshmipat University, Jaipur with focus on MERN development.', year: '2022–Present' },
];

const categories = ['All', 'AI/ML', 'Frontend', 'Backend', 'Design', 'Cloud'];

export default function Certifications() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? certifications
    : certifications.filter(c => c.category === activeFilter);

  return (
    <div className="certs-page">
      {/* Hero */}
      <motion.div className="certs-hero" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="certs-label"><span className="certs-label-bar" />Certifications & Achievements</div>
        <h1 className="certs-title">
          Always <span className="certs-accent">Learning,</span><br />Always Growing
        </h1>
        <p className="certs-sub">A collection of courses, certifications, and milestones from my learning journey.</p>
      </motion.div>

      {/* Achievements */}
      <motion.div className="certs-achievements"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <h2 className="certs-section-heading">Achievements</h2>
        <div className="certs-achievements-grid">
          {achievements.map((a, i) => (
            <motion.div key={i} className="certs-achievement-card"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}>
              <div className="certs-ach-icon">{a.icon}</div>
              <div className="certs-ach-year">{a.year}</div>
              <h3 className="certs-ach-title">{a.title}</h3>
              <p className="certs-ach-desc">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Certifications */}
      <div className="certs-section">
        <h2 className="certs-section-heading">Certifications</h2>

        {/* Filter pills */}
        <div className="certs-filters">
          {categories.map(cat => (
            <button key={cat}
              className={`certs-pill ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}>
              {cat}
            </button>
          ))}
        </div>

        <div className="certs-grid">
          {filtered.map((cert, i) => (
            <motion.div key={cert.title} className="cert-card"
              style={{ '--cert-color': cert.color }}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}>
              <div className="cert-card-top">
                <div className="cert-icon">{cert.icon}</div>
                <span className="cert-year">{cert.year}</span>
              </div>
              <h3 className="cert-title">{cert.title}</h3>
              <div className="cert-issuer">📜 {cert.issuer}</div>
              <p className="cert-desc">{cert.description}</p>
              <div className="cert-badge">{cert.category}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
