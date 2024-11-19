/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'hero-background-color': {'max': '339px'},
        'pop-up-options-lg': {'min': '768px'},
        'pop-up-options-sm': {'max': '767px'},
      }
    },
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: ["light", "dark"],
    styled: true, 
    utils: true,
  }
}