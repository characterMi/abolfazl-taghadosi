import type { Config } from "tailwindcss";

const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "smart-watch": "340px",
      xss: "440px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        primary: "#56ccf2",
        "light-blue": "#b6edff",
        "dark-blue": "#32a2c7",
      },
      backgroundImage: {
        background: "url(/images/background.webp)",
      },
    },
  },
  plugins: [],
};
export default config;
