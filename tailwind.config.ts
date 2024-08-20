import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
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
