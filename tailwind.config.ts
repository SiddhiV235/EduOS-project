import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        surface: {
          base: "#0a0a0f",
          1: "#0f0f17",
          2: "#14141e",
          3: "#1a1a26",
          4: "#1f1f2e",
          border: "#ffffff0d",
          "border-hover": "#ffffff1a",
        },
        accent: {
          violet: "#7c6ff7",
          "violet-dim": "#5b55c4",
          cyan: "#22d3ee",
          "cyan-dim": "#0891b2",
          emerald: "#34d399",
          amber: "#fbbf24",
          rose: "#f43f5e",
        },
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "streak-appear": {
          "0%": { transform: "scaleX(0)", opacity: "0" },
          "100%": { transform: "scaleX(1)", opacity: "1" },
        },
        "progress-fill": {
          "0%": { width: "0%" },
        },
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        "pulse-slow": "pulse-slow 2s ease-in-out infinite",
        "streak-appear": "streak-appear 0.4s ease-out forwards",
        "progress-fill": "progress-fill 1.2s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
