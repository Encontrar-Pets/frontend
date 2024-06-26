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
        'primary-light': '#b7cab4',
        secondary: '#F30E0E',
        tertiary: '#F3EA0E',
        'primary-gray': '#71747B',
        'secondary-gray': '#BFC4D7',
        'tertiary-gray': '#F0F0F0B8',
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

