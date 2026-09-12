const db = require('../config/db');

// ── GET /api/favorites ─────────────────────────────────────────────────────────
// Returns all recipes favorited by the authenticated user
const getFavorites = async (req, res, next) => {
  try {
    const [favorites] = await db.query(
      `SELECT
        r.RecipeID, r.Title, r.ImageURL, r.CreatedAt,
        u.Username AS AuthorName,
        c.CategoryName,
        f.CreatedAt AS FavoritedAt
       FROM Favorites f
       JOIN Recipes    r ON f.RecipeID   = r.RecipeID
       JOIN Users      u ON r.AuthorID   = u.UserID
       LEFT JOIN Categories c ON r.CategoryID = c.CategoryID
       WHERE f.UserID = ?
       ORDER BY f.CreatedAt DESC`,
      [req.user.UserID]
    );
    res.json({ success: true, data: favorites });
  } catch (err) {
    next(err);
  }
};

// ── POST /api/favorites/:recipeId ──────────────────────────────────────────────
const addFavorite = async (req, res, next) => {
  try {
    const { recipeId } = req.params;

    // Verify recipe exists
    const [recipe] = await db.query('SELECT RecipeID FROM Recipes WHERE RecipeID = ?', [recipeId]);
    if (!recipe[0]) return res.status(404).json({ success: false, message: 'Recipe not found.' });

    await db.query(
      'INSERT INTO Favorites (UserID, RecipeID) VALUES (?, ?)',
      [req.user.UserID, recipeId]
    );

    res.status(201).json({ success: true, message: 'Recipe added to favorites.' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, message: 'Recipe is already in your favorites.' });
    }
    next(err);
  }
};

// ── DELETE /api/favorites/:recipeId ───────────────────────────────────────────
const removeFavorite = async (req, res, next) => {
  try {
    const { recipeId } = req.params;

    const [result] = await db.query(
      'DELETE FROM Favorites WHERE UserID = ? AND RecipeID = ?',
      [req.user.UserID, recipeId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Favorite not found.' });
    }

    res.json({ success: true, message: 'Recipe removed from favorites.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getFavorites, addFavorite, removeFavorite };
