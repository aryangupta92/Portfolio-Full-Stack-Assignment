import { connectDB } from '../lib/mongodb.js';
import Message from '../lib/Message.js';

export default async function handler(req, res) {
  // ── CORS ──────────────────────────────────────────────────────────────
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    // Return all messages, newest first
    const messages = await Message.find({})
      .sort({ createdAt: -1 })
      .select('-__v')
      .lean();

    return res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (err) {
    console.error('[API /messages] Error:', err);
    return res.status(500).json({ error: 'Server error. Please try again later.' });
  }
}
