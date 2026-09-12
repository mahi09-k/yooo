import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { to: '/',           label: 'Home' },
    { to: '/categories', label: 'Recipes' },
    { to: '/submit',     label: 'Submit Recipe' },
  ];

  return (
    <header className="relative bg-white z-50">
      {/* ── Top Announcement Banner (Pinch of Yum signature) ────────────────── */}
      {showTopBar && (
        <div className="bg-poy-purple text-white py-2 px-4 flex items-center justify-between min-h-[38px] text-center">
          <div className="flex-1 flex items-center justify-center gap-1.5 font-sans font-bold text-xs uppercase tracking-giant">
            <span className="text-poy-yellow">♥</span>
            <span className="text-poy-purple-light normal-case font-normal font-serif text-sm">
              Our favorite 100% Halal recipes, straight to your kitchen.
            </span>
            <Link to="/categories" className="underline hover:text-poy-yellow ml-1">
              Browse Now
            </Link>
          </div>
          <button
            onClick={() => setShowTopBar(false)}
            aria-label="Close notification"
            className="text-poy-purple-light hover:text-white p-1 text-sm leading-none"
          >
            ✕
          </button>
        </div>
      )}

      {/* ── Main Navigation Bar ─────────────────────────────────────────────── */}
      <div className="border-b border-gray-200">
        <nav
          role="navigation"
          id="global-navigation"
          className="max-w-6xl mx-auto px-4 lg:px-0 py-4 md:pt-7 md:pb-5 flex items-center justify-between"
        >
          {/* Brand Logo - Pinch of Yum Style */}
          <Link to="/" className="flex items-center gap-2 text-decoration-none group">
            <div className="flex flex-col">
              <span className="font-domaine text-3xl sm:text-4xl font-bold tracking-tight text-poy-purple group-hover:opacity-90 transition">
                Sizzle<span className="font-serif italic font-normal text-poy-yellow">Spoon</span>
              </span>
              <span className="font-arvo text-[9px] uppercase tracking-giant text-poy-gray-500 -mt-1">
                100% Halal • Simple &amp; Tasty Recipes
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider transition-colors border-b-[3px] -mb-5 pb-5 ${
                    isActive
                      ? 'border-poy-purple text-poy-gray-900'
                      : 'border-transparent text-poy-gray-900 hover:text-poy-purple'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

            {/* Auth Actions */}
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider transition-colors border-b-[3px] -mb-5 pb-5 ${
                      isActive
                        ? 'border-poy-purple text-poy-gray-900'
                        : 'border-transparent text-poy-gray-900 hover:text-poy-purple'
                    }`
                  }
                >
                  My Profile ({user?.Username})
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 ml-2 font-sans text-xs font-bold uppercase tracking-wider text-poy-gray-500 hover:text-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-poy-gray-900 hover:text-poy-purple border-b-[3px] border-transparent -mb-5 pb-5"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="ml-3 bg-poy-purple text-white px-4 py-2 text-xs font-sans font-bold uppercase tracking-wider hover:bg-poy-purple-dark transition"
                >
                  Join Free
                </Link>
              </>
            )}

            {/* Search Icon */}
            <Link
              to="/categories"
              className="ml-4 p-2 text-poy-gray-900 hover:text-poy-purple transition"
              title="Search recipes"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            className="md:hidden p-2 text-poy-gray-800 hover:text-poy-purple focus:outline-none"
          >
            {menuOpen ? (
              <span className="text-2xl font-bold">✕</span>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 py-4 space-y-3 shadow-lg">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className="block font-sans text-sm font-bold uppercase tracking-wider text-poy-gray-900 hover:text-poy-purple py-2 border-b border-gray-100"
            >
              {label}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="block font-sans text-sm font-bold uppercase tracking-wider text-poy-gray-900 hover:text-poy-purple py-2"
              >
                Profile ({user?.Username})
              </Link>
              <button
                onClick={() => { handleLogout(); setMenuOpen(false); }}
                className="block w-full text-left font-sans text-sm font-bold uppercase tracking-wider text-red-600 py-2"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="pt-2 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="btn-poy-dark text-center"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="btn-poy-purple text-center"
              >
                Join Free
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
