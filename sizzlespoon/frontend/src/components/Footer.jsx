import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      {/* ── Main Footer Grid ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 lg:px-0 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Left Column: Navigation links & Logo */}
        <div>
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="mb-3 font-arvo uppercase tracking-widest text-xs font-bold text-poy-gray-900">
                SizzleSpoon
              </h4>
              <ul className="space-y-2 text-sm font-serif text-poy-gray-600">
                <li><Link to="/" className="hover:text-poy-purple">Home</Link></li>
                <li><Link to="/categories" className="hover:text-poy-purple">Recipe Index</Link></li>
                <li><Link to="/submit" className="hover:text-poy-purple">Submit Recipe</Link></li>
                <li><Link to="/profile" className="hover:text-poy-purple">My Profile</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 font-arvo uppercase tracking-widest text-xs font-bold text-poy-gray-900">
                Food &amp; Recipes
              </h4>
              <ul className="space-y-2 text-sm font-serif text-poy-gray-600">
                <li><Link to="/categories?search=Dinner" className="hover:text-poy-purple">Dinner Recipes</Link></li>
                <li><Link to="/categories?search=Breakfast" className="hover:text-poy-purple">Breakfast &amp; Brunch</Link></li>
                <li><Link to="/categories?search=Vegetarian" className="hover:text-poy-purple">Vegetarian Dishes</Link></li>
                <li><Link to="/categories?search=Dessert" className="hover:text-poy-purple">Sweet Treats</Link></li>
              </ul>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-3 mb-8">
            {['Instagram', 'Pinterest', 'TikTok', 'Facebook', 'YouTube'].map((net) => (
              <span
                key={net}
                title={net}
                className="w-9 h-9 bg-poy-purple text-white rounded-full flex items-center justify-center font-bold text-xs hover:bg-poy-gray-700 transition cursor-pointer"
              >
                {net[0]}
              </span>
            ))}
          </div>

          {/* Brand Signature */}
          <div className="border-t border-gray-100 pt-6">
            <span className="font-domaine text-2xl font-bold text-poy-purple block mb-1">
              Sizzle<span className="font-serif italic text-poy-yellow font-normal">Spoon</span>
            </span>
            <p className="font-sans text-xs text-poy-gray-400">
              &copy; {new Date().getFullYear()} SizzleSpoon. All rights reserved. Fresh, flavorful recipes made for everyday life.
            </p>
          </div>
        </div>

        {/* Right Column: Purple Email Signup Box (Pinch of Yum signature) */}
        <div>
          <div className="bg-poy-purple p-8 text-center text-white mb-8">
            <p className="font-arvo uppercase tracking-widest text-xs font-bold mb-2 text-poy-purple-light">
              Sign up for Email Updates
            </p>
            <h3 className="font-domaine text-2xl text-white mb-2">
              Free Top 25 Recipe Collection
            </h3>
            <p className="font-serif text-xs text-white/80 mb-6 leading-relaxed">
              Get our most-loved recipes, seasonal meal plans, and weeknight cooking tips sent directly to your inbox.
            </p>
            <div className="flex max-w-sm mx-auto">
              <input
                type="email"
                placeholder="Your email address…"
                className="px-4 py-2.5 text-sm text-poy-gray-900 outline-none w-full"
              />
              <button
                type="button"
                onClick={() => alert('Welcome to SizzleSpoon updates!')}
                className="bg-poy-yellow text-poy-gray-900 font-sans font-bold uppercase tracking-wider text-xs px-5 hover:bg-poy-yellow-hover transition"
              >
                Join
              </button>
            </div>
          </div>

          {/* Other Information */}
          <div className="text-center font-sans text-xs text-poy-gray-400 space-x-4">
            <span className="cursor-pointer hover:text-poy-purple">Privacy Policy</span>
            <span>·</span>
            <span className="cursor-pointer hover:text-poy-purple">Terms of Service</span>
            <span>·</span>
            <span className="cursor-pointer hover:text-poy-purple">Contact Us</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
