import { connectDB } from '../lib/mongodb.js';
import Message from '../lib/Message.js';

export default async function handler(req, res) {
  // ── CORS ──────────────────────────────────────────────────────────────
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // ── Only accept POST ────────────────────────────────────────────────
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { name, email, subject, message } = req.body;

    // ── Validate ────────────────────────────────────────────────────────
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    // ── Save to MongoDB ────────────────────────────────────────────────
    const saved = await Message.create({ name, email, subject, message });

    return res.status(201).json({
      success: true,
      message: 'Message saved successfully!',
      id: saved._id,
    });
  } catch (err) {
    console.error('[API /contact] Error:', err);
    return res.status(500).json({ error: 'Server error. Please try again later.' });
  }
}
