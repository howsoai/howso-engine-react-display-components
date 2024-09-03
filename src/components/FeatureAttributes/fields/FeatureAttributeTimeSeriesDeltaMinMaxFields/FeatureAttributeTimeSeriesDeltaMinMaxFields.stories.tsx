import type { Meta, StoryObj } from "@storybook/react";
import { getFormProviderDecorator } from "../../../../storybook";
import { getFeaturesAttributesContextDecorator } from "../../FeaturesAttributesContext/FeaturesAttributesContext.stories.decorators";
import { FeatureAttributeTimeSeriesDeltaMinMaxFields } from "./FeatureAttributeTimeSeriesDeltaMinMaxFields";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FeatureAttributeTimeSeriesDeltaMinMaxFields> = {
  component: FeatureAttributeTimeSeriesDeltaMinMaxFields,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  decorators: [
    getFormProviderDecorator(),
    getFeaturesAttributesContextDecorator(),
  ],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  args: {
    timeSeriesType: "delta",
  },
};

export default meta;
type Story = StoryObj<typeof FeatureAttributeTimeSeriesDeltaMinMaxFields>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {},
};

export const DefaultValues: Story = {
  decorators: [
    getFormProviderDecorator({
      defaultValues: {
        "time_series.delta_min": [1, 2, 3, 4, 5],
        "time_series.delta_max": [10, 20, 30, 40],
      },
    }),
  ],
  args: {},
};
