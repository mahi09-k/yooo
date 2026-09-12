const db = require('../config/db');
const { uploadToCloudinary } = require('../middleware/uploadMiddleware');

// ── GET /api/recipes ───────────────────────────────────────────────────────────
// Supports optional query params: ?category=<id>&search=<term>&limit=<n>&page=<n>
const getAllRecipes = async (req, res, next) => {
  try {
    const { category, search, limit = 12, page = 1 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const params = [];

    let query = `
      SELECT
        r.RecipeID, r.Title, r.ImageURL, r.CreatedAt,
        u.Username AS AuthorName,
        c.CategoryName,
        ROUND(AVG(rt.Score), 1) AS AvgRating,
        COUNT(DISTINCT rt.RatingID)  AS RatingCount
      FROM Recipes r
      JOIN  Users      u  ON r.AuthorID   = u.UserID
      LEFT JOIN Categories c  ON r.CategoryID = c.CategoryID
      LEFT JOIN Ratings    rt ON r.RecipeID   = rt.RecipeID
    `;

    const conditions = [];
    if (category) { conditions.push('r.CategoryID = ?'); params.push(category); }
    if (search)   {
      // Clean and extract meaningful keywords (ignore filler words like 'and', '&', 'the')
      const rawKeywords = search.replace(/[&,]/g, ' ').trim().split(/\s+/).filter(k => k.length > 1 && !['and', 'the', 'for', 'with'].includes(k.toLowerCase()));
      const keywords = rawKeywords.length > 0 ? rawKeywords : [search.trim()];
      
      // Expand 'seafood' keyword to include fish, prawn, shrimp, ilish, salmon
      const expandedTerms = [];
      keywords.forEach(k => {
        expandedTerms.push(k);
        if (/seafood/i.test(k)) expandedTerms.push('prawn', 'salmon', 'ilish', 'fish', 'chingri');
      });

      const orClauses = expandedTerms.map(() => '(r.Title LIKE ? OR r.Ingredients LIKE ? OR c.CategoryName LIKE ?)').join(' OR ');
      conditions.push(`(${orClauses})`);
      expandedTerms.forEach(t => params.push(`%${t}%`, `%${t}%`, `%${t}%`));
    }
    if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');

    query += ' GROUP BY r.RecipeID ORDER BY r.CreatedAt DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);

    const [recipes] = await db.query(query, params);

    // Total count for pagination
    let countQuery = 'SELECT COUNT(DISTINCT r.RecipeID) AS total FROM Recipes r LEFT JOIN Categories c ON r.CategoryID = c.CategoryID';
    const countParams = [];
    const countConditions = [];
    if (category) { countConditions.push('r.CategoryID = ?'); countParams.push(category); }
    if (search)   {
      const rawKeywords = search.replace(/[&,]/g, ' ').trim().split(/\s+/).filter(k => k.length > 1 && !['and', 'the', 'for', 'with'].includes(k.toLowerCase()));
      const keywords = rawKeywords.length > 0 ? rawKeywords : [search.trim()];
      const expandedTerms = [];
      keywords.forEach(k => {
        expandedTerms.push(k);
        if (/seafood/i.test(k)) expandedTerms.push('prawn', 'salmon', 'ilish', 'fish', 'chingri');
      });
      const orClauses = expandedTerms.map(() => '(r.Title LIKE ? OR r.Ingredients LIKE ? OR c.CategoryName LIKE ?)').join(' OR ');
      countConditions.push(`(${orClauses})`);
      expandedTerms.forEach(t => countParams.push(`%${t}%`, `%${t}%`, `%${t}%`));
    }
    if (countConditions.length) countQuery += ' WHERE ' + countConditions.join(' AND ');

    const [[{ total }]] = await db.query(countQuery, countParams);

    res.json({
      success: true,
      data: recipes,
      pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

// ── GET /api/recipes/:id ───────────────────────────────────────────────────────
const getRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      `SELECT
        r.*,
        u.Username AS AuthorName,
        c.CategoryName,
        ROUND(AVG(rt.Score), 1) AS AvgRating,
        COUNT(DISTINCT rt.RatingID) AS RatingCount
       FROM Recipes r
       JOIN  Users      u  ON r.AuthorID   = u.UserID
       LEFT JOIN Categories c  ON r.CategoryID = c.CategoryID
       LEFT JOIN Ratings    rt ON r.RecipeID   = rt.RecipeID
       WHERE r.RecipeID = ?
       GROUP BY r.RecipeID`,
      [id]
    );

    if (!rows[0]) {
      return res.status(404).json({ success: false, message: 'Recipe not found.' });
    }

    res.json({ success: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
};

// ── POST /api/recipes ──────────────────────────────────────────────────────────
// Protected. Image upload handled by uploadMiddleware before this controller.
const createRecipe = async (req, res, next) => {
  try {
    const { Title, Ingredients, CookingSteps, CategoryID } = req.body;
    const AuthorID = req.user.UserID;

    if (!Title || !Ingredients || !CookingSteps) {
      return res.status(400).json({ success: false, message: 'Title, Ingredients, and CookingSteps are required.' });
    }

    // Upload image buffer to Cloudinary, get back a secure CDN URL
    let ImageURL = null;
    if (req.file) {
      ImageURL = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
    }

    const [result] = await db.query(
      'INSERT INTO Recipes (Title, Ingredients, CookingSteps, ImageURL, AuthorID, CategoryID) VALUES (?, ?, ?, ?, ?, ?)',
      [Title, Ingredients, CookingSteps, ImageURL, AuthorID, CategoryID || null]
    );

    res.status(201).json({
      success: true,
      message: 'Recipe created successfully.',
      data: { RecipeID: result.insertId, Title, ImageURL },
    });
  } catch (err) {
    next(err);
  }
};

// ── PUT /api/recipes/:id ───────────────────────────────────────────────────────
// Protected. Only the author can update their recipe.
const updateRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { Title, Ingredients, CookingSteps, CategoryID } = req.body;

    const [rows] = await db.query('SELECT AuthorID FROM Recipes WHERE RecipeID = ?', [id]);
    if (!rows[0]) return res.status(404).json({ success: false, message: 'Recipe not found.' });
    if (rows[0].AuthorID !== req.user.UserID && req.user.Role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this recipe.' });
    }

    const ImageURL = req.file
      ? await uploadToCloudinary(req.file.buffer, req.file.mimetype)
      : undefined;

    // Build dynamic SET clause — only update fields that were provided
    const fields = [];
    const params = [];
    if (Title)        { fields.push('Title = ?');        params.push(Title); }
    if (Ingredients)  { fields.push('Ingredients = ?');  params.push(Ingredients); }
    if (CookingSteps) { fields.push('CookingSteps = ?'); params.push(CookingSteps); }
    if (CategoryID !== undefined) { fields.push('CategoryID = ?'); params.push(CategoryID); }
    if (ImageURL)     { fields.push('ImageURL = ?');     params.push(ImageURL); }

    if (!fields.length) {
      return res.status(400).json({ success: false, message: 'No fields provided to update.' });
    }

    params.push(id);
    await db.query(`UPDATE Recipes SET ${fields.join(', ')} WHERE RecipeID = ?`, params);

    res.json({ success: true, message: 'Recipe updated successfully.' });
  } catch (err) {
    next(err);
  }
};

// ── DELETE /api/recipes/:id ────────────────────────────────────────────────────
// Protected. Author or admin can delete.
const deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query('SELECT AuthorID FROM Recipes WHERE RecipeID = ?', [id]);
    if (!rows[0]) return res.status(404).json({ success: false, message: 'Recipe not found.' });
    if (rows[0].AuthorID !== req.user.UserID && req.user.Role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this recipe.' });
    }

    await db.query('DELETE FROM Recipes WHERE RecipeID = ?', [id]);
    res.json({ success: true, message: 'Recipe deleted successfully.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe };
