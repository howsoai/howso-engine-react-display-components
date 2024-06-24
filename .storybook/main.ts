import type { StorybookConfig } from "@storybook/react-vite";
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@chromatic-com/storybook"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {},
  staticDirs: ["../public"], //👈 Configures the static asset folder in Storybook
  refs: {
    "react-tailwind-flowbite-components": {
      title: "Howso components",
      url: "https://main--65e891231e1f8c382a2b9636.chromatic.com",
      expanded: false, // Optional, true by default
    },
    flowbite: {
      title: "Flowbite",
      url: "https://storybook.flowbite-react.com/",
      expanded: false, // Optional, true by default
    },
  },
};
export default config;
