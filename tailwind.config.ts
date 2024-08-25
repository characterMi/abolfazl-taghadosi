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
      // "smart-watch": "340px",
      xss: "420px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        pink: "#ff98a2",
      },
      backgroundImage: {
        background: "url(/images/background.webp)",
      },
    },
  },
  plugins: [],
};
export default config;
