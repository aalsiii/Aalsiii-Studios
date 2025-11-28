/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'void': '#050505',
        'charcoal': '#0a0a0a',
        'gold-accent': '#C5A059',
        'glass': 'rgba(255, 255, 255, 0.03)'
      },
      fontFamily: {
        'serif': ['"Playfair Display"', 'serif'],
        'display': ['"Cinzel"', 'serif'],
        'sans': ['"Manrope"', 'sans-serif'],
      },
      letterSpacing: {
        'ultra': '0.25em',
      }
    },
  },
  plugins: [],
}
