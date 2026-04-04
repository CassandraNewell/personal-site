import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF6F1",
        sand: "#E8DFD4",
        clay: "#C4A882",
        terracotta: "#C67B5C",
        bark: "#5C4033",
        forest: "#4A5D4A",
        sage: "#8B9E7E",
        moss: "#6B7F5E",
        charcoal: "#2D2A26",
        warm: {
          50: "#FDFBF7",
          100: "#FAF6F1",
          200: "#F0E6D6",
          300: "#E0D0B8",
          400: "#C4A882",
          500: "#A8895C",
          600: "#8B6F42",
          700: "#6E562F",
          800: "#5C4033",
          900: "#3D2B1F",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
