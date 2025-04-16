import { standardFlowbiteTheme } from "@howso/react-tailwind-flowbite-components";
import type { Preview, StoryFn } from "@storybook/react";
import { Flowbite, ThemeMode } from "flowbite-react";
import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Await, RouterProvider, createMemoryRouter } from "react-router-dom";
import { darkBackground, lightBackground } from "./constants";
import i18n from "./i18next";
import { isDarkBackground } from "./utils";
// CSS
import "@fontsource-variable/inter";
import "@fontsource-variable/inter/wght-italic.css";
import "@howso/react-tailwind-flowbite-components/lib/styles.css";
import "./tailwind.css";

const preview: Preview = {
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    backgrounds: {
      // Load them by hand, or make a nice loop if you wish
      values: [lightBackground, darkBackground],
      // Ensure a default is set, so you avoid type errors reading from undefined!
      default: lightBackground.name,
      // Supports globals usage
      options: {
        [lightBackground.name]: lightBackground,
        [darkBackground.name]: darkBackground,
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    i18n,
    initialGlobals: {
      viewport: { value: undefined },
    },
  },
  decorators: [
    (Story: StoryFn, context) => {
      // Flowbite likes to store your preference in local storage, not what we're doing here.
      localStorage.removeItem("flowbite-theme-mode");

      const mode: ThemeMode = isDarkBackground(context) ? "dark" : "light";
      if (mode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      return (
        <Flowbite theme={{ theme: standardFlowbiteTheme, mode }}>
          <Story />
        </Flowbite>
      );
    },
    // Translations
    (Story: StoryFn) => {
      const { ready } = useTranslation();
      return (
        <Suspense>
          <Await resolve={ready}>
            <Story />
          </Await>
        </Suspense>
      );
    },
    // Router
    (Story: StoryFn) => (
      <RouterProvider
        router={createMemoryRouter([{ index: true, Component: Story }])}
      />
    ),
  ],

  tags: ["autodocs"],
};
export default preview;
``;
