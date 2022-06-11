const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    screens: {
      xxs: "320px",
      xs: "425px",
      ...defaultTheme.screens,
    },
    extend: {
      keyframes: {
        blink: {
          "0%, 100%": {
            filter: "brightness(.5)",
          },
          "50%": {
            filter: "brightness(2)",
          },
        },
      },
      animation: {
        blink: "blink 1.5s linear infinite",
        bounce_fast: "bounce .7s infinite;",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        stencil_one: ["Saira Stencil One", "cursive"],
      },
    },
  },
  plugins: [],
};
