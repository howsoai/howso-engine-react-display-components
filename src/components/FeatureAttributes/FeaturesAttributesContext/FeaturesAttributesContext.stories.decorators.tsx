import { Decorator } from "@storybook/react";
import {
  FeaturesAttributesContextProvider,
  FeaturesAttributesContextProviderProps,
} from "./FeaturesAttributesContext";

export const getFeaturesAttributesContextDecorator =
  (
    props?: Omit<FeaturesAttributesContextProviderProps, "children">,
  ): Decorator =>
  (Story) => {
    return (
      <FeaturesAttributesContextProvider purposes={["core"]} {...props}>
        <Story />
      </FeaturesAttributesContextProvider>
    );
  };
