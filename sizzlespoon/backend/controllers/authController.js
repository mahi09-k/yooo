const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// ── Helper: generate signed JWT ────────────────────────────────────────────────
const signToken = (user) =>
  jwt.sign(
    { UserID: user.UserID, Username: user.Username, Role: user.Role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

// ── POST /api/auth/register ────────────────────────────────────────────────────
const register = async (req, res, next) => {
  try {
    const { Username, Email, Password } = req.body;

    if (!Username || !Email || !Password) {
      return res.status(400).json({ success: false, message: 'Username, Email, and Password are required.' });
    }

    // Check for duplicate email or username
    const [existing] = await db.query(
      'SELECT UserID FROM Users WHERE Email = ? OR Username = ?',
      [Email, Username]
    );
    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: 'Email or Username already in use.' });
    }

    const PasswordHash = await bcrypt.hash(Password, 12);

    const [result] = await db.query(
      'INSERT INTO Users (Username, Email, PasswordHash) VALUES (?, ?, ?)',
      [Username, Email, PasswordHash]
    );

    const newUser = { UserID: result.insertId, Username, Role: 'user' };
    const token = signToken(newUser);

    res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      token,
      user: newUser,
    });
  } catch (err) {
    next(err);
  }
};

// ── POST /api/auth/login ───────────────────────────────────────────────────────
const login = async (req, res, next) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({ success: false, message: 'Email and Password are required.' });
    }

    const [rows] = await db.query('SELECT * FROM Users WHERE Email = ?', [Email]);
    const user = rows[0];

    if (!user || !(await bcrypt.compare(Password, user.PasswordHash))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = signToken(user);

    res.json({
      success: true,
      message: 'Login successful.',
      token,
      user: { UserID: user.UserID, Username: user.Username, Email: user.Email, Role: user.Role },
    });
  } catch (err) {
    next(err);
  }
};

// ── GET /api/auth/me ───────────────────────────────────────────────────────────
// Returns the currently authenticated user's profile
const getMe = async (req, res, next) => {
  try {
    const [rows] = await db.query(
      'SELECT UserID, Username, Email, Role, CreatedAt FROM Users WHERE UserID = ?',
      [req.user.UserID]
    );
    if (!rows[0]) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    res.json({ success: true, user: rows[0] });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, getMe };
