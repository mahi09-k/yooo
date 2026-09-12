const express = require('express');
const router = express.Router();
const { getReviews, addReview, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

// GET    /api/reviews/:recipeId     — public
router.get('/:recipeId', getReviews);

// POST   /api/reviews/:recipeId     — protected
router.post('/:recipeId', protect, addReview);

// DELETE /api/reviews/:reviewId     — protected (author or admin)
router.delete('/:reviewId', protect, deleteReview);

module.exports = router;
