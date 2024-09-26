import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/clients/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/products/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/public/**/*.html",
    flowbite.content()
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
        paletteColor5: "var(--palette-color5)",
        secondary1: "var(--secondary1)",
        secondary2: "var(--secondary2)",
        secondary3: "var(--secondary3)",
        secondary4: "var(--secondary4)",
        secondary5: "var(--secondary5)"
      }
    }
  },
  plugins: [flowbite.plugin()]
};
export default config;
