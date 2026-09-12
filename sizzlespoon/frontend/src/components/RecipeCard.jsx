import { Link } from 'react-router-dom';

/**
 * RecipeCard — Pinch of Yum Signature Card Style:
 * - Square or 4:5 vertical food photograph
 * - Golden-yellow pill tag overlapping the bottom border of the photo
 * - Elegant serif title (Playfair Display / Domaine vibe)
 * - Review count & rating below
 */
export default function RecipeCard({ recipe, variant = 'standard' }) {
  const {
    RecipeID,
    Title,
    ImageURL,
    AuthorName,
    CategoryName,
    AvgRating,
    RatingCount,
    CreatedAt,
  } = recipe;

  if (variant === 'horizontal') {
    // Used in "The Latest & Greatest" 2-column feed
    return (
      <article className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-b border-gray-200 group">
        <div className="sm:col-span-1 overflow-hidden">
          <Link to={`/recipes/${RecipeID}`} className="block aspect-square bg-poy-gray-100 overflow-hidden">
            {ImageURL ? (
              <img
                src={ImageURL}
                alt={Title}
                className="w-full h-full object-cover group-hover:opacity-85 transition-opacity duration-300"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl">🍽️</div>
            )}
          </Link>
        </div>
        <div className="sm:col-span-2 flex flex-col justify-between py-1">
          <div>
            <span className="font-arvo text-[10px] text-poy-gray-500 uppercase tracking-giant block mb-1">
              {CreatedAt ? new Date(CreatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recent'}
              {CategoryName && ` · ${CategoryName}`}
            </span>
            <h2 className="font-domaine text-2xl sm:text-3xl text-poy-gray-900 leading-tight mb-2">
              <Link to={`/recipes/${RecipeID}`} className="hover:underline">
                {Title}
              </Link>
            </h2>
            <p className="text-poy-gray-600 text-sm font-serif line-clamp-2 mb-3">
              By <span className="font-semibold">{AuthorName || 'Chef'}</span>. Delicious, tested, and made for real everyday cooking.
            </p>
          </div>
          <div>
            <Link
              to={`/recipes/${RecipeID}`}
              className="inline-block font-sans uppercase font-bold text-xs tracking-widest text-poy-yellow hover:text-poy-gray-900 transition-colors"
            >
              Continue Reading →
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // Standard vertical card (used in 4-column grids and category showcases)
  return (
    <article className="text-center group flex flex-col">
      <Link to={`/recipes/${RecipeID}`} className="block flex flex-col h-full">
        {/* Photo Container */}
        <div className="overflow-hidden aspect-square bg-poy-gray-100">
          {ImageURL ? (
            <img
              src={ImageURL}
              alt={Title}
              className="w-full h-full object-cover group-hover:opacity-85 transition-opacity duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl">🍽️</div>
          )}
        </div>

        {/* Floating Category Badge */}
        {CategoryName && (
          <p className="relative -mt-3.5 bg-poy-yellow px-4 py-1.5 mx-auto text-white text-[10px] font-sans font-bold uppercase tracking-giant shadow-sm">
            {CategoryName}
          </p>
        )}

        {/* Title */}
        <h3 className="pt-3 pb-1 font-domaine text-xl md:text-2xl text-poy-gray-900 leading-tight group-hover:underline">
          {Title}
        </h3>

        {/* Rating Stars */}
        <div className="mt-auto pt-1 pb-3 flex items-center justify-center gap-1.5 text-xs">
          {AvgRating ? (
            <>
              <span className="text-poy-yellow text-sm font-serif">★★★★★</span>
              <span className="text-poy-gray-500 font-arvo text-[11px]">
                ({RatingCount})
              </span>
            </>
          ) : (
            <span className="text-poy-gray-400 font-sans text-[11px] uppercase tracking-wider">New</span>
          )}
        </div>
      </Link>
    </article>
  );
}
