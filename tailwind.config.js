/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    screens: {
      'sm': { 'min': '640px', 'max': '767px' },
      'md': { 'min': '768px', 'max': '1023px' },
      'lg': { 'min': '1024px', 'max': '1279px' },
      'xl': { 'min': '1280px', 'max': '1535px' },
      '2xl': { 'min': '1536px' },
    },
    extend: {
      colors: {
        primary: '#60815C',
        secondary: '#F30E0E',
        tertiary: '#F3EA0E',
        'primary-gray': '#757575',
        'secondary-gray': '#E0E0E0',
        'tertiary-gray': '#F5F5F5',
        'primary-red': '#D16767',
        'secondary-red': '#D1676780',
        'primary-yellow': '#FFCF6F',
        'secondary-yellow': '#F3EA0E',
        'primary-green': '#6CB28E',
        'secondary-green': '#61E597',
      },
    },
  },
  plugins: [],
}

