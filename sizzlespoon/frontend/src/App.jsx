import { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// ── Layout ─────────────────────────────────────────────────────────────────────
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// ── Pages ──────────────────────────────────────────────────────────────────────
import HomePage         from './pages/HomePage';
import CategoriesPage   from './pages/CategoriesPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import ProfilePage      from './pages/ProfilePage';
import LoginPage        from './pages/LoginPage';
import RegisterPage     from './pages/RegisterPage';
import SubmitRecipePage from './pages/SubmitRecipePage';

// ── Error Boundary ─────────────────────────────────────────────────────────────
class AppErrorBoundary extends Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('AppErrorBoundary caught:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center font-serif">
          <span className="text-5xl mb-4">🍳</span>
          <h1 className="font-domaine text-3xl text-poy-gray-900 mb-2">Something went wrong</h1>
          <p className="text-poy-gray-600 text-sm max-w-md mb-6">
            We ran into an unexpected issue while displaying this page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-poy-purple"
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ── Protected Route Guard ──────────────────────────────────────────────────────
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <AppErrorBoundary>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />

        <main className="flex-1">
          <Routes>
            {/* Public routes */}
            <Route path="/"             element={<HomePage />} />
            <Route path="/categories"   element={<CategoriesPage />} />
            <Route path="/recipes/:id"  element={<RecipeDetailPage />} />
            <Route path="/login"        element={<LoginPage />} />
            <Route path="/register"     element={<RegisterPage />} />

            {/* Protected routes */}
            <Route path="/profile" element={
              <ProtectedRoute><ProfilePage /></ProtectedRoute>
            } />
            <Route path="/submit" element={
              <ProtectedRoute><SubmitRecipePage /></ProtectedRoute>
            } />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </AppErrorBoundary>
  );
}
