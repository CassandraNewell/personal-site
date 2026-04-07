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
        /* Raw palette */
        "peach-fuzz": "#f7c4a5",
        "cool-steel": "#88a0a8",
        "dusty-mauve": "#9e7682",
        "vintage-grape": "#605770",
        "vintage-grape-2": "#4d4861",

        /* Semantic aliases */
        background: "#fdf7f2",
        surface: "#faf1ea",
        border: "#f7c4a5",       /* peach-fuzz */
        foreground: "#4d4861",    /* vintage-grape-2 */
        primary: "#605770",       /* vintage-grape */
        secondary: "#88a0a8",     /* cool-steel */
        accent: "#9e7682",        /* dusty-mauve */
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
