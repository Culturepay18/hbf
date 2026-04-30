import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hbf: {
          green: "#2E7D32",
          "green-light": "#4CAF50",
          orange: "#F57C00",
          "orange-light": "#FF9800",
          brown: "#5D4037",
          cream: "#FFF8F1",
          dark: "#1A1A1A",
        },
      },
      boxShadow: {
        soft: "0 4px 24px rgba(0,0,0,0.08)",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
      },
      transitionTimingFunction: {
        hbf: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
};

export default config;
