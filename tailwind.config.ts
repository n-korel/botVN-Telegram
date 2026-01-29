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
        "novel-dark": "rgb(15 23 42 / <alpha-value>)",
        "novel-darker": "rgb(2 6 23 / <alpha-value>)",
        "novel-accent": "rgb(212 175 55 / <alpha-value>)",
        "novel-accent-dark": "rgb(51 65 85 / <alpha-value>)",
        "novel-text": "rgb(232 230 227 / <alpha-value>)",
        "novel-text-dim": "rgb(184 181 176 / <alpha-value>)",
      },
      fontFamily: {
        serif: ["Crimson Pro", "serif"],
        display: ["Cinzel", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in",
        "slide-up": "slideUp 0.6s ease-out",
        glow: "glow 2s ease-in-out infinite",
        shimmer: "shimmer 3s infinite linear",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212, 175, 55, 0.3)" },
          "50%": {
            boxShadow:
              "0 0 40px rgba(212, 175, 55, 0.5), 0 0 60px rgba(212, 175, 55, 0.3)",
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
