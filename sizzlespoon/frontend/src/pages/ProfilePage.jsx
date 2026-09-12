import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import RecipeCard from '../components/RecipeCard';

export default function ProfilePage() {
  const { user } = useAuth();
  const [tab, setTab] = useState('recipes'); // 'recipes' | 'favorites'
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    Promise.all([
      api.get('/recipes?limit=50&page=1'),
      api.get('/favorites'),
    ])
      .then(([recipesRes, favRes]) => {
        setRecipes(recipesRes.data.data.filter((r) => r.AuthorName === user.Username));
        setFavorites(favRes.data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  const displayList = tab === 'recipes' ? recipes : favorites;

  return (
    <div className="section-poy py-12">
      {/* ── Profile Header ───────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-8 border-b border-gray-200 mb-8 text-center sm:text-left">
        <div className="w-20 h-20 rounded-full bg-poy-purple text-white flex items-center justify-center text-3xl font-serif font-bold shadow-md flex-shrink-0">
          {user?.Username?.[0]?.toUpperCase()}
        </div>
        <div>
          <span className="font-arvo text-[10px] uppercase tracking-giant text-poy-purple font-bold block mb-1">
            Chef Profile
          </span>
          <h1 className="font-domaine text-4xl text-poy-gray-900 mb-1">
            {user?.Username}
          </h1>
          <p className="font-serif text-sm text-poy-gray-500 mb-3">{user?.Email}</p>
          <span className="inline-block bg-poy-gray-200 text-poy-gray-700 font-sans text-[11px] font-bold uppercase tracking-wider px-3 py-1">
            {user?.Role === 'admin' ? 'Administrator' : 'Community Chef'}
          </span>
        </div>
        <div className="sm:ml-auto">
          <Link to="/submit" className="btn-poy-purple">
            + Submit New Recipe
          </Link>
        </div>
      </div>

      {/* ── Tabs (Pinch of Yum style) ────────────────────────────────────────── */}
      <div className="flex border-b border-gray-200 mb-8 gap-8">
        {[
          { key: 'recipes', label: `My Recipes (${recipes.length})` },
          { key: 'favorites', label: `Saved Favorites (${favorites.length})` },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`font-sans text-xs font-bold uppercase tracking-widest pb-3 border-b-2 -mb-px transition ${
              tab === key
                ? 'border-poy-purple text-poy-purple'
                : 'border-transparent text-poy-gray-400 hover:text-poy-purple'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Content Grid ─────────────────────────────────────────────────────── */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square bg-poy-gray-100 animate-pulse" />
          ))}
        </div>
      ) : displayList.length === 0 ? (
        <div className="text-center py-16 bg-poy-gray-50 border border-gray-200">
          <p className="text-4xl mb-3">{tab === 'recipes' ? '📝' : '♥'}</p>
          <p className="font-domaine text-2xl text-poy-gray-800 mb-2">
            {tab === 'recipes' ? 'No recipes published yet.' : 'No saved favorites yet.'}
          </p>
          <p className="font-serif text-sm text-poy-gray-500 mb-6">
            {tab === 'recipes'
              ? 'Share your secret family recipes and weeknight dinners with our community!'
              : 'Save recipes by tapping the heart button on any recipe card to access them quickly here.'}
          </p>
          <Link
            to={tab === 'recipes' ? '/submit' : '/categories'}
            className="btn-poy-purple"
          >
            {tab === 'recipes' ? 'Submit Your First Recipe' : 'Browse Recipes'}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {displayList.map((r) => (
            <RecipeCard key={r.RecipeID} recipe={r} />
          ))}
        </div>
      )}
    </div>
  );
}
