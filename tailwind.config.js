/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#e07a5f',
          light: '#f28e75',
          dim: 'rgba(224, 122, 95, 0.12)',
        }
      }
    },
  },
  plugins: [],
}
