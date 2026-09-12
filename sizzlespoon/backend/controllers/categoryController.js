const db = require('../config/db');

// ── GET /api/categories ────────────────────────────────────────────────────────
const getAllCategories = async (req, res, next) => {
  try {
    const [categories] = await db.query(
      'SELECT CategoryID, CategoryName FROM Categories ORDER BY CategoryName ASC'
    );
    res.json({ success: true, data: categories });
  } catch (err) {
    next(err);
  }
};

// ── POST /api/categories ───────────────────────────────────────────────────────
// Admin only — protected via adminOnly middleware on the route
const createCategory = async (req, res, next) => {
  try {
    const { CategoryName } = req.body;
    if (!CategoryName) {
      return res.status(400).json({ success: false, message: 'CategoryName is required.' });
    }

    const [result] = await db.query(
      'INSERT INTO Categories (CategoryName) VALUES (?)',
      [CategoryName.trim()]
    );

    res.status(201).json({
      success: true,
      message: 'Category created.',
      data: { CategoryID: result.insertId, CategoryName: CategoryName.trim() },
    });
  } catch (err) {
    // MySQL duplicate entry error code
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, message: 'Category already exists.' });
    }
    next(err);
  }
};

module.exports = { getAllCategories, createCategory };
