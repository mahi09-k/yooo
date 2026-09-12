import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import RecipeCard from '../components/RecipeCard';

// Authentic photography curated for Pinch of Yum style circular categories
const CATEGORY_THUMBNAILS = [
  { name: 'Indian', img: '/images/butter_chicken.jpg' },
  { name: 'Chinese', img: '/images/kung_pao_chicken.jpg' },
  { name: 'French', img: '/images/beef_bourguignon.jpg' },
  { name: 'Western', img: '/images/smash_burger.jpg' },
  { name: 'Italian', img: '/images/lasagna_bolognese.jpg' },
  { name: 'Dim Sum', img: '/images/chinese_dumplings.jpg' },
  { name: 'Paneer', img: '/images/paneer_tikka_masala.jpg' },
  { name: 'Soup', img: '/images/french_onion_soup.jpg' },
  { name: 'Kacchi', img: '/images/kacchi_biryani.jpg' },
  { name: 'Ilish', img: '/images/shorshe_ilish.jpg' },
  { name: 'Khichuri', img: '/images/bhuna_khichuri.jpg' },
  { name: 'Bhorta', img: '/images/begun_bhorta.jpg' },
  { name: 'Snacks', img: '/images/mughlai_paratha.jpg' },
  { name: 'Seafood', img: '/images/chingri_malai.jpg' },
  { name: 'Dessert', img: '/images/mishti_doi.jpg' },
  { name: 'Drinks', img: '/images/shahi_borhani.jpg' },
];

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/recipes?limit=24'),
      api.get('/categories'),
    ])
      .then(([recipeRes, catRes]) => {
        setRecipes(recipeRes.data.data);
        setCategories(catRes.data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Filter recipes for the category tab section
  const tabRecipes = recipes.filter((r) => {
    if (activeTab === 'all') return true;
    return r.CategoryName?.toLowerCase().includes(activeTab);
  });

  return (
    <main className="pt-6 md:pt-10">

      {/* ── 1. Pinch of Yum Eyebrow Tagline ─────────────────────────────────── */}
      <section className="text-center pb-6 px-4">
        <h1 className="font-arvo uppercase tracking-giant text-xs sm:text-sm text-poy-gray-900 leading-relaxed">
          <span>Simple recipes made for </span>
          <span className="font-serif italic normal-case text-poy-purple text-xl sm:text-2xl font-bold ml-1">
            real, actual, everyday life.
          </span>
        </h1>
      </section>

      {/* ── 2. Pinch of Yum 4-Card Hero Grid ───────────────────────────────── */}
      <section className="bg-poy-gray-100 py-8 md:py-10 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4 lg:px-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recipes.slice(0, 4).map((r) => (
              <RecipeCard key={r.RecipeID} recipe={r} />
            ))}
          </div>

          {/* ── Circular Category Row (Pinch of Yum signature carousel) ───────── */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <Link to="/categories" className="btn-poy-purple flex-shrink-0 w-full md:w-auto text-center">
              + View All Recipes
            </Link>

            <div className="flex space-x-6 overflow-x-auto pb-2 w-full scrollbar-hide">
              {CATEGORY_THUMBNAILS.map((cat) => (
                <Link
                  key={cat.name}
                  to={`/categories?search=${encodeURIComponent(cat.name)}`}
                  className="flex flex-col items-center flex-shrink-0 group"
                >
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-transparent group-hover:border-poy-purple transition mb-2 shadow-sm"
                  />
                  <span className="font-sans font-bold text-xs text-poy-gray-900 group-hover:text-poy-purple transition text-center whitespace-nowrap">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. "The Latest & Greatest" (8-col Feed + 4-col Sidebar) ─────────── */}
      <section className="section-poy py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Left Column: Recent Recipes Feed (8 cols) */}
          <div className="md:col-span-8">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-200">
              <h2 className="font-arvo text-xs uppercase tracking-widest text-poy-purple font-bold">
                The Latest &amp; Greatest
              </h2>
              <span className="font-sans text-xs text-poy-gray-500 uppercase tracking-wider">
                Tested &amp; Perfected
              </span>
            </div>

            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-44 bg-poy-gray-100 animate-pulse" />
                ))}
              </div>
            ) : recipes.length === 0 ? (
              <p className="text-gray-400 py-10">No recipes posted yet.</p>
            ) : (
              <div>
                {recipes.map((recipe) => (
                  <RecipeCard key={recipe.RecipeID} recipe={recipe} variant="horizontal" />
                ))}
                <div className="pt-8 text-center">
                  <Link to="/categories" className="btn-poy-purple">
                    View More Recent Posts
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Pinch of Yum Sidebar (4 cols) */}
          <aside className="md:col-span-4 space-y-8">
            {/* Promo Banner Card */}
            <div className="bg-poy-gray-100 border border-gray-200 p-6 text-center">
              <span className="font-arvo text-[10px] text-poy-purple uppercase tracking-giant font-bold block mb-1">
                Community Favorites
              </span>
              <h3 className="font-domaine text-2xl text-poy-gray-900 mb-2">
                Have a Great Recipe?
              </h3>
              <p className="text-sm font-serif text-poy-gray-600 mb-5 leading-relaxed">
                Join our community of home cooks and publish your best creations to SizzleSpoon.
              </p>
              <Link to="/submit" className="btn-poy-purple w-full text-center">
                Submit Your Recipe
              </Link>
            </div>

            {/* Recipe Collections Box (Signature POY Sidebar Component) */}
            <div className="bg-poy-gray-200 border border-gray-300">
              <h3 className="px-6 py-4 text-poy-purple text-sm font-arvo uppercase tracking-widest border-b-2 border-white font-bold">
                Recipe Collections
              </h3>
              <ol className="divide-y-2 divide-white">
                {[
                  { name: 'Dinner Recipes', count: 184 },
                  { name: 'Quick and Easy', count: 501 },
                  { name: 'Vegetarian Dishes', count: 199 },
                  { name: 'Breakfast & Brunch', count: 96 },
                  { name: 'Desserts & Sweets', count: 142 },
                  { name: 'Healthy Soups', count: 76 },
                  { name: 'Most Popular', count: 89 },
                ].map((col) => (
                  <li key={col.name} className="px-6 py-3.5 hover:bg-white/50 transition">
                    <Link
                      to={`/categories?search=${encodeURIComponent(col.name)}`}
                      className="flex justify-between items-center text-sm font-serif text-poy-gray-800 hover:text-poy-purple"
                    >
                      <span>{col.name}</span>
                      <span className="font-arvo text-xs text-poy-gray-500 font-bold">
                        {col.count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>

      {/* ── 4. "Hi! Nice to Meet You" Author Bio Section (POY signature) ─────── */}
      <section className="bg-poy-gray-100 py-12 border-y border-gray-200 my-8">
        <div className="max-w-6xl mx-auto px-4 lg:px-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Bio text block */}
            <div className="md:col-span-4 bg-poy-gray-200 p-8 text-center flex flex-col justify-center border border-gray-300">
              <h3 className="font-arvo uppercase tracking-widest text-sm text-poy-gray-900 mb-1 font-bold">
                Hi! We're SizzleSpoon.
              </h3>
              <span className="font-serif italic text-2xl text-poy-purple font-bold mb-4">
                Nice to Meet You!
              </span>
              <p className="text-sm font-serif text-poy-gray-700 leading-relaxed mb-6">
                We believe food should be joyful, accessible, and totally non-intimidating.
                From 20-minute weeknight dinners to show-stopping desserts, we celebrate real food for real life.
              </p>
              <Link to="/categories" className="btn-poy-dark self-center text-center">
                Explore All Recipes
              </Link>
            </div>

            {/* 2 Food & Kitchen Photography Columns */}
            <div className="hidden md:block md:col-span-4 h-80 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"
                alt="Cooking in kitchen"
                className="w-full h-full object-cover shadow-sm"
              />
            </div>
            <div className="hidden md:block md:col-span-4 h-80 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?auto=format&fit=crop&w=800&q=80"
                alt="Fresh ingredients"
                className="w-full h-full object-cover shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Follow Us & Email Updates Bar (Pinch of Yum purple banner) ─────── */}
      <section className="bg-poy-purple py-10 px-4 text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <span className="font-arvo uppercase tracking-widest text-xs font-bold text-white">
              Follow Along:
            </span>
            {['Instagram', 'Pinterest', 'TikTok', 'Facebook', 'YouTube'].map((net) => (
              <span
                key={net}
                title={net}
                className="w-9 h-9 rounded-full bg-white text-poy-purple flex items-center justify-center font-bold text-xs hover:bg-poy-yellow hover:text-white transition cursor-pointer"
              >
                {net[0]}
              </span>
            ))}
          </div>

          {/* Email Subscription Box */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <span className="font-arvo uppercase tracking-widest text-xs font-bold text-white whitespace-nowrap">
              Recipes to your inbox:
            </span>
            <div className="flex w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter your email address…"
                className="px-4 py-2.5 text-sm text-poy-gray-900 outline-none w-full sm:w-64"
              />
              <button
                type="button"
                onClick={() => alert('Thanks for subscribing!')}
                className="bg-poy-yellow text-poy-gray-900 font-sans font-bold uppercase tracking-wider text-xs px-5 py-2.5 hover:bg-poy-yellow-hover transition"
              >
                Go
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Category Tabs Grid (Vegetarian / Quick & Easy / Popular) ──────── */}
      <section className="section-poy py-12">
        <div className="text-center mb-8">
          <div className="inline-flex border-b border-gray-300 gap-6">
            {[
              { id: 'all', label: 'All Recipes' },
              { id: 'dinner', label: 'Dinner' },
              { id: 'breakfast', label: 'Breakfast' },
              { id: 'vegetarian', label: 'Vegetarian' },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`font-sans font-bold uppercase tracking-widest text-xs pb-3 transition border-b-2 -mb-px ${
                  activeTab === id
                    ? 'border-poy-purple text-poy-purple'
                    : 'border-transparent text-poy-gray-500 hover:text-poy-purple'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tabRecipes.slice(0, 4).map((r) => (
            <RecipeCard key={r.RecipeID} recipe={r} />
          ))}
        </div>
      </section>

    </main>
  );
}
