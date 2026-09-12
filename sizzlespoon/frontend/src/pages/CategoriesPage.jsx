import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import RecipeCard from '../components/RecipeCard';

export default function CategoriesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCatId = searchParams.get('cat') ? Number(searchParams.get('cat')) : null;
  const initialSearch = searchParams.get('search') || '';

  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState(initialSearch);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    api.get('/categories').then(({ data }) => setCategories(data.data)).catch(() => {});
  }, []);

  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    setSearch(urlSearch);
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ limit: 12, page });
    if (activeCatId) params.set('category', activeCatId);
    if (search.trim()) params.set('search', search.trim());

    api.get(`/recipes?${params}`)
      .then(({ data }) => {
        setRecipes(data.data);
        setPagination(data.pagination);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [activeCatId, page, search]);

  const selectCategory = (id) => {
    setPage(1);
    if (id) setSearchParams({ cat: id });
    else setSearchParams({});
  };

  const activeCategory = categories.find((c) => c.CategoryID === activeCatId);

  return (
    <div className="section-poy py-12">
      {/* ── Page Header ──────────────────────────────────────────────────────── */}
      <div className="text-center mb-10 pb-6 border-b border-gray-200">
        <span className="font-arvo text-xs uppercase tracking-giant text-poy-purple font-bold block mb-2">
          The Recipe Index
        </span>
        <h1 className="font-domaine text-4xl sm:text-5xl text-poy-gray-900 mb-3">
          Explore All Recipes
        </h1>
        <p className="font-serif text-poy-gray-600 max-w-lg mx-auto text-base">
          Browse by meal, dietary preference, or search for ingredients in your fridge.
        </p>
      </div>

      {/* ── Search Bar in Pinch of Yum style ─────────────────────────────────── */}
      <div className="max-w-md mx-auto mb-10">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by recipe name, ingredient, keyword…"
            className="input-poy pr-10 shadow-sm"
          />
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-poy-purple text-sm">
            🔍
          </span>
        </div>
      </div>

      {/* ── Category Filter Pills ─────────────────────────────────────────────── */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        <button
          onClick={() => selectCategory(null)}
          className={`font-sans text-xs font-bold uppercase tracking-wider px-5 py-2.5 transition border ${
            !activeCatId
              ? 'bg-poy-purple text-white border-poy-purple'
              : 'bg-poy-gray-100 text-poy-gray-700 border-gray-200 hover:border-poy-purple'
          }`}
        >
          All Recipes
        </button>
        {categories.map((cat) => (
          <button
            key={cat.CategoryID}
            onClick={() => selectCategory(cat.CategoryID)}
            className={`font-sans text-xs font-bold uppercase tracking-wider px-5 py-2.5 transition border ${
              activeCatId === cat.CategoryID
                ? 'bg-poy-purple text-white border-poy-purple'
                : 'bg-poy-gray-100 text-poy-gray-700 border-gray-200 hover:border-poy-purple'
            }`}
          >
            {cat.CategoryName}
          </button>
        ))}
      </div>

      {/* ── Results Count ────────────────────────────────────────────────────── */}
      <div className="flex items-baseline justify-between mb-8 pb-2 border-b border-gray-200">
        <h2 className="font-domaine text-2xl text-poy-gray-900">
          {activeCategory ? `${activeCategory.CategoryName} Recipes` : 'Latest Creations'}
        </h2>
        {pagination.total != null && (
          <span className="font-arvo text-xs text-poy-gray-500 uppercase tracking-widest font-bold">
            {pagination.total} {pagination.total === 1 ? 'Recipe' : 'Recipes'}
          </span>
        )}
      </div>

      {/* ── Recipe Cards Grid ────────────────────────────────────────────────── */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square bg-poy-gray-100 animate-pulse" />
          ))}
        </div>
      ) : recipes.length === 0 ? (
        <div className="text-center py-16 bg-poy-gray-50 border border-gray-200">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-serif text-poy-gray-600 text-lg mb-2">No matching recipes found.</p>
          <p className="font-sans text-xs text-poy-gray-400 mb-6">Try searching for a different term or clearing your category filter.</p>
          <button onClick={() => { setSearch(''); selectCategory(null); }} className="btn-poy-purple">
            View All Recipes
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {recipes.map((r) => (
              <RecipeCard key={r.RecipeID} recipe={r} />
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-12 pt-6 border-t border-gray-200">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="btn-poy-dark text-xs py-2.5 px-4 disabled:opacity-40"
              >
                ← Prev
              </button>
              <span className="font-arvo text-xs text-poy-gray-600 uppercase tracking-widest font-bold">
                Page {page} of {pagination.pages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
                disabled={page === pagination.pages}
                className="btn-poy-dark text-xs py-2.5 px-4 disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
