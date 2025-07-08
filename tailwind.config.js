/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/views/**/*.ejs",
    "./public/**/*.{html,js,css}",
    "./*.html"
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#00296b',
        'primary': '#003f88',
        'primary-light': '#00509d',
        'accent': '#fdc500',
        'accent-light': '#ffd500',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
} 