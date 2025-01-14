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
      colors: {
        primary: {
          light: "#A5327F",
          DEFAULT: "#8256A5",
          dark: "#4b236c",
        },
        secondary: {
          light: "#FEE9FC",
          DEFAULT: "#C8ACD4",
          dark: "#44449C",
        },
        neutral: {
          light: "#FCFDF7",
          dark: "#1c1c1c",
        },
        highlight: "#A5327F",
        background: {
          light: "#FEE9FC",
          dark: "#1c1c1c",
        },
      },
      keyframes: {
        'slide-in-horizontal': {
          '0%': { transform: 'translate(-20px, -20px)', opacity: '0' },
          '100%': { transform: 'translate(0, 0)', opacity: '1' },
        },
        'text-color-change': {
          '0%': { color: '#1c1c1c' },
          '50%': { color: '#A5327F' },
          '100%': { color: '#1c1c1c' },
        },
      },
      animation: {
        'slide-in-horizontal': 'slide-in-horizontal 0.5s ease-out',
        'text-color-change': 'text-color-change 2s infinite',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
