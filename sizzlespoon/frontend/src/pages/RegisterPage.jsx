import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [form, setForm] = useState({
    Username: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.Password !== form.ConfirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (form.Password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    const result = await register(form.Username.trim(), form.Email.trim(), form.Password);
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
          Join Our Community
        </span>
        <h1 className="font-domaine text-4xl text-poy-gray-900 mb-2">Create Account</h1>
        <p className="font-serif text-sm text-poy-gray-500">
          Save your favorite recipes, leave reviews, and share your cooking.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-sans">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-poy-gray-50 border border-gray-200 p-8 space-y-5 shadow-sm">
        <div>
          <label className="block font-arvo text-xs uppercase tracking-widest text-poy-gray-700 font-bold mb-2">
            Chef Username
          </label>
          <input
            type="text"
            name="Username"
            value={form.Username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="input-poy"
            required
          />
        </div>

        <div>
          <label className="block font-arvo text-xs uppercase tracking-widest text-poy-gray-700 font-bold mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="Email"
            value={form.Email}
            onChange={handleChange}
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
            name="Password"
            value={form.Password}
            onChange={handleChange}
            placeholder="Minimum 6 characters (or your bank password)"
            className="input-poy"
            required
          />
        </div>

        <div>
          <label className="block font-arvo text-xs uppercase tracking-widest text-poy-gray-700 font-bold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            name="ConfirmPassword"
            value={form.ConfirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className="input-poy"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-poy-purple w-full py-3.5 text-xs"
        >
          {loading ? 'Creating Account…' : 'Join SizzleSpoon'}
        </button>

        <p className="text-center font-serif text-xs text-poy-gray-500 pt-2">
          Already have an account?{' '}
          <Link to="/login" className="text-poy-purple font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
