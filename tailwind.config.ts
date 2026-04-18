import type { Config } from "tailwindcss";

// Tailwind v4: theme tokens live in globals.css (@theme block).
// This file only declares content paths for class detection.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx,mdx,json}",
  ],
};

export default config;
