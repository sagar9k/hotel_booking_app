/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "20px 20px 60px #bebebe, -20px -20px 60px #ffffff",
      },
      animation: {
        "blob-bounce": "blob-bounce 5s infinite ease",
      },
      keyframes: {
        "blob-bounce": {
          "0%": {
            transform: "translate(-100%, -100%) translate3d(0, 0, 0)",
          },
          "25%": {
            transform: "translate(-100%, -100%) translate3d(100%, 0, 0)",
          },
          "50%": {
            transform: "translate(-100%, -100%) translate3d(100%, 100%, 0)",
          },
          "75%": {
            transform: "translate(-100%, -100%) translate3d(0, 100%, 0)",
          },
          "100%": {
            transform: "translate(-100%, -100%) translate3d(0, 0, 0)",
          },
        },
      },
      colors: {
        "red-500": "#ff0000",
      },
    },
  },
};
