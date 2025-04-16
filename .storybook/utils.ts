import { StoryContext } from "@storybook/react";
import { darkBackground } from "./constants";

export const isDarkBackground = (context: StoryContext<any>): boolean =>
  context.globals?.backgrounds?.value === darkBackground.name ||
  context.userGlobals?.backgrounds?.value === darkBackground.name;
