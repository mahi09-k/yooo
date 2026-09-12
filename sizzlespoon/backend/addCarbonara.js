const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const db = require('./config/db');

async function addCarbonara() {
  const title = 'Authentic Roman Pasta Carbonara (100% Halal)';
  const categoryId = 3; // Dinner
  const authorId = 2; // M. A. Rafiu Ramim
  const imageUrl = '/images/pasta_carbonara.jpg';

  const ingredients = `- 400g bronze-die extruded spaghetti or bucatini
- 200g halal smoked beef bacon or cured beef brisket strips, sliced into thick matchsticks (lardons)
- 4 large fresh farm egg yolks + 1 whole egg (at room temperature)
- 1 cup freshly grated Pecorino Romano & Parmigiano-Reggiano (halal certified / microbial rennet)
- 1.5 tbsp whole black peppercorns, freshly and coarsely cracked in a mortar
- 1/2 cup starchy pasta cooking water (essential for silky emulsion)
- Flaky sea salt for the pasta water
- Extra grated cheese and cracked black pepper for garnish`;

  const cookingSteps = `1. Bring a large pot of water to a rolling boil. Season with salt (less than usual, as cured beef bacon and aged cheese provide plenty of salinity).
2. Drop spaghetti into boiling water and cook until 2 minutes shy of al dente, stirring occasionally.
3. In a heat-proof bowl, vigorously whisk together 4 egg yolks, 1 whole egg, and 3/4 cup of grated cheese until a thick, smooth, golden paste forms. Whisk in half of the cracked black pepper.
4. Place a large skillet over medium heat. Saute halal beef bacon lardons for 5-7 minutes until fat has rendered and edges are crispy and golden-brown. Remove pan from heat.
5. Reserve 1 cup of hot starchy pasta water before draining.
6. Transfer hot al dente pasta directly into skillet with crispy beef bacon, tossing to coat every strand in the savory drippings.
7. Let skillet cool for 30 seconds (so eggs do not scramble). Stream 3 tablespoons of hot pasta water into egg-cheese paste while whisking to temper it.
8. Pour tempered egg mixture over warm pasta. Immediately toss and swirl continuously with tongs. The starch and fat will emulsify into a glossy, velvety sauce. Add splashes of pasta water as needed for silkiness.
9. Divide onto warm plates. Shower with remaining grated cheese, crispy beef bacon bits, and coarse freshly cracked black pepper. Serve immediately!`;

  const [existing] = await db.query('SELECT RecipeID FROM Recipes WHERE Title = ?', [title]);
  let recipeId;

  if (existing.length > 0) {
    recipeId = existing[0].RecipeID;
    await db.query(
      'UPDATE Recipes SET Ingredients = ?, CookingSteps = ?, ImageURL = ?, AuthorID = ?, CategoryID = ? WHERE RecipeID = ?',
      [ingredients, cookingSteps, imageUrl, authorId, categoryId, recipeId]
    );
    console.log('✅ Updated existing Pasta Carbonara (ID:', recipeId, ')');
  } else {
    const [res] = await db.query(
      'INSERT INTO Recipes (Title, Ingredients, CookingSteps, ImageURL, AuthorID, CategoryID) VALUES (?, ?, ?, ?, ?, ?)',
      [title, ingredients, cookingSteps, imageUrl, authorId, categoryId]
    );
    recipeId = res.insertId;
    console.log('✅ Inserted new Pasta Carbonara (ID:', recipeId, ')');
  }

  await db.query(
    'INSERT INTO Ratings (UserID, RecipeID, Score) VALUES (?, ?, 5) ON DUPLICATE KEY UPDATE Score = 5',
    [authorId, recipeId]
  );
  console.log('⭐ Added 5-star rating.');

  process.exit(0);
}

addCarbonara().catch(err => {
  console.error(err);
  process.exit(1);
});
