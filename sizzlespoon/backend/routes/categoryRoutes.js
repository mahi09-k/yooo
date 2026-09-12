const express = require('express');
const router = express.Router();
const { getAllCategories, createCategory } = require('../controllers/categoryController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// GET  /api/categories         — public
router.get('/', getAllCategories);

// POST /api/categories         — admin only
router.post('/', protect, adminOnly, createCategory);

module.exports = router;
