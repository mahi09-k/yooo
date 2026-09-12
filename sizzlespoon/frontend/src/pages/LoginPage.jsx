import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigate('/profile');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="section-poy max-w-md py-16">
      <div className="text-center mb-8 pb-4 border-b border-gray-200">
        <span className="font-arvo text-xs uppercase tracking-giant text-poy-purple font-bold block mb-1">
          Welcome Back
        </span>
        <h1 className="font-domaine text-4xl text-poy-gray-900 mb-2">Sign In</h1>
        <p className="font-serif text-sm text-poy-gray-500">
          Access your saved recipes, reviews, and favorites.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-sans">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-poy-gray-50 border border-gray-200 p-8 space-y-6 shadow-sm">
        <div>
          <label className="block font-arvo text-xs uppercase tracking-widest text-poy-gray-700 font-bold mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="input-poy"
            required
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-1.5">
            <label className="block font-arvo text-xs uppercase tracking-widest text-poy-gray-700 font-bold">
              Password
            </label>
            <span className="font-serif italic text-[11px] text-poy-purple">
              "You can definitely use your bank password 😉"
            </span>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="•••••••• (bank passwords accepted)"
            className="input-poy"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-poy-purple w-full py-3.5 text-xs"
        >
          {loading ? 'Signing In…' : 'Sign In'}
        </button>

        <p className="text-center font-serif text-xs text-poy-gray-500 pt-2">
          Don't have an account?{' '}
          <Link to="/register" className="text-poy-purple font-bold hover:underline">
            Join Free
          </Link>
        </p>
      </form>
    </div>
  );
}
