/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pastel-pink': '#FFB3D9',
        'pastel-blue': '#ADD8E6',
        'pastel-yellow': '#FFFFE0',
        'pastel-green': '#B3E5B3',
        'pastel-purple': '#D8BFD8',
        'pastel-peach': '#FFDAB9',
        'pastel-mint': '#B3E5E0',
      },
      borderRadius: {
        'receipt': '8px',
      },
      boxShadow: {
        'receipt': '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
