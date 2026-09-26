/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef4ff', 100: '#dbe6ff', 200: '#bccffe', 300: '#8facfc',
          400: '#5c85f8', 500: '#3560f0', 600: '#2140e2', 700: '#1c31c4',
          800: '#1c2c9e', 900: '#1c2a7d', 950: '#141a4a',
        },
        ink: { 950: '#05060f', 900: '#0a0d1c', 800: '#10152b' },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Clash Display"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-glow': 'radial-gradient(circle at 50% 0%, rgba(53,96,240,0.25), transparent 60%)',
      },
    },
  },
  plugins: [],
};
