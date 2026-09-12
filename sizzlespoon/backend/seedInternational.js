const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const db = require('./config/db');

const internationalRecipes = [
  // ── Indian Cuisines (100% Halal) ───────────────────────────────────────────
  {
    title: 'Traditional Delhi Butter Chicken (Murgh Makhani)',
    categoryName: 'Dinner',
    authorId: 2, // RumaAkter / Chef
    imageUrl: '/images/butter_chicken.jpg',
    ingredients: `- 800g boneless halal chicken thighs, cut into bite-sized pieces
- 1 cup plain full-fat Greek yogurt
- 2 tbsp ginger-garlic paste
- 2 tbsp Kashmiri red chili powder (vibrant red color without harsh heat)
- 1 tbsp garam masala
- 1 tbsp ground cumin & coriander
- 4 tbsp unsalted butter (makhan)
- 1 tbsp neutral cooking oil
- 2 cups crushed ripe tomatoes
- 1 cup heavy cream (fresh malai)
- 2 tbsp kasuri methi (dried fenugreek leaves), toasted & crushed
- 1 tbsp honey or sugar (balances acidity)
- 1 cinnamon stick, 3 green cardamom pods, 2 cloves
- Salt to taste
- Fresh cilantro & swirl of cream to garnish
- Warm garlic naan for serving`,
    cookingSteps: `1. In a large bowl, whisk together yogurt, ginger-garlic paste, Kashmiri chili powder, garam masala, cumin, coriander, salt, and 1 tbsp oil. Coat halal chicken thoroughly and marinate for at least 1 hour.
2. Heat a cast iron skillet or tawa on high. Sear chicken pieces in batches until lightly charred on edges (3-4 minutes per side). Set aside.
3. In a heavy-bottomed Dutch oven or handi, melt 2 tbsp butter with 1 tsp oil over medium heat. Sizzle whole cinnamon, cardamom, and cloves for 30 seconds.
4. Add ginger-garlic paste and sauté for 1 minute until fragrant. Pour in pureed tomatoes, salt, and 1 tbsp Kashmiri chili powder. Simmer for 15-20 minutes until oil begins separating.
5. Blend tomato gravy with an immersion blender until velvety smooth and silky.
6. Return smooth gravy to pan. Stir in heavy cream, honey, and remaining 2 tbsp butter.
7. Add charred chicken with all accumulated juices into gravy. Simmer gently for 8-10 minutes until chicken is tender.
8. Rub toasted kasuri methi between your palms and scatter over curry. Stir well.
9. Garnish with a swirl of fresh cream and chopped cilantro. Serve hot with pillowy garlic naan and basmati rice.`,
    score: 5,
  },
  {
    title: 'Amritsari Paneer Tikka Masala',
    categoryName: 'Vegetarian',
    authorId: 2,
    imageUrl: '/images/paneer_tikka_masala.jpg',
    ingredients: `- 400g firm malai paneer, cut into 1-inch cubes
- 1 large bell pepper (capsicum), deseeded and cut into squares
- 1 large red onion, cut into petals
- 3/4 cup thick hung curd (Greek yogurt)
- 1.5 tbsp besan (roasted gram flour)
- 2 tbsp mustard oil
- 1.5 tbsp ginger-garlic paste
- 1.5 tbsp Kashmiri chili powder
- 1 tsp kasuri methi
- 1 tsp chaat masala & garam masala
- 2 large onions, finely minced
- 3 large ripe tomatoes, pureed
- 1/2 cup cashew nut paste (soaked in hot water and blended smooth)
- 1/2 cup heavy cream
- Fresh coriander leaves
- Salt to taste`,
    cookingSteps: `1. Whisk mustard oil, Kashmiri chili powder, and roasted besan together in a bowl until bright red and smooth. Whisk in hung curd, ginger-garlic paste, chaat masala, kasuri methi, and salt.
2. Gently fold in paneer cubes, onion petals, and bell pepper chunks until evenly coated. Rest for 30 minutes.
3. Heat a grill pan or cast iron skillet with oil. Sear paneer and veggies in batches over high heat for 2-3 minutes per side until charred and smoky. Set aside.
4. In the same pan, heat 2 tbsp ghee or butter. Sauté finely minced onions on medium heat until deep golden brown (8-10 minutes).
5. Add ginger-garlic paste and cook for 1 minute. Add turmeric, coriander powder, cumin powder, and chili powder with a splash of warm water.
6. Pour in pureed tomatoes and cook until oil glistens on top (8-10 minutes).
7. Stir in cashew paste and 1/2 cup warm water. Simmer for 5 minutes until rich and thick.
8. Fold in charred paneer, peppers, and onions. Stir in heavy cream and garam masala. Simmer on low for 3 minutes.
9. Garnish with crushed kasuri methi, fresh coriander, and ginger juliennes. Serve with tandoori roti or jeera rice.`,
    score: 5,
  },

  // ── Chinese Cuisines (100% Halal) ──────────────────────────────────────────
  {
    title: 'Szechuan Kung Pao Chicken (Gong Bao Ji Ding)',
    categoryName: 'Dinner',
    authorId: 2,
    imageUrl: '/images/kung_pao_chicken.jpg',
    ingredients: `- 500g skinless boneless halal chicken thigh, diced into 1/2-inch cubes
- 1/2 cup roasted unsalted peanuts
- 12-15 dried red Szechuan chilies, snipped into halves (deseeded)
- 1 tsp whole Szechuan peppercorns
- 3 scallions (green onions), cut into 1-inch lengths
- 3 cloves garlic, thinly sliced
- 1 inch fresh ginger, peeled and thinly sliced
- Halal Marinade: 1 tbsp apple cider vinegar with 1/2 tsp brown sugar, 1 tbsp naturally brewed light soy sauce, 1 tsp cornstarch, 1/2 tsp toasted sesame oil
- Kung Pao Sauce: 1.5 tbsp Chinkiang black vinegar, 1.5 tbsp light soy sauce, 1 tsp dark soy sauce, 1 tbsp sugar, 1/2 cup halal chicken broth, 1 tsp cornstarch
- 2 tbsp peanut oil or neutral vegetable oil for stir-frying`,
    cookingSteps: `1. Toss diced halal chicken with the apple cider vinegar substitute, light soy sauce, cornstarch, and sesame oil. Let marinate for 20 minutes.
2. In a small bowl, whisk all Kung Pao Sauce ingredients together (Chinkiang vinegar, light and dark soy sauces, sugar, halal chicken broth, cornstarch) until sugar dissolves completely.
3. Heat a carbon steel wok over high heat until smoking hot. Swirl in 2 tbsp oil to coat the surface.
4. Add chicken in a single layer and sear undisturbed for 1 minute, then stir-fry for 2-3 minutes until opaque and 80% cooked. Transfer chicken to a clean plate.
5. Reduce heat to medium-low. Add Szechuan peppercorns and dried chilies to remaining oil in wok. Stir-fry gently for 30 seconds until fragrant and glossy (do not burn).
6. Increase heat to high. Toss in sliced garlic, ginger, and white scallion segments. Stir-fry for 20 seconds.
7. Return chicken to wok. Pour in Kung Pao sauce, stirring constantly as it bubbles and quickly thickens into a glossy mahogany glaze coating the chicken.
8. Turn off heat. Toss in roasted peanuts and green scallion tips. Give one final vigorous wok toss.
9. Serve immediately with hot steamed Jasmine rice.`,
    score: 5,
  },
  {
    title: 'Handmade Crispy Bottom Chicken & Chive Dim Sum Dumplings',
    categoryName: 'Snacks',
    authorId: 2,
    imageUrl: '/images/chinese_dumplings.jpg',
    ingredients: `- 30 round dumpling wrappers (potsticker skins)
- 400g ground halal chicken thighs (tender & naturally juicy)
- 1.5 cups fresh Chinese garlic chives (jiu cai), finely chopped
- 2 cloves garlic, finely grated
- 1 tbsp fresh ginger, finely grated
- 1.5 tbsp naturally brewed light soy sauce & 1 tsp dark soy sauce
- 1 tbsp halal rice vinegar with 1/2 tsp raw cane sugar
- 1 tbsp toasted sesame oil
- 1/2 tsp ground white pepper
- 1/2 tsp sugar & 1/2 tsp salt
- 1 egg white
- 3 tbsp iced halal chicken broth
- Skirt Lace Batter: 1 tsp flour, 1 tsp cornstarch, 1/2 cup cold water, 1/2 tsp vinegar
- Halal Dipping Sauce: 2 tbsp Chinkiang black vinegar, 1 tbsp soy sauce, chili crisp oil, fresh ginger shreds`,
    cookingSteps: `1. In a large mixing bowl, vigorously stir ground chicken, grated ginger, garlic, soy sauces, rice vinegar mixture, sesame oil, white pepper, sugar, salt, and egg white in one direction using chopsticks until the mixture turns sticky and emulsified.
2. Gradually drizzle in iced chicken broth in three additions until completely absorbed. Fold in chopped garlic chives gently at the very end.
3. Lay a dumpling wrapper flat on your palm. Spoon 1 heaping tablespoon of filling into center.
4. Lightly moisten edges with water. Fold wrapper over and pleat 4-5 times along front edge, pressing firmly against back edge to seal tightly with no air pockets.
5. Heat 1 tbsp oil in a non-stick skillet over medium-high heat. Arrange dumplings in neat concentric circles with flat bottoms resting on pan.
6. Fry for 2-3 minutes until bottoms turn crisp and golden brown.
7. Whisk the skirt lace slurry and pour evenly around dumplings into pan. Immediately cover tightly with lid and reduce heat to medium.
8. Steam for 6-8 minutes until chicken filling is thoroughly cooked through. Remove lid and let remaining moisture evaporate until a delicate golden lace skirt forms.
9. Invert onto a serving plate and enjoy piping hot with black vinegar and chili crisp dipping sauce.`,
    score: 5,
  },

  // ── French Cuisines (100% Halal Gourmet) ───────────────────────────────────
  {
    title: 'Classic French Beef Bourguignon (Halal Gourmet Style)',
    categoryName: 'Dinner',
    authorId: 2, // ChefMario
    imageUrl: '/images/beef_bourguignon.jpg',
    ingredients: `- 1.2 kg halal beef chuck roast or brisket, trimmed and cut into 2-inch chunks
- 150g halal smoked beef bacon strips or cured beef brisket lardons, diced
- 3 cups rich roasted halal beef bone broth
- 1.5 cups unsweetened 100% dark red grape & tart cherry reduction with 2 tbsp aged balsamic vinegar (for deep richness, acidity and natural tannins)
- 2 tbsp tomato paste
- 4 cloves garlic, smashed
- 1 bouquet garni (fresh thyme sprigs, rosemary, bay leaf tied with kitchen twine)
- 2 large carrots, cut into 1-inch diagonal chunks
- 1 large yellow onion, chopped
- 20 small pearl onions, peeled
- 300g cremini or button mushrooms, quartered
- 3 tbsp all-purpose flour
- 3 tbsp extra virgin olive oil & 2 tbsp unsalted French butter
- Sea salt & freshly cracked black pepper
- Fresh flat-leaf parsley, chopped
- Crusty French baguette for serving`,
    cookingSteps: `1. Pat halal beef cubes dry with paper towels; season generously with sea salt and cracked black pepper.
2. In a large enamelled cast iron Dutch oven, sauté diced halal beef bacon over medium heat until crispy and aromatic (about 6 minutes). Transfer to a plate using a slotted spoon, keeping rendered savory fat in pot.
3. Increase heat to medium-high. Sear beef chuck chunks in uncrowded batches in savory beef drippings for 3-4 minutes per side until deeply browned and caramelized. Remove and set aside with beef bacon.
4. Sauté chopped yellow onion and carrots in pot for 4 minutes until softened. Stir in smashed garlic and tomato paste for 1 minute until fragrant.
5. Sprinkle flour over vegetables and stir for 2 minutes to cook out raw flour taste.
6. Pour in rich grape & balsamic Burgundy reduction and hot beef bone broth, scraping all caramelized brown bits (fond) from bottom and sides of pot.
7. Return beef, beef bacon, and accumulated juices into Dutch oven. Submerge bouquet garni. Bring to a gentle boil, then cover with heavy lid.
8. Transfer to an oven preheated to 325°F (160°C) and slow-braise for 2.5 to 3 hours until beef is melt-in-your-mouth tender.
9. Meanwhile, sauté pearl onions and mushrooms in 2 tbsp butter in a separate skillet until golden-brown (8 minutes). Gently fold them into stew for final 20 minutes of cooking.
10. Discard bouquet garni, skim any excess surface fat, garnish with fresh parsley, and serve piping hot with warm crusty French baguette slices.`,
    score: 5,
  },
  {
    title: 'Parisian French Onion Soup (Soupe a l\'Oignon Gratinee)',
    categoryName: 'Lunch',
    authorId: 2,
    imageUrl: '/images/french_onion_soup.jpg',
    ingredients: `- 1.5 kg yellow and sweet Vidalia onions, peeled and thinly sliced
- 4 tbsp unsalted French butter
- 1 tbsp extra virgin olive oil
- 1/2 tsp granulated sugar
- 3 cloves garlic, finely minced
- 1/3 cup halal white grape & crisp apple cider reduction
- 6 cups rich halal beef consommé or roasted bone broth
- 2 sprigs fresh thyme & 1 bay leaf
- 1 tbsp halal Worcestershire sauce (anchovy & tamarind based)
- 8 thick slices French baguette (toasted golden)
- 250g authentic French Gruyère or Comté cheese (microbial / vegetarian rennet, halal certified), freshly grated
- Sea salt & freshly ground black pepper to taste`,
    cookingSteps: `1. Melt butter with olive oil in a large Dutch oven over medium heat. Add sliced onions and toss to coat thoroughly.
2. Cook onions uncovered for 15 minutes, stirring occasionally until soft and translucent.
3. Sprinkle sugar and 1/2 tsp salt over onions. Turn heat to medium-low. Cook slowly for 40-50 minutes, stirring every 5-10 minutes, until onions become deeply caramelized, mahogany-colored, jammy, and naturally sweet.
4. Stir in minced garlic and cook for 1 minute until aromatic.
5. Pour in halal white grape & apple cider reduction to deglaze Dutch oven, scraping up all sweet caramelized fond from bottom and sides. Simmer for 2-3 minutes.
6. Pour in hot halal beef broth, Worcestershire sauce, fresh thyme sprigs, and bay leaf. Bring to a gentle boil, then reduce heat, partially cover, and simmer for 30 minutes to develop deep flavor.
7. Season with sea salt and cracked black pepper. Discard thyme sprigs and bay leaf.
8. Ladle piping hot soup into oven-safe ceramic French soup crocks, leaving 1/2 inch at top.
9. Top each bowl with 1-2 toasted baguette slices. Generously heap shredded halal Gruyère cheese over bread and edges of crocks.
10. Broil under oven broiler on high for 3-5 minutes until cheese is bubbling, completely melted, and flecked with golden-brown crusts. Serve immediately!`,
    score: 5,
  },

  // ── Western & Italian Cuisines (100% Halal) ────────────────────────────────
  {
    title: 'All-American Double Smash Cheeseburger & Fries',
    categoryName: 'Dinner',
    authorId: 2,
    imageUrl: '/images/smash_burger.jpg',
    ingredients: `- 450g fresh ground 100% halal chuck beef (80/20 lean-to-fat ratio), divided into four 100g balls
- 4 slices real American cheese (or sharp yellow cheddar, halal certified)
- 2 bakery brioche burger buns, split and buttered
- 1 small yellow onion, paper-thin shaved
- Kosher salt & coarse freshly ground black pepper
- 4 dill pickle chips
- Crisp iceberg lettuce leaves & tomato slices
- Secret Burger Sauce: 1/4 cup mayo, 1.5 tbsp ketchup, 1 tbsp sweet pickle relish, 1 tsp yellow mustard, 1/2 tsp garlic powder, 1/2 tsp smoked paprika
- Side of golden shoestring French fries`,
    cookingSteps: `1. Whisk secret burger sauce ingredients in a small bowl and refrigerate.
2. Heat a heavy cast iron griddle or skillet over high heat until smoking hot (around 450°F / 230°C).
3. Toast buttered brioche bun halves on hot griddle for 1-2 minutes until golden brown. Set aside.
4. Place halal beef balls onto screaming hot dry griddle. Immediately press a handful of shaved onions into top of each ball.
5. Place parchment paper over beef ball and use a heavy burger press or flat spatula to firmly smash beef down as thin as possible, lacing out edges.
6. Season with generous pinch of salt and cracked pepper. Repeat with remaining patties.
7. Cook undisturbed for 2 minutes until outer edges are deeply browned, crispy, and sizzling.
8. Scrape up caramelized crust with a sharp metal spatula and flip.
9. Immediately place cheese on each patty. Stack two cheesy patties together and cook for 1 more minute until melted and gooey.
10. Slather secret sauce onto toasted buns. Place double cheesy stack onto bottom bun, top with pickles, lettuce, and bun top. Serve hot with crispy fries!`,
    score: 5,
  },
  {
    title: 'Classic Italian Lasagna alla Bolognese (100% Halal)',
    categoryName: 'Dinner',
    authorId: 2,
    imageUrl: '/images/lasagna_bolognese.jpg',
    ingredients: `- 12 sheets egg pasta lasagna sheets (oven-ready or parboiled)
- 100% Halal Bolognese Ragù: 400g ground halal beef chuck, 200g ground halal lamb or veal, 100g finely diced halal beef bacon or bresaola, 1 large carrot, 1 celery rib, 1 medium onion (finely diced sofrito), 2 tbsp tomato paste, 1 cup rich halal beef broth, 1 cup whole milk, 2 cans (28 oz total) crushed San Marzano tomatoes, 2 tbsp extra virgin olive oil, 1 tsp dried oregano
- Silky Béchamel Sauce: 4 tbsp unsalted butter, 4 tbsp all-purpose flour, 3.5 cups warm whole milk, 1/4 tsp freshly grated whole nutmeg, pinch of white pepper and sea salt
- 1.5 cups Parmigiano-Reggiano or Grana Padano (halal certified / microbial rennet), freshly grated
- 2 cups whole milk shredded mozzarella cheese
- Fresh basil leaves for garnish`,
    cookingSteps: `1. Bolognese: In a heavy Dutch oven, heat olive oil over medium heat. Sauté diced halal beef bacon until rendered and fragrant. Add finely diced sofrito (onion, carrot, celery) and cook for 8 minutes until sweet and translucent.
2. Add ground beef and lamb. Brown thoroughly over medium-high heat, breaking into fine morsels with a wooden spoon.
3. Pour in whole milk and simmer gently for 10 minutes until milk is absorbed (this enzymes the meat to make it extraordinarily tender).
4. Stir in tomato paste, rich beef broth, and crushed San Marzano tomatoes. Reduce heat to lowest simmer, partially cover, and slow-cook for 1.5 to 2 hours, stirring occasionally. Season with salt, pepper, and oregano.
5. Béchamel: In a heavy saucepan, melt butter over medium heat. Whisk in flour and cook for 2 minutes without browning. Slowly stream in warm milk while whisking vigorously until velvety smooth. Simmer for 6-8 minutes until thick enough to coat back of spoon. Whisk in grated nutmeg, sea salt, and white pepper.
6. Preheat oven to 375°F (190°C). Lightly butter a 9x13-inch baking dish.
7. Spread a thin layer of Bolognese ragù on bottom. Lay 3-4 lasagna sheets. Top with Bolognese, ladle creamy Béchamel, and sprinkle Parmigiano and mozzarella.
8. Repeat layering for 4 complete tiers. Finish top tier with generous Béchamel, shredded mozzarella, and extra Parmigiano.
9. Cover loosely with tented aluminum foil (so it doesn't touch cheese) and bake for 25 minutes. Remove foil and bake 15-20 minutes until top is bubbling and deep golden-brown.
10. Let rest for 15 minutes before slicing into neat squares. Garnish with fresh basil and serve!`,
    score: 5,
  },
];

async function seed() {
  try {
    console.log('🌱 Seeding 8 100% Halal international recipes...');

    const [categories] = await db.query('SELECT CategoryID, CategoryName FROM Categories');
    const catMap = {};
    categories.forEach(c => { catMap[c.CategoryName] = c.CategoryID; });

    // Map old titles to new titles to update existing rows cleanly
    const oldTitleMap = {
      'Handmade Crispy Bottom Chicken & Chive Dim Sum Dumplings': 'Handmade Crispy Bottom Pork Dim Sum Dumplings',
      'Classic French Beef Bourguignon (Halal Gourmet Style)': 'Classic French Beef Bourguignon',
      'Classic Italian Lasagna alla Bolognese (100% Halal)': 'Classic Italian Lasagna alla Bolognese',
    };

    for (const item of internationalRecipes) {
      const catId = catMap[item.categoryName] || null;

      const oldTitle = oldTitleMap[item.title];
      let [existing] = await db.query('SELECT RecipeID FROM Recipes WHERE Title = ?', [item.title]);
      if (existing.length === 0 && oldTitle) {
        [existing] = await db.query('SELECT RecipeID FROM Recipes WHERE Title = ?', [oldTitle]);
      }

      let recipeId;
      if (existing.length > 0) {
        recipeId = existing[0].RecipeID;
        console.log(`- Updating recipe to 100% Halal: ${item.title} (ID: ${recipeId})`);
        await db.query(
          'UPDATE Recipes SET Title = ?, Ingredients = ?, CookingSteps = ?, ImageURL = ?, AuthorID = ?, CategoryID = ? WHERE RecipeID = ?',
          [item.title, item.ingredients, item.cookingSteps, item.imageUrl, item.authorId, catId, recipeId]
        );
      } else {
        const [result] = await db.query(
          'INSERT INTO Recipes (Title, Ingredients, CookingSteps, ImageURL, AuthorID, CategoryID) VALUES (?, ?, ?, ?, ?, ?)',
          [item.title, item.ingredients, item.cookingSteps, item.imageUrl, item.authorId, catId]
        );
        recipeId = result.insertId;
        console.log(`+ Inserted new recipe: ${item.title} (ID: ${recipeId})`);
      }

      await db.query(
        'INSERT INTO Ratings (UserID, RecipeID, Score) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE Score = ?',
        [item.authorId, recipeId, item.score, item.score]
      );
    }

    console.log('✅ All international recipes are now 100% Halal!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error updating recipes:', err);
    process.exit(1);
  }
}

seed();
