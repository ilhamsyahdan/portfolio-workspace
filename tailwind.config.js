/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: "#0a0a0a",
          50: "#1a1a1a",
          100: "#2a2a2a",
        },
        accent: {
          DEFAULT: "#06b6d4",
          hover: "#0891b2",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
