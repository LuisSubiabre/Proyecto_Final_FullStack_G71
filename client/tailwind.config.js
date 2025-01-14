import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
        arvo: ["Arvo", "serif"],
        epilogue: ['Epilogue', 'sans-serif'],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
