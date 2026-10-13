import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#04070c",
          900: "#070c14",
          850: "#0a121d",
          800: "#0e1825",
          700: "#16222f",
        },
        steel: {
          500: "#5d6b7c",
          400: "#7f8c9b",
          300: "#a9b4c0",
          200: "#cfd6de",
        },
        bone: "#eef1f4",
        signal: {
          DEFAULT: "#6cc7e6",
          deep: "#3a9fc4",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      animation: { marquee: "marquee 60s linear infinite" },
    },
  },
  plugins: [],
};
export default config;
