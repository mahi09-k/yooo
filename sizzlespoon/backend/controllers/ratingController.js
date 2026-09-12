const db = require('../config/db');

// ── POST /api/ratings/:recipeId ────────────────────────────────────────────────
// Upsert: if the user already rated this recipe, update the score.
const submitRating = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const { Score } = req.body;

    if (!Score || Score < 1 || Score > 5) {
      return res.status(400).json({ success: false, message: 'Score must be a number between 1 and 5.' });
    }

    // Verify recipe exists
    const [recipe] = await db.query('SELECT RecipeID FROM Recipes WHERE RecipeID = ?', [recipeId]);
    if (!recipe[0]) return res.status(404).json({ success: false, message: 'Recipe not found.' });

    // INSERT ... ON DUPLICATE KEY UPDATE handles the upsert (UNIQUE KEY on UserID+RecipeID)
    await db.query(
      `INSERT INTO Ratings (UserID, RecipeID, Score)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE Score = VALUES(Score)`,
      [req.user.UserID, recipeId, Score]
    );

    // Return the new average after upsert
    const [[{ AvgRating, RatingCount }]] = await db.query(
      'SELECT ROUND(AVG(Score), 1) AS AvgRating, COUNT(*) AS RatingCount FROM Ratings WHERE RecipeID = ?',
      [recipeId]
    );

    res.json({
      success: true,
      message: 'Rating submitted.',
      data: { Score, AvgRating, RatingCount },
    });
  } catch (err) {
    next(err);
  }
};

// ── GET /api/ratings/:recipeId ─────────────────────────────────────────────────
// Returns the average rating and the current user's rating (if authenticated)
const getRatingForRecipe = async (req, res, next) => {
  try {
    const { recipeId } = req.params;

    const [[{ AvgRating, RatingCount }]] = await db.query(
      'SELECT ROUND(AVG(Score), 1) AS AvgRating, COUNT(*) AS RatingCount FROM Ratings WHERE RecipeID = ?',
      [recipeId]
    );

    let userScore = null;
    if (req.user) {
      const [rows] = await db.query(
        'SELECT Score FROM Ratings WHERE UserID = ? AND RecipeID = ?',
        [req.user.UserID, recipeId]
      );
      userScore = rows[0]?.Score ?? null;
    }

    res.json({ success: true, data: { AvgRating, RatingCount, userScore } });
  } catch (err) {
    next(err);
  }
};

module.exports = { submitRating, getRatingForRecipe };
