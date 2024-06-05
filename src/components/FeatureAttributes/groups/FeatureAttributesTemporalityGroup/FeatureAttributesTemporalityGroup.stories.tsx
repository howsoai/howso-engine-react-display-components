import type { Meta, StoryObj } from "@storybook/react";
import { getFormProviderDecorator } from "@/storybook";
import { FeatureAttributesTemporalityGroup } from "./FeatureAttributesTemporalityGroup";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FeatureAttributesTemporalityGroup> = {
  component: FeatureAttributesTemporalityGroup,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  decorators: [
    getFormProviderDecorator({
      defaultValues: { is_datetime: true },
    }),
  ],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  args: {
    featuresHaveTimeFeature: true,
    featureType: "continuous",
    isAdvancedOpen: true,
  },
};

export default meta;
type Story = StoryObj<typeof FeatureAttributesTemporalityGroup>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {},
};

export const TimeFeature: Story = {
  args: {
    isTimeFeature: true,
    timeSeriesType: "delta",
  },
};

export const RateFeature: Story = {
  args: {
    timeSeriesType: "rate",
  },
};

export const IdRateFeature: Story = {
  args: {
    timeSeriesType: "rate",
    isIdFeature: true,
  },
};
