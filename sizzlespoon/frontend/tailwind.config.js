/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'poy-purple': '#734060',
        'poy-purple-dark': '#5e324e',
        'poy-purple-light': '#ddc5d8',
        'poy-purple-bg': '#f9f3f7',
        'poy-yellow': '#edb654',
        'poy-yellow-hover': '#dda33e',
        'poy-slate': '#666677',
        'poy-slate-dark': '#525263',
        'poy-gray-50': '#fafafa',
        'poy-gray-100': '#f7f7f7',
        'poy-gray-200': '#efefef',
        'poy-gray-300': '#e5e5e5',
        'poy-gray-400': '#b0b0b0',
        'poy-gray-500': '#808080',
        'poy-gray-600': '#666666',
        'poy-gray-700': '#4d4d4d',
        'poy-gray-800': '#2c2c2c',
        'poy-gray-900': '#1a1a1a',
        brand: {
          500: '#734060',
          600: '#5e324e',
          700: '#4c263e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Bitter', 'Georgia', 'serif'],
        domaine: ['"Playfair Display"', 'Georgia', 'serif'],
        arvo: ['Arvo', 'Georgia', 'serif'],
        script: ['Caveat', 'cursive'],
      },
      letterSpacing: {
        'extra-wide': '0.15em',
        'giant': '0.22em',
      },
    },
  },
  plugins: [],
};
