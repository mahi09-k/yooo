const express = require('express');
const router = express.Router();
const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

// GET  /api/recipes          — public (supports ?category=&search=&page=&limit=)
router.get('/', getAllRecipes);

// GET  /api/recipes/:id      — public
router.get('/:id', getRecipeById);

// POST /api/recipes          — protected + image upload
router.post('/', protect, upload.single('image'), createRecipe);

// PUT  /api/recipes/:id      — protected + optional image upload
router.put('/:id', protect, upload.single('image'), updateRecipe);

// DELETE /api/recipes/:id    — protected (owner or admin)
router.delete('/:id', protect, deleteRecipe);

module.exports = router;
