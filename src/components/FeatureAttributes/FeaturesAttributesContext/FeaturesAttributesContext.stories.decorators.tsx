import { Decorator } from "@storybook/react";
import {
  FeaturesAttributesContextProvider,
  FeaturesAttributesContextProviderProps,
} from "./FeaturesAttributesContext";

export const getFeaturesAttributesContextDecorator =
  (props?: FeaturesAttributesContextProviderProps): Decorator =>
  (Story) => {
    return (
      <FeaturesAttributesContextProvider {...props}>
        <Story />
      </FeaturesAttributesContextProvider>
    );
  };
