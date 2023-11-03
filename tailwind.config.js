/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#055CA8",
          dark: "#0B1A43",
        },
      },
      fontFamily: {
        sans: ["var(--font-roboto)"],
        condensed: ["var(--font-condensed)"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
