/** @type {import('tailwindcss').Config} */
module.exports = {
  purse: ['./src/**/*.{js,ts,jsx,tsx}'],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      'broken-console': ['Broken Console', 'Helvetica', 'Arial', 'sans-serif'],
      'satoshi-regular': ['satoshiregular', 'Helvetica', 'Arial', 'sans-serif'],
      'satoshi-medium': ['satoshimedium', 'Helvetica', 'Arial', ' sans-serif'],
      'satoshi-bold': ['satoshibold', 'Helvetica', 'Arial', ' sans-serif'],
      'satoshi-black': ['satoshiblack', 'Helvetica', 'Arial', ' sans-serif'],
      'dogicapixel-bold': [
        'dogica_pixelbold',
        'Helvetica',
        'Arial',
        ' sans-serif'
      ],
      dogicapixel: ['dogica_pixelregular', 'Helvetica', 'Arial', ' sans-serif']
    },
    extend: {
      colors: {
        blue: {
          from: '#0C9DE6',
          to: '#0070FF',
          default: '#0C9DE6',
          shadow: '#7796ff',
          border: '#3D65EF'
        },
        red: {
          from: '#E65D5D',
          to: '#ED3030',
          default: '#EC2F2F',
          shadow: '#EC2F2F',
          border: '#EC2F2F'
        },
        green: {
          from: '#0CBE79',
          to: '#17C582',
          default: '#27DE7F',
          shadow: '#00C076'
        },
        binance: {
          default: '#fcd535'
        },
        polygon: {
          default: '#8247e5'
        },
        gray: {
          default: '#98A0B5',
          100: '#ffffff80',
          200: '#5B606F',
          300: '#5E6679',
          400: '#5B6070',
          500: '#353945',
          600: '#282D3B',
          700: '#222531',
          800: '#1D2029',
          900: '#14161E'
        }
      }
    }
  },
  plugins: []
};
