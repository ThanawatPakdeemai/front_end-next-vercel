/** @type {import('tailwindcss').Config} */
module.exports = {
  purse: ['./src/**/*.{js,ts,jsx,tsx}'],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
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
      dogicapixel: ['dogica_pixelregular', 'Helvetica', 'Arial', ' sans-serif'],
      roboto: ['Roboto', 'Helvetica', 'Arial', 'sans-serif']
    },
    extend: {}
  },
  plugins: []
};
