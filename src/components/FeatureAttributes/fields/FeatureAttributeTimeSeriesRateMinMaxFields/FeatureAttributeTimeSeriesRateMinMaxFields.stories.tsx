import type { Meta, StoryObj } from "@storybook/react";
import { FeatureAttributeTimeSeriesRateMinMaxFields } from "./FeatureAttributeTimeSeriesRateMinMaxFields";
import { getFormProviderDecorator } from "@/storybook";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FeatureAttributeTimeSeriesRateMinMaxFields> = {
  component: FeatureAttributeTimeSeriesRateMinMaxFields,
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
    timeSeriesType: "rate",
  },
};

export default meta;
type Story = StoryObj<typeof FeatureAttributeTimeSeriesRateMinMaxFields>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {},
};
