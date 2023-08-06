/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'match-orange': '#FFB592',
        navdark: '#1F2833',
        navlight: '#F0F8FF',
        'match-register': '#bc84fc',
      },
      screens: {
        md: '762px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-fontawesome'),
  ],
};
