import type { Meta, StoryObj } from "@storybook/react";
import { getFormProviderDecorator } from "../../../../storybook";
import { getFeaturesAttributesContextDecorator } from "../../FeaturesAttributesContext/FeaturesAttributesContext.stories.decorators";
import { FeatureAttributeMinMaxFields } from "./FeatureAttributeMinMaxFields";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FeatureAttributeMinMaxFields> = {
  component: FeatureAttributeMinMaxFields,
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
    boundingMode: "userDefined",
    type: "continuous",
  },
};

export default meta;
type Story = StoryObj<typeof FeatureAttributeMinMaxFields>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const ContinuousNumber: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    dataType: "number",
  },
};

/** Could be levenshtein distance, etc. Not implemented, so not offered.  */
// export const ContinuousString: Story = {
//   args: {
//     dataType: "string",
//   },
// };

export const ContinuousFormattedDateTime: Story = {
  args: {
    dataType: "formatted_date_time",
  },
};
