/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...defaultTheme.colors,

        amber: "#db6b51",

        white: "#FCFCFC",
        black: "#030301",
        yellow: "#F0CF65",
        lemon: "#DB8865",
        flax: "#F7F3E3",

        btnprimary: "#C25339",
        btnhover: "#CA8448",
        green: {
          700: "#15803D",
          100: "#DCFCE7",
        },
        red: {
          700: "#DC2626",
          100: "#FEE2E2",
        },
        yellow: {
          100: "#FEF9C3",
          700: "#EAB308",
        },
      },
    },
  },
  variants: {
    fill: ["hover", "focus"],
  },
  plugins: [require("@tailwindcss/typography")],
};
