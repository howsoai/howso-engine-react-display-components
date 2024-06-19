import type { Meta, StoryObj } from "@storybook/react";
import { FeatureAttributeSample } from "./FeatureAttributeSample";
import { getFeaturesAttributesContextDecorator } from "../FeaturesAttributesContext/FeaturesAttributesContext.stories.decorators";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FeatureAttributeSample> = {
  component: FeatureAttributeSample,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  decorators: [getFeaturesAttributesContextDecorator()],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof FeatureAttributeSample>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    attributes: {
      data_type: "string",
      sample: "The United Kingdom of Great Britain and Northern Ireland",
    },
  },
};

export const JSON: Story = {
  args: {
    attributes: {
      data_type: "json",
      sample: `{
        height: "6\\"2'",
        weight: "174 lbs"
      }`,
    },
  },
};
