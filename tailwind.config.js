const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: "#ddd",
      outline: "hsl(217, 16%, 45%)",
      "score-text": "hsl(229, 64%, 46%)",
      "dark-text": "hsl(229, 25%, 31%)",
    },
  },
  plugins: [],
};
