import axios from 'axios';

/**
 * Pre-configured Axios instance for all SizzleSpoon API calls.
 *
 * - Base URL points to the Vite dev-proxy (/api → http://localhost:5000/api)
 * - Request interceptor automatically attaches the JWT token from localStorage
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

// ── Request Interceptor: attach JWT + handle FormData uploads ─────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('sizzlespoon_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor: handle 401 safely without disrupting public pages ───
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — clear stale auth
      localStorage.removeItem('sizzlespoon_token');
      localStorage.removeItem('sizzlespoon_user');

      // Only redirect to login if the user is currently on a protected route
      const currentPath = window.location.pathname;
      if (currentPath.startsWith('/profile') || currentPath.startsWith('/submit')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
