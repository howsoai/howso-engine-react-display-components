import type { Meta, StoryObj } from "@storybook/react";
import { getFormProviderDecorator } from "../../../../storybook";
import { getFeaturesAttributesContextDecorator } from "../../FeaturesAttributesContext/FeaturesAttributesContext.stories.decorators";
import { FeatureAttributeUniqueField } from "./FeatureAttributeUniqueField";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FeatureAttributeUniqueField> = {
  component: FeatureAttributeUniqueField,
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
    featureType: "nominal",
  },
};

export default meta;
type Story = StoryObj<typeof FeatureAttributeUniqueField>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    dataType: "string",
  },
};
