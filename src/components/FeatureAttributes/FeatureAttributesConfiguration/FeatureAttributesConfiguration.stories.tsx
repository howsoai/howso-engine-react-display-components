import type { Meta, StoryObj } from "@storybook/react";
import { getFormProviderDecorator, withPadding } from "../../../storybook";
import { getFeaturesAttributesContextDecorator } from "../FeaturesAttributesContext/FeaturesAttributesContext.stories.decorators";
import { InferFeatureAttributeFormValues } from "../utils";
import { FeatureAttributesConfiguration } from "./FeatureAttributesConfiguration";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FeatureAttributesConfiguration> = {
  component: FeatureAttributesConfiguration,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  // tags: ["autodocs"],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  decorators: [
    getFormProviderDecorator<InferFeatureAttributeFormValues>(),
    getFeaturesAttributesContextDecorator({ purposes: ["core", "synthesis"] }),
    withPadding,
  ],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  args: {
    featuresHaveTimeFeature: false,
  },
};

export default meta;
type Story = StoryObj<typeof FeatureAttributesConfiguration>;

export const Default: Story = {
  decorators: [
    getFormProviderDecorator<InferFeatureAttributeFormValues>({
      defaultValues: {},
    }),
  ],
  args: {},
};

export const ContinuousNumber: Story = {
  decorators: [
    getFormProviderDecorator<InferFeatureAttributeFormValues>({
      defaultValues: {
        type: "continuous",
        data_type: "number",
        decimal_places: 0,
      },
    }),
  ],
  args: {},
};

export const ContinuousString: Story = {
  decorators: [
    getFormProviderDecorator<InferFeatureAttributeFormValues>({
      defaultValues: {
        type: "continuous",
        data_type: "string",
      },
    }),
  ],
  args: {},
};

export const ContinuousFormattedDateTime: Story = {
  decorators: [
    getFormProviderDecorator<InferFeatureAttributeFormValues>({
      defaultValues: {
        type: "continuous",
        data_type: "formatted_date_time",
        date_time_format: "DD/MM/YYYY",
      },
    }),
  ],
  args: {
    featuresHaveTimeFeature: true,
  },
};

export const ContinuousFormattedTime: Story = {
  decorators: [
    getFormProviderDecorator<InferFeatureAttributeFormValues>({
      defaultValues: {
        type: "continuous",
        data_type: "formatted_time",
        date_time_format: "hh/mm/ss",
      },
    }),
  ],
  args: {
    featuresHaveTimeFeature: true,
  },
};

export const ContinuousComplex: Story = {
  decorators: [
    getFormProviderDecorator<InferFeatureAttributeFormValues>({
      defaultValues: {
        type: "continuous",
        data_type: "json",
      },
    }),
  ],
  args: {},
};

export const NominalNumber: Story = {
  decorators: [
    getFormProviderDecorator<InferFeatureAttributeFormValues>({
      defaultValues: {
        type: "nominal",
        data_type: "number",
      },
    }),
  ],
  args: {},
};

export const NominalString: Story = {
  decorators: [
    getFormProviderDecorator<InferFeatureAttributeFormValues>({
      defaultValues: {
        type: "nominal",
        data_type: "string",
        bounds: {
          allow_null: true,
        },
      },
    }),
  ],
  args: {},
};

export const NominalFormattedDateTime: Story = {
  decorators: [
    getFormProviderDecorator<InferFeatureAttributeFormValues>({
      defaultValues: {
        type: "nominal",
        data_type: "formatted_date_time",
        date_time_format: "DD/MM/YYYY",
        bounds: {
          allow_null: true,
        },
      },
    }),
  ],
  args: {
    featuresHaveTimeFeature: true,
  },
};

export const NominalComplex: Story = {
  decorators: [
    getFormProviderDecorator<InferFeatureAttributeFormValues>({
      defaultValues: {
        type: "nominal",
        data_type: "json",
      },
    }),
  ],
  args: {},
};

export const OrdinalNumber: Story = {
  decorators: [
    getFormProviderDecorator<InferFeatureAttributeFormValues>({
      defaultValues: {
        type: "ordinal",
        data_type: "number",
        bounds: {
          allow_null: false,
        },
      },
    }),
  ],
  args: {},
};

export const OrdinalString: Story = {
  decorators: [
    getFormProviderDecorator<InferFeatureAttributeFormValues>({
      defaultValues: {
        type: "ordinal",
        data_type: "string",
        bounds: {
          allow_null: false,
        },
      },
    }),
  ],
  args: {},
};

export const OrdinalFormattedDateTime: Story = {
  decorators: [
    getFormProviderDecorator<InferFeatureAttributeFormValues>({
      defaultValues: {
        type: "ordinal",
        data_type: "formatted_date_time",
        date_time_format: "DD/MM/YYYY",
        bounds: {
          allow_null: true,
        },
      },
    }),
  ],
  args: {
    featuresHaveTimeFeature: true,
  },
};
