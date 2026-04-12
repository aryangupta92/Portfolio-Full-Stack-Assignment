import express      from 'express';
import mongoose     from 'mongoose';
import cors         from 'cors';
import dotenv       from 'dotenv';
import contactRoutes from './routes/contact.js';

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ─────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || '*',   // set CLIENT_URL= your Vercel URL in production
  credentials: true,
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// ── Routes ─────────────────────────────────────────────────────────────────
app.use('/api', contactRoutes);

// Health-check (Render pings this to keep the server awake)
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Portfolio Backend API is running',
    status:  'ok',
    author:  'Aryan Gupta',
  });
});

// 404 catch-all
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
});

// Global error handler
app.use((err, req, res, _next) => {
  console.error('[Server Error]', err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

// ── Connect to MongoDB, then start server ──────────────────────────────────
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅  Connected to MongoDB Atlas');

    app.listen(PORT, () => {
      console.log(`🚀  Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌  MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

startServer();
