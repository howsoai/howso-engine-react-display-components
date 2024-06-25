import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { FeaturesAttributesDependencies } from "./FeaturesAttributesDependencies";
import { getInferFeatureAttributesParamsAtom } from "../hooks";
import { getFeaturesAttributesContextDecorator } from "../FeaturesAttributesContext/FeaturesAttributesContext.stories.decorators";
import type { FeatureAttributesIndex } from "../types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FeaturesAttributesDependencies> = {
  component: FeaturesAttributesDependencies,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  // tags: ["autodocs"],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  decorators: [getFeaturesAttributesContextDecorator()],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  args: {
    onUpdate: fn(),
  },
};

const sampleFeaturesAttributes: FeatureAttributesIndex = {
  age: {
    type: "continuous",
    data_type: "number",
    decimal_places: 0,
    sample: "23.3",
    bounds: {
      min: 20,
      max: 148,
      allow_null: false,
    },
  },
  sex: {
    type: "nominal",
    data_type: "number",
    decimal_places: 0,
    sample: "1",
    bounds: {
      allow_null: false,
    },
  },
  country: {
    type: "nominal",
    data_type: "string",
    sample: "The United Kingdom of Great Britain and Northern Ireland",
    bounds: {
      allow_null: true,
    },
  },
  measurements: {
    type: "nominal",
    data_type: "json",
    sample: `{
      height: "6\\"2'",
      weight: "174 lbs"
    }`,
    bounds: {
      allow_null: true,
    },
  },
  organDonor: {
    type: "nominal",
    data_type: "boolean",
    sample: "true",
    bounds: {
      allow_null: true,
    },
  },
  lastExam: {
    type: "nominal",
    data_type: "formatted_date_time",
    date_time_format: "YYYY-MM-DD",
    sample: null,
    bounds: {
      allow_null: true,
    },
  },
  cp: {
    type: "nominal",
    data_type: "number",
    decimal_places: 0,
    sample: "2",
    bounds: {
      allow_null: false,
    },
  },
  trestbps: {
    type: "continuous",
    // data_type: "number", Leaving this out of purpose to get the invalid configuration state
    decimal_places: 0,
    sample: "321.54",
    bounds: {
      min: 55,
      max: 403,
      allow_null: false,
    },
  },

  ca: {
    type: "continuous",
    data_type: "number",
    decimal_places: 0,
    sample: "5.3",
    bounds: {
      min: 0,
      max: 7,
    },
  },
  thal: {
    type: "continuous",
    data_type: "number",
    decimal_places: 0,
    sample: "4.53",
    bounds: {
      min: 3,
      max: 7,
    },
  },
  class: {
    type: "nominal",
    data_type: "number",
    decimal_places: 0,
    sample: "1",
    bounds: {
      allow_null: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof FeaturesAttributesDependencies>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    inferFeatureAttributesParamsAtom: getInferFeatureAttributesParamsAtom(
      sampleFeaturesAttributes,
    ),
  },
};

export const NoFeatures: Story = {
  args: {
    inferFeatureAttributesParamsAtom: getInferFeatureAttributesParamsAtom({}),
  },
};
