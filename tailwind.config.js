/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {  inset: {
      '5/100': '5%',
      '55/100': '55%',
    },},
  },
  plugins: [
   
  ],
}

