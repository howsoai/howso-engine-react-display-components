import type { Meta, StoryObj } from "@storybook/react";
import { FeatureAttributeSubtypeField } from "./FeatureAttributeSubtypeField";
import { getFormProviderDecorator } from "@/storybook";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FeatureAttributeSubtypeField> = {
  component: FeatureAttributeSubtypeField,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  decorators: [getFormProviderDecorator()],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  args: {
    featureType: "nominal",
    nonSensitive: false,
  },
};

export default meta;
type Story = StoryObj<typeof FeatureAttributeSubtypeField>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const String: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    dataType: "string",
  },
};

export const Number: Story = {
  args: {
    dataType: "number",
  },
};
