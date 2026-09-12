const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ─────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173', // Vite default port
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── API Routes ─────────────────────────────────────────────────────────────────
app.use('/api/auth',       require('./routes/authRoutes'));
app.use('/api/recipes',    require('./routes/recipeRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/favorites',  require('./routes/favoriteRoutes'));
app.use('/api/ratings',    require('./routes/ratingRoutes'));
app.use('/api/reviews',    require('./routes/reviewRoutes'));

// ── Health Check ───────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: '🍳 Welcome to the SizzleSpoon API!',
    status: 'running',
    version: '1.0.0',
  });
});

// ── 404 Handler ────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

// ── Global Error Handler ───────────────────────────────────────────────────────
// Catches any error passed via next(err) from controllers
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error.',
  });
});

// ── Start Server ───────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 SizzleSpoon server is running on http://localhost:${PORT}`);
});
