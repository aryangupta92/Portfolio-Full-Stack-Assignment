import { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolio';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const channels = [
    { icon: '📧', label: 'Email',    value: personalInfo.email,              href: `mailto:${personalInfo.email}`,  color: '#6366f1' },
    { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/aryan-gupta-a161b4314', href: personalInfo.linkedin,  color: '#06b6d4' },
    { icon: '🐙', label: 'GitHub',   value: 'github.com/aryangupta92',              href: personalInfo.github,    color: '#8b5cf6' },
    { icon: '📍', label: 'Location', value: personalInfo.location,           href: null,                            color: '#10b981' },
  ];

  return (
    <div className="contact-page">
      {/* Header */}
      <motion.div className="contact-hero" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="contact-hero-label">
          <span className="contact-label-bar" />
          Contact
        </div>
        <h1 className="contact-hero-title">
          Let's Build<br />
          <span className="contact-hero-accent">Something Amazing</span>
        </h1>
        <p className="contact-hero-sub">
          Whether it's a project idea, job opportunity, or just a hello — my inbox is always open.
        </p>
      </motion.div>

      <div className="contact-grid">
        {/* ── Left: Channels ── */}
        <motion.div
          className="contact-left"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="contact-left-heading">Connect With Me</h3>
          <p className="contact-left-sub">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>

          <div className="contact-channels">
            {channels.map((ch, i) => (
              <motion.div
                key={i}
                className="contact-channel"
                style={{ '--ch': ch.color }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 6 }}
              >
                <div className="contact-channel-icon">{ch.icon}</div>
                <div className="contact-channel-info">
                  <div className="contact-channel-label">{ch.label}</div>
                  {ch.href ? (
                    <a href={ch.href} target="_blank" rel="noopener noreferrer" className="contact-channel-val link">
                      {ch.value}
                    </a>
                  ) : (
                    <div className="contact-channel-val">{ch.value}</div>
                  )}
                </div>
                <div className="contact-channel-arrow">→</div>
              </motion.div>
            ))}
          </div>

          {/* Availability badge */}
          <div className="contact-avail">
            <div className="contact-avail-ring">
              <div className="contact-avail-core" />
            </div>
            <div>
              <div className="contact-avail-status">Available for Work</div>
              <div className="contact-avail-detail">Open to full-time and freelance opportunities</div>
            </div>
          </div>
        </motion.div>

        {/* ── Right: Form ── */}
        <motion.div
          className="contact-right"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="contact-form-card">
            <div className="contact-form-header">
              <h3>Send a Message</h3>
              <p>I typically reply within 24 hours</p>
            </div>

            {status === 'sent' ? (
              <div className="contact-success">
                <div className="contact-success-icon">✅</div>
                <h4>Message Sent!</h4>
                <p>Thanks for reaching out. I'll get back to you within 24 hours.</p>
                <button className="btn-ghost" onClick={() => setStatus(null)} style={{ marginTop: '20px' }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form-row">
                  <div className={`contact-field ${focused === 'name' ? 'focused' : ''}`}>
                    <label htmlFor="name">Your Name</label>
                    <input
                      id="name" name="name" type="text" placeholder="John Doe"
                      value={form.name} onChange={handleChange}
                      onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                      required
                    />
                  </div>
                  <div className={`contact-field ${focused === 'email' ? 'focused' : ''}`}>
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email" name="email" type="email" placeholder="john@example.com"
                      value={form.email} onChange={handleChange}
                      onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                      required
                    />
                  </div>
                </div>

                <div className={`contact-field ${focused === 'subject' ? 'focused' : ''}`}>
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject" name="subject" type="text" placeholder="Project Collaboration"
                    value={form.subject} onChange={handleChange}
                    onFocus={() => setFocused('subject')} onBlur={() => setFocused(null)}
                    required
                  />
                </div>

                <div className={`contact-field ${focused === 'message' ? 'focused' : ''}`}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message" name="message" rows={5}
                    placeholder="Tell me about your project or idea..."
                    value={form.message} onChange={handleChange}
                    onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary contact-submit"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <><div className="contact-spinner" />Sending...</>
                  ) : (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
