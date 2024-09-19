import type { Meta, StoryObj } from "@storybook/react";
import { getFormProviderDecorator } from "../../../../storybook";
import { getFeaturesAttributesContextDecorator } from "../../FeaturesAttributesContext/FeaturesAttributesContext.stories.decorators";
import { FeatureAttributeReservedBoundingModeField } from "./FeatureAttributeReservedBoundingModeField";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FeatureAttributeReservedBoundingModeField> = {
  component: FeatureAttributeReservedBoundingModeField,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  decorators: [
    getFormProviderDecorator(),
    getFeaturesAttributesContextDecorator({ purposes: ["core", "synthesis"] }),
  ],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  args: {
    featureType: "continuous",
    dataType: "number",
  },
};

export default meta;
type Story = StoryObj<typeof FeatureAttributeReservedBoundingModeField>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {},
};
