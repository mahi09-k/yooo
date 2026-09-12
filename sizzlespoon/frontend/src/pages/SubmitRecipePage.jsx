import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function SubmitRecipePage() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    Title: '',
    Ingredients: '',
    CookingSteps: '',
    CategoryID: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/categories').then(({ data }) => setCategories(data.data)).catch(() => {});
  }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.Title.trim() || !form.Ingredients.trim() || !form.CookingSteps.trim()) {
      setError('Recipe title, ingredients, and cooking steps are required.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('Title', form.Title.trim());
      formData.append('Ingredients', form.Ingredients.trim());
      formData.append('CookingSteps', form.CookingSteps.trim());
      if (form.CategoryID) formData.append('CategoryID', form.CategoryID);
      if (imageFile) formData.append('image', imageFile);

      const { data } = await api.post('/recipes', formData);
      navigate(`/recipes/${data.data.RecipeID}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit recipe. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-poy max-w-2xl py-12">
      <div className="text-center mb-8 pb-4 border-b border-gray-200">
        <span className="font-arvo text-xs uppercase tracking-giant text-poy-purple font-bold block mb-1">
          Share Your Kitchen Creation
        </span>
        <h1 className="font-domaine text-4xl text-poy-gray-900 mb-2">
          Submit a Recipe
        </h1>
        <p className="font-serif text-poy-gray-600 text-sm">
          Publish your favorite home recipe for the SizzleSpoon community.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-sans">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-poy-gray-50 border border-gray-200 p-8 space-y-6 shadow-sm">

        {/* Recipe Title */}
        <div>
          <label className="block font-arvo text-xs uppercase tracking-widest text-poy-gray-700 font-bold mb-2">
            Recipe Title <span className="text-poy-purple">*</span>
          </label>
          <input
            type="text"
            name="Title"
            value={form.Title}
            onChange={handleChange}
            placeholder="Give your recipe a memorable title"
            className="input-poy"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-arvo text-xs uppercase tracking-widest text-poy-gray-700 font-bold mb-2">
            Meal Category
          </label>
          <select
            name="CategoryID"
            value={form.CategoryID}
            onChange={handleChange}
            className="input-poy cursor-pointer"
          >
            <option value="">— Select a category —</option>
            {categories.map((c) => (
              <option key={c.CategoryID} value={c.CategoryID}>{c.CategoryName}</option>
            ))}
          </select>
        </div>

        {/* Ingredients */}
        <div>
          <label className="block font-arvo text-xs uppercase tracking-widest text-poy-gray-700 font-bold mb-1">
            Ingredients <span className="text-poy-purple">*</span>
          </label>
          <p className="font-serif text-xs text-poy-gray-400 mb-2">
            Enter one ingredient per line with measurements.
          </p>
          <textarea
            name="Ingredients"
            value={form.Ingredients}
            onChange={handleChange}
            rows={6}
            placeholder={"- Ingredient 1 with quantity\n- Ingredient 2 with quantity\n- Seasonings to taste"}
            className="input-poy font-mono text-sm leading-relaxed"
            required
          />
        </div>

        {/* Cooking Steps */}
        <div>
          <label className="block font-arvo text-xs uppercase tracking-widest text-poy-gray-700 font-bold mb-1">
            Cooking Instructions <span className="text-poy-purple">*</span>
          </label>
          <p className="font-serif text-xs text-poy-gray-400 mb-2">
            Enter step-by-step cooking directions, one per line.
          </p>
          <textarea
            name="CookingSteps"
            value={form.CookingSteps}
            onChange={handleChange}
            rows={8}
            placeholder={"1. First step of preparation\n2. Cooking method & temperature\n3. Rest, garnish & serving instructions"}
            className="input-poy text-sm leading-relaxed"
            required
          />
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block font-arvo text-xs uppercase tracking-widest text-poy-gray-700 font-bold mb-2">
            Recipe Photograph
          </label>
          <div className="border-2 border-dashed border-gray-300 bg-white p-6 text-center hover:border-poy-purple transition relative cursor-pointer">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImage}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {preview ? (
              <img src={preview} alt="Preview" className="max-h-56 mx-auto object-cover shadow" />
            ) : (
              <div className="space-y-1">
                <p className="text-3xl">📷</p>
                <p className="font-serif text-sm text-poy-gray-700">Click or drag to upload a food photo</p>
                <p className="font-sans text-[11px] text-poy-gray-400">JPG, PNG, or WEBP (Max 5 MB)</p>
              </div>
            )}
          </div>
          {preview && (
            <button
              type="button"
              onClick={() => { setImageFile(null); setPreview(null); }}
              className="mt-2 text-xs font-sans text-red-500 hover:text-red-700"
            >
              Remove image
            </button>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="btn-poy-purple w-full py-4 text-sm"
        >
          {loading ? 'Publishing Recipe…' : 'Publish Recipe'}
        </button>
      </form>
    </div>
  );
}
