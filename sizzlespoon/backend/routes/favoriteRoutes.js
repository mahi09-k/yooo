const express = require('express');
const router = express.Router();
const { getFavorites, addFavorite, removeFavorite } = require('../controllers/favoriteController');
const { protect } = require('../middleware/authMiddleware');

// All favorites routes require authentication
router.use(protect);

// GET    /api/favorites              — get logged-in user's favorites
router.get('/', getFavorites);

// POST   /api/favorites/:recipeId    — add a recipe to favorites
router.post('/:recipeId', addFavorite);

// DELETE /api/favorites/:recipeId    — remove a recipe from favorites
router.delete('/:recipeId', removeFavorite);

module.exports = router;
