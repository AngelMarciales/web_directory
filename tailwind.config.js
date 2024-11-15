/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary1: '#1A5414',   
        secondary1: '#347D27', 
        primary2: '#BF0413',   
        secondary2: '#8C030E', 
        neutro1: '#000000',   
        neutro2: '#767676', 
        neutro3: '#C2C2C2',   
        neutro4: '#FFFFFF', 
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light"]
  }
}

