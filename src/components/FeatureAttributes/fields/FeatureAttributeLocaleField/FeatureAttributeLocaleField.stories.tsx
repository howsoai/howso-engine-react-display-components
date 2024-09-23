import type { Meta, StoryObj } from "@storybook/react";
import { getFormProviderDecorator } from "../../../../storybook";
import { getFeaturesAttributesContextDecorator } from "../../FeaturesAttributesContext/FeaturesAttributesContext.stories.decorators";
import { FeatureAttributeLocaleField } from "./FeatureAttributeLocaleField";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FeatureAttributeLocaleField> = {
  component: FeatureAttributeLocaleField,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ["autodocs"],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  decorators: [
    getFormProviderDecorator(),
    getFeaturesAttributesContextDecorator({ purposes: ["core"] }),
  ],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof FeatureAttributeLocaleField>;

export const FormattedDateTime: Story = {
  args: {
    dataType: "formatted_date_time",
  },
};
