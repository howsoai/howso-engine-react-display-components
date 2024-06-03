import { standardFlowbiteTheme } from "@howso/react-tailwind-flowbite-components";
import flowbite from "flowbite/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./storybook/**/*.{jsx,tsx,html}",
    "./node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@howso/react-tailwind-flowbite-components/lib/index.esm.js",
  ],
  plugins: [flowbite({ charts: true })],
  theme: {
    extend: standardFlowbiteTheme,
  },
};
