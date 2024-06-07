import type { Meta, StoryObj } from "@storybook/react";
import { FeatureAttributeObservationalErrorField } from "./FeatureAttributeObservationalErrorField";
import { getFormProviderDecorator } from "@/storybook";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FeatureAttributeObservationalErrorField> = {
  component: FeatureAttributeObservationalErrorField,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  decorators: [getFormProviderDecorator()],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof FeatureAttributeObservationalErrorField>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const ContinuousNumber: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    featureType: "continuous",
    dataType: "number",
  },
};

export const ContinuousString: Story = {
  args: {
    featureType: "continuous",
    dataType: "string",
  },
};

export const NominalNumber: Story = {
  args: {
    featureType: "nominal",
    dataType: "number",
  },
};

export const NominalString: Story = {
  args: {
    featureType: "nominal",
    dataType: "string",
  },
};

export const OrdinalNumber: Story = {
  args: {
    featureType: "ordinal",
    dataType: "number",
  },
};

export const OrdinalString: Story = {
  args: {
    featureType: "ordinal",
    dataType: "string",
  },
};
