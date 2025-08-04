/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'shadow-[0_0_60px_rgba(34,197,94,0.5)]',
    'shadow-[0_0_60px_rgba(59,130,246,0.5)]',
    'shadow-[0_0_60px_rgba(250,204,21,0.5)]',
    'shadow-[0_0_60px_rgba(239,68,68,0.5)]',
    'shadow-[0_0_35px_rgba(128,90,213,0.5)]', // Efeito no formulário
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
