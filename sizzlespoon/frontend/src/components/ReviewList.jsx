import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function ReviewList({ recipeId, reviews, onReviewAdded, onReviewDeleted }) {
  const { isAuthenticated, user } = useAuth();
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setLoading(true);
    setError('');
    try {
      await api.post(`/reviews/${recipeId}`, { Comment: comment.trim() });
      setComment('');
      onReviewAdded?.();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post comment.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm('Delete this comment?')) return;
    try {
      await api.delete(`/reviews/${reviewId}`);
      onReviewDeleted?.();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete comment.');
    }
  };

  return (
    <div>
      <div className="flex items-baseline justify-between mb-8 pb-3 border-b border-gray-200">
        <h3 className="font-domaine text-3xl text-poy-gray-900">
          Comments &amp; Reviews
        </h3>
        <span className="font-arvo text-xs uppercase tracking-widest text-poy-gray-400 font-bold">
          {reviews.length} {reviews.length === 1 ? 'Response' : 'Responses'}
        </span>
      </div>

      {/* ── Add Review Form ─────────────────────────────────────────────────── */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mb-12 bg-poy-gray-50 border border-gray-200 p-6">
          <h4 className="font-domaine text-xl text-poy-gray-900 mb-2">Leave a Comment</h4>
          <p className="text-xs font-serif text-poy-gray-500 mb-4">
            Share your thoughts, substitutions, or kitchen tips with fellow cooks!
          </p>

          {error && <p className="mb-3 text-xs text-red-600 font-sans">{error}</p>}

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review here…"
            rows={4}
            className="input-poy mb-4"
            required
          />

          <button type="submit" disabled={loading} className="btn-poy-purple">
            {loading ? 'Posting…' : 'Submit Comment'}
          </button>
        </form>
      ) : (
        <div className="bg-poy-gray-100 border border-gray-200 p-6 mb-10 text-center">
          <p className="font-serif text-sm text-poy-gray-700 mb-3">
            Want to share your review? Sign in to join the conversation.
          </p>
          <Link to="/login" className="btn-poy-purple">
            Sign In to Review
          </Link>
        </div>
      )}

      {/* ── Comments Feed ────────────────────────────────────────────────────── */}
      {reviews.length === 0 ? (
        <p className="font-serif text-poy-gray-400 italic py-6 text-center">
          No comments yet. Be the first to try this recipe and share your feedback!
        </p>
      ) : (
        <ul className="space-y-6">
          {reviews.map((rv) => (
            <li key={rv.ReviewID} className="border-b border-gray-200 pb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-poy-purple text-white flex items-center justify-center font-serif text-xs font-bold">
                    {rv.Username?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <span className="font-domaine text-base font-bold text-poy-gray-900 block">
                      {rv.Username}
                    </span>
                    <span className="font-arvo text-[10px] text-poy-gray-400 uppercase tracking-wider">
                      {new Date(rv.CreatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                {(user?.UserID === rv.UserID || user?.Role === 'admin') && (
                  <button
                    onClick={() => handleDelete(rv.ReviewID)}
                    className="font-sans text-xs uppercase font-bold text-red-500 hover:text-red-700 tracking-wider"
                  >
                    Delete
                  </button>
                )}
              </div>

              <p className="font-serif text-poy-gray-700 text-sm leading-relaxed pl-11">
                {rv.Comment}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
