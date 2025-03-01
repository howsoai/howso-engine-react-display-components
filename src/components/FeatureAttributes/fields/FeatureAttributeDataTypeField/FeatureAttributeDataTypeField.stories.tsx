import type { Meta, StoryObj } from "@storybook/react";
import { getFormProviderDecorator } from "../../../../storybook";
import { getFeaturesAttributesContextDecorator } from "../../FeaturesAttributesContext/FeaturesAttributesContext.stories.decorators";
import { InferFeatureAttributeFormValues } from "../../utils";
import { FeatureAttributeDataTypeField } from "./FeatureAttributeDataTypeField";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FeatureAttributeDataTypeField> = {
  component: FeatureAttributeDataTypeField,
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
  args: {},
};

export default meta;
type Story = StoryObj<typeof FeatureAttributeDataTypeField>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {},
};

export const FormattedDateTime: Story = {
  decorators: [
    getFormProviderDecorator<InferFeatureAttributeFormValues>({
      defaultValues: { data_type: "formatted_date_time" },
    }),
  ],
  args: {},
};

export const FormattedTime: Story = {
  decorators: [
    getFormProviderDecorator<InferFeatureAttributeFormValues>({
      defaultValues: { data_type: "formatted_time" },
    }),
  ],
  args: {},
};
