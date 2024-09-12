import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/clients/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/public/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        paletteColor1: "var(--palette-color1)",
        paletteColor2: "var(--palette-color2)",
        paletteColor3: "var(--palette-color3)",
        paletteColor4: "var(--palette-color4)",
        paletteColor5: "var(--palette-color5)"
      }
    }
  },
  plugins: []
};
export default config;
