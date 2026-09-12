const express = require('express');
const router = express.Router();
const { submitRating, getRatingForRecipe } = require('../controllers/ratingController');
const { protect } = require('../middleware/authMiddleware');

// GET  /api/ratings/:recipeId   — public (optionally attaches user's own score if JWT present)
router.get('/:recipeId', getRatingForRecipe);

// POST /api/ratings/:recipeId   — protected (upserts rating)
router.post('/:recipeId', protect, submitRating);

module.exports = router;
