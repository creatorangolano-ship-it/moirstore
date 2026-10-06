/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F9F8F6",
        luxury: {
          dark: "#111111",
          graphite: "#4A4A4A",
          gold: "#C5A880",
          champagne: "#D4C5B9",
          cream: "#F9F8F6",
          border: "#EAE7E2",
          card: "#FFFFFF",
          // Dark mode surfaces
          "dark-bg": "#0D0D0D",
          "dark-card": "#171717",
          "dark-border": "#2B2824",
          "dark-gold": "#D4AF37",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
    },
  },
  plugins: [],
};
