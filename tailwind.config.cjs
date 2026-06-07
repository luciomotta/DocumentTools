/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Manrope', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(99, 102, 241, 0.15), 0 24px 80px rgba(15, 23, 42, 0.55)'
      }
    }
  },
  plugins: []
};