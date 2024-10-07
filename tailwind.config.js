import { standardTailwindConfigThemeExtend } from "@howso/react-tailwind-flowbite-components";
import twContainerQueries from "@tailwindcss/container-queries";
import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    flowbite.content(),
    "./src/**/*.{js,ts,jsx,tsx}",
    "./storybook/**/*.{jsx,tsx,html}",
    "./node_modules/@howso/react-tailwind-flowbite-components/lib/index.esm.js",
  ],
  plugins: [flowbite.plugin({ charts: true }), twContainerQueries],
  theme: {
    extend: standardTailwindConfigThemeExtend,
  },
};
