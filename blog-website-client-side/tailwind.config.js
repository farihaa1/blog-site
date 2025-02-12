/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: "Inter",
        poppins: "Poppins",
      },
      colors: {
        primary: '#5E5AD5',
        text: "#323253",
        base: "#87879B",
        bg:"#F9F8FF",
        black: "#181D14",
        btn1: "#5E5AD5"
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  darkMode: 'class',
}

