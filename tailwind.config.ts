import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0d1526",
        paper: "#f5f7fa",
        accent: "#1a56db",
        good: "#0f9d58",
        warn: "#d97706",
        bad: "#dc2626",
      },
    },
  },
  plugins: [],
};

export default config;
