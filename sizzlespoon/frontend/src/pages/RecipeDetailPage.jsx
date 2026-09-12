import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import StarRating from '../components/StarRating';
import ReviewList from '../components/ReviewList';

export default function RecipeDetailPage() {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState({ AvgRating: 0, RatingCount: 0, userScore: 0 });
  const [isFav, setIsFav] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [error, setError] = useState('');

  // Fetch recipe, reviews, and ratings
  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get(`/recipes/${id}`),
      api.get(`/reviews/${id}`),
      api.get(`/ratings/${id}`),
    ])
      .then(([recipeRes, reviewsRes, ratingRes]) => {
        setRecipe(recipeRes.data.data);
        setReviews(reviewsRes.data.data);
        setRating(ratingRes.data.data);
      })
      .catch(() => setError('Recipe not found or server error.'))
      .finally(() => setLoading(false));
  }, [id]);

  // Check favorites
  useEffect(() => {
    if (!isAuthenticated) return;
    api.get('/favorites')
      .then(({ data }) => {
        setIsFav(data.data.some((r) => r.RecipeID === Number(id)));
      })
      .catch(() => {});
  }, [id, isAuthenticated]);

  const toggleFavorite = async () => {
    if (!isAuthenticated) { navigate('/login'); return; }
    setFavLoading(true);
    try {
      if (isFav) {
        await api.delete(`/favorites/${id}`);
        setIsFav(false);
      } else {
        await api.post(`/favorites/${id}`);
        setIsFav(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setFavLoading(false);
    }
  };

  const handleRate = async (score) => {
    if (!isAuthenticated) { navigate('/login'); return; }
    try {
      const { data } = await api.post(`/ratings/${id}`, { Score: score });
      setRating({ AvgRating: data.data.AvgRating, RatingCount: data.data.RatingCount, userScore: score });
    } catch (err) {
      alert(err.response?.data?.message || 'Rating failed.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Permanently delete this recipe?')) return;
    try {
      await api.delete(`/recipes/${id}`);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed.');
    }
  };

  const refreshReviews = useCallback(() => {
    api.get(`/reviews/${id}`).then(({ data }) => setReviews(data.data)).catch(() => {});
  }, [id]);

  const toggleIngredient = (idx) => {
    setCheckedIngredients((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  if (loading) {
    return (
      <div className="section-poy max-w-4xl py-12 space-y-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3" />
        <div className="h-12 bg-gray-200 rounded w-3/4" />
        <div className="h-96 bg-gray-200 rounded" />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="section-poy text-center py-20">
        <p className="text-5xl mb-4">🍽️</p>
        <p className="text-poy-gray-600 mb-6 font-serif text-lg">{error || 'Recipe not found.'}</p>
        <Link to="/" className="btn-poy-purple">Back to Home</Link>
      </div>
    );
  }

  const isOwner = user?.UserID === recipe.AuthorID;

  // Split ingredients and steps by newlines
  const ingredientsList = recipe.Ingredients
    ? recipe.Ingredients.split('\n').filter((l) => l.trim().length > 0)
    : [];
  const stepsList = recipe.CookingSteps
    ? recipe.CookingSteps.split('\n').filter((l) => l.trim().length > 0)
    : [];

  return (
    <div className="bg-white">
      {/* ── Breadcrumb Bar (Pinch of Yum style) ─────────────────────────────── */}
      <div className="border-b border-gray-100 bg-poy-gray-50 py-3">
        <div className="max-w-4xl mx-auto px-4 text-xs font-arvo uppercase tracking-widest text-poy-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-poy-purple">Home</Link>
          <span>/</span>
          <Link to="/categories" className="hover:text-poy-purple">Recipes</Link>
          {recipe.CategoryName && (
            <>
              <span>/</span>
              <span className="text-poy-purple font-bold">{recipe.CategoryName}</span>
            </>
          )}
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-8">

        {/* ── Recipe Header ─────────────────────────────────────────────────── */}
        <header className="mb-6">
          <h1 className="font-domaine text-4xl sm:text-5xl md:text-6xl text-poy-gray-900 leading-tight mb-4">
            {recipe.Title}
          </h1>

          {/* Star Rating Line */}
          <div className="flex items-center gap-3 mb-4 text-sm font-arvo">
            <span className="text-poy-yellow text-lg font-serif">★★★★★</span>
            <span className="text-poy-gray-700 font-bold">
              {rating.AvgRating ? `${rating.AvgRating} average` : 'Be the first to rate!'}
            </span>
            {rating.RatingCount > 0 && (
              <span className="text-poy-gray-400">/ {rating.RatingCount} reviews</span>
            )}
          </div>

          {/* Author Byline */}
          <div className="flex items-center gap-3 py-3 border-y border-gray-200">
            <div className="w-10 h-10 rounded-full bg-poy-purple text-white flex items-center justify-center font-serif text-sm font-bold">
              {recipe.AuthorName?.[0]?.toUpperCase() || 'C'}
            </div>
            <div className="text-xs font-arvo">
              <p className="text-poy-gray-800">
                Published by <span className="text-poy-purple font-bold">{recipe.AuthorName}</span>
              </p>
              <p className="text-poy-gray-400 uppercase tracking-wider">
                {new Date(recipe.CreatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            {/* Jump to Recipe Button */}
            <div className="ml-auto">
              <a
                href="#recipe-card"
                className="btn-poy-purple text-[10px] py-2 px-4 shadow-sm"
              >
                Jump to Recipe ↓
              </a>
            </div>
          </div>
        </header>

        {/* ── Featured Food Image ───────────────────────────────────────────── */}
        <div className="relative mb-10 overflow-hidden bg-poy-gray-100 shadow-sm">
          {recipe.ImageURL ? (
            <img
              src={recipe.ImageURL}
              alt={recipe.Title}
              className="w-full h-auto max-h-[550px] object-cover mx-auto"
            />
          ) : (
            <div className="h-80 flex items-center justify-center text-7xl">🍽️</div>
          )}

          {/* Floating Save Button on Image */}
          <button
            onClick={toggleFavorite}
            disabled={favLoading}
            className="absolute top-4 right-4 bg-white/95 backdrop-blur text-poy-purple px-4 py-2 text-xs font-sans font-bold uppercase tracking-widest shadow hover:bg-poy-yellow hover:text-white transition flex items-center gap-1.5"
          >
            <span>{isFav ? '♥' : '♡'}</span>
            <span>{isFav ? 'Saved' : 'Save Recipe'}</span>
          </button>
        </div>

        {/* ── Rate This Recipe Widget (Interactive) ─────────────────────────── */}
        <div className="bg-poy-purple-bg border border-poy-purple-light p-6 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-domaine text-xl text-poy-purple mb-1">
              Did you make this recipe?
            </h4>
            <p className="text-xs font-serif text-poy-gray-600">
              Leave a rating below to let us know how it turned out!
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StarRating score={rating.userScore || Number(rating.AvgRating)} onRate={handleRate} size="md" />
            <span className="font-arvo text-xs text-poy-purple font-bold">
              {rating.userScore ? `Rated ${rating.userScore}/5` : 'Rate'}
            </span>
          </div>
        </div>

        {/* ── THE SIGNATURE TASTY RECIPES CARD (Pinch of Yum's Iconic Recipe Box) */}
        <section id="recipe-card" className="border-4 border-poy-slate my-12 relative bg-white shadow-md">

          {/* Top Cutout Photo & Header */}
          <div className="bg-poy-slate text-white text-center pt-8 pb-6 px-6 relative">
            {recipe.ImageURL && (
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-poy-slate mx-auto -mt-24 shadow-md bg-white">
                <img
                  src={recipe.ImageURL}
                  alt={recipe.Title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <h2 className="font-domaine text-3xl sm:text-4xl text-white font-normal lowercase tracking-tight mt-2 mb-3">
              {recipe.Title}
            </h2>

            {/* Rating Stars inside card */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-poy-yellow text-xl font-serif">★★★★★</span>
              <span className="text-white/80 font-arvo text-xs italic">
                {rating.AvgRating || '5.0'} from {rating.RatingCount || 1} reviews
              </span>
            </div>

            <hr className="border-white/20 my-4" />

            {/* Quick Details Row */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-serif text-white/90">
              <div>
                <span className="italic text-white/60 mr-1">Dietary:</span>
                <span className="font-bold text-emerald-300">✓ 100% Halal</span>
              </div>
              <div>
                <span className="italic text-white/60 mr-1">Author:</span>
                <span className="font-bold">{recipe.AuthorName}</span>
              </div>
              <div>
                <span className="italic text-white/60 mr-1">Category:</span>
                <span className="font-bold">{recipe.CategoryName || 'Main Dish'}</span>
              </div>
              <div>
                <span className="italic text-white/60 mr-1">Total Time:</span>
                <span className="font-bold">30 mins</span>
              </div>
              <div>
                <span className="italic text-white/60 mr-1">Yield:</span>
                <span className="font-bold">4 servings</span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Print & Pin */}
          <div className="grid grid-cols-2 border-b border-gray-200">
            <button
              onClick={() => window.print()}
              className="py-3.5 bg-poy-gray-700 text-white font-sans font-bold uppercase tracking-wider text-xs hover:bg-poy-gray-900 transition flex items-center justify-center gap-2 border-r border-white/10"
            >
              <span>🖨️</span> Print Recipe
            </button>
            <button
              onClick={toggleFavorite}
              className="py-3.5 bg-poy-purple text-white font-sans font-bold uppercase tracking-wider text-xs hover:bg-poy-purple-dark transition flex items-center justify-center gap-2"
            >
              <span>♥</span> {isFav ? 'Saved to Favorites' : 'Save to Favorites'}
            </button>
          </div>

          {/* Card Body */}
          <div className="p-6 sm:p-10 space-y-8">

            {/* Description */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="font-sans uppercase text-xs tracking-widest text-poy-gray-500 font-bold mb-3">
                Description
              </h3>
              <p className="font-serif text-poy-gray-700 text-base leading-relaxed">
                Simple, flavorful, and made for real everyday kitchens. This {recipe.Title.toLowerCase()} is delicious, reliable, and guaranteed to impress.
              </p>
            </div>

            {/* Ingredients with Interactive Checkboxes */}
            <div className="border-b border-gray-200 pb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-sans uppercase text-xs tracking-widest text-poy-gray-500 font-bold">
                  Ingredients
                </h3>
                <span className="font-arvo text-[11px] uppercase tracking-wider text-poy-gray-400">
                  Tap to check off
                </span>
              </div>

              <ul className="space-y-2.5">
                {ingredientsList.map((line, idx) => {
                  const cleaned = line.replace(/^-\s*/, '');
                  const isChecked = checkedIngredients[idx];
                  return (
                    <li
                      key={idx}
                      onClick={() => toggleIngredient(idx)}
                      className={`flex items-start gap-3 cursor-pointer select-none font-serif text-base transition-colors ${
                        isChecked ? 'line-through text-gray-400' : 'text-poy-gray-800 hover:text-poy-purple'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={!!isChecked}
                        onChange={() => {}}
                        className="mt-1.5 h-4 w-4 rounded border-gray-300 text-poy-purple focus:ring-poy-purple cursor-pointer"
                      />
                      <span>{cleaned}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Cooking Instructions with Numbered Circular Badges */}
            <div>
              <h3 className="font-sans uppercase text-xs tracking-widest text-poy-gray-500 font-bold mb-6">
                Instructions
              </h3>

              <ol className="space-y-6">
                {stepsList.map((step, idx) => {
                  const cleaned = step.replace(/^\d+\.\s*/, '');
                  return (
                    <li key={idx} className="flex items-start gap-4">
                      <span className="w-7 h-7 rounded-full bg-poy-slate text-white flex-shrink-0 flex items-center justify-center font-sans font-bold text-xs mt-0.5 shadow-sm">
                        {idx + 1}
                      </span>
                      <p className="font-serif text-poy-gray-800 text-base leading-relaxed flex-1">
                        {cleaned}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Owner Actions */}
            {(isOwner || user?.Role === 'admin') && (
              <div className="pt-6 border-t border-gray-200 flex justify-end">
                <button
                  onClick={handleDelete}
                  className="font-sans uppercase text-xs font-bold tracking-wider text-red-600 hover:text-red-800"
                >
                  Delete Recipe
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── Reviews & Comments Section (POY style) ────────────────────────── */}
        <section className="mt-16 pt-8 border-t border-gray-200">
          <ReviewList
            recipeId={id}
            reviews={reviews}
            onReviewAdded={refreshReviews}
            onReviewDeleted={refreshReviews}
          />
        </section>

      </article>
    </div>
  );
}
