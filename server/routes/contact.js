import express  from 'express';
import Message  from '../models/Message.js';

const router = express.Router();

// ══════════════════════════════════════════════════════
// POST /api/contact  — save a contact form submission
// ══════════════════════════════════════════════════════
router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // ── Basic validation ────────────────────────────
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields (name, email, subject, message) are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    // ── Save to MongoDB ─────────────────────────────
    const saved = await Message.create({ name, email, subject, message });

    return res.status(201).json({
      success: true,
      message: 'Message received! I\'ll get back to you within 24 hours.',
      id:      saved._id,
    });

  } catch (err) {
    // Mongoose validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
    console.error('[POST /api/contact]', err);
    return res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// ══════════════════════════════════════════════════════
// GET /api/messages  — retrieve all messages (admin)
// ══════════════════════════════════════════════════════
router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find({})
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count:   messages.length,
      data:    messages,
    });
  } catch (err) {
    console.error('[GET /api/messages]', err);
    return res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

export default router;
