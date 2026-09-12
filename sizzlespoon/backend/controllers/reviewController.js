const db = require('../config/db');

// ── GET /api/reviews/:recipeId ─────────────────────────────────────────────────
const getReviews = async (req, res, next) => {
  try {
    const { recipeId } = req.params;

    const [reviews] = await db.query(
      `SELECT
        rv.ReviewID, rv.Comment, rv.CreatedAt,
        u.UserID, u.Username
       FROM Reviews rv
       JOIN Users u ON rv.UserID = u.UserID
       WHERE rv.RecipeID = ?
       ORDER BY rv.CreatedAt DESC`,
      [recipeId]
    );

    res.json({ success: true, data: reviews });
  } catch (err) {
    next(err);
  }
};

// ── POST /api/reviews/:recipeId ────────────────────────────────────────────────
const addReview = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const { Comment } = req.body;

    if (!Comment || !Comment.trim()) {
      return res.status(400).json({ success: false, message: 'Comment cannot be empty.' });
    }

    // Verify recipe exists
    const [recipe] = await db.query('SELECT RecipeID FROM Recipes WHERE RecipeID = ?', [recipeId]);
    if (!recipe[0]) return res.status(404).json({ success: false, message: 'Recipe not found.' });

    const [result] = await db.query(
      'INSERT INTO Reviews (UserID, RecipeID, Comment) VALUES (?, ?, ?)',
      [req.user.UserID, recipeId, Comment.trim()]
    );

    res.status(201).json({
      success: true,
      message: 'Review added.',
      data: {
        ReviewID: result.insertId,
        Comment: Comment.trim(),
        Username: req.user.Username,
        CreatedAt: new Date(),
      },
    });
  } catch (err) {
    next(err);
  }
};

// ── DELETE /api/reviews/:reviewId ──────────────────────────────────────────────
// Only the review author or an admin can delete
const deleteReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;

    const [rows] = await db.query('SELECT UserID FROM Reviews WHERE ReviewID = ?', [reviewId]);
    if (!rows[0]) return res.status(404).json({ success: false, message: 'Review not found.' });

    if (rows[0].UserID !== req.user.UserID && req.user.Role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this review.' });
    }

    await db.query('DELETE FROM Reviews WHERE ReviewID = ?', [reviewId]);
    res.json({ success: true, message: 'Review deleted.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getReviews, addReview, deleteReview };
