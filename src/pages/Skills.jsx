import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '../data/portfolio';
import './Skills.css';

const categories = ['All', ...new Set(skills.map(s => s.category))];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <div className="skills-page">
      {/* Header */}
      <motion.div className="skills-hero" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="skills-hero-label">
          <span className="skills-label-bar" />
          Skills
        </div>
        <h1 className="skills-hero-title">
          Tools of<br />
          <span className="skills-hero-accent">the Trade</span>
        </h1>
        <p className="skills-hero-sub">A curated set of technologies I use to bring ideas to life</p>
      </motion.div>

      {/* Category pills */}
      <div className="skills-cats">
        {categories.map(cat => (
          <button
            key={cat}
            className={`skills-cat-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skill cards */}
      <motion.div className="skills-grid" layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              className="skill-item"
              style={{ '--sc': skill.color }}
              whileHover={{ y: -5, scale: 1.03 }}
            >
              {/* top bar */}
              <div className="skill-item-top">
                <span className="skill-item-name">{skill.name}</span>
                <span className="skill-item-cat">{skill.category}</span>
              </div>
              {/* percentage */}
              <div className="skill-item-pct" style={{ color: skill.color }}>{skill.level}%</div>
              {/* bar */}
              <div className="skill-item-track">
                <motion.div
                  className="skill-item-fill"
                  style={{ background: `linear-gradient(90deg, ${skill.color}66, ${skill.color})` }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: 'easeOut', delay: i * 0.04 }}
                />
              </div>
              {/* glow */}
              <div
                className="skill-item-glow"
                style={{ background: `radial-gradient(ellipse at 50% 100%, ${skill.color}22 0%, transparent 70%)` }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Core stack marquee */}
      <motion.div className="skills-marquee-wrap" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <div className="skills-marquee-label">
          <span className="skills-label-bar" />
          Core Stack
        </div>
        <div className="skills-marquee-track">
          <div className="skills-marquee-inner">
            {['React', 'Node.js', 'TypeScript', 'Python', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL',
              'React', 'Node.js', 'TypeScript', 'Python', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL'].map((tech, i) => (
                <div key={i} className="skills-marquee-badge">{tech}</div>
              ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
