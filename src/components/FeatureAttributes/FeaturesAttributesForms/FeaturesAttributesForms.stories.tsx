import type { Meta, StoryObj } from "@storybook/react";
import { FeaturesAttributesForms } from "./FeaturesAttributesForms";
import { FeatureAttributes } from "@howso/openapi-client";
import {
  FeatureAttributesIndex,
  getFeaturesDirtyAtom,
  getActiveFeatureAtom,
  getFeaturesAttributesIndexAtom,
  getFeaturesOptionsAtom,
  getSetFeatureAttributesAtom,
  getTimeFeatureAtom,
} from "../utils";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FeaturesAttributesForms> = {
  component: FeaturesAttributesForms,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  // tags: ["autodocs"],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  args: {},
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
const timeFeature: FeatureAttributes = {
  type: "continuous",
  data_type: "string",
  date_time_format: "",
  sample: "2024-01-02T14:23:343.002",
  time_series: {
    time_feature: true,
    type: "rate",
  },
};

export default meta;
type Story = StoryObj<typeof FeaturesAttributesForms>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const defaultDirtyAtom = getFeaturesDirtyAtom();
export const Default: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    activeFeatureAtom: getActiveFeatureAtom(),
    featureAttributesIndexAtom: getFeaturesAttributesIndexAtom(
      sampleFeaturesAttributes,
    ),
    optionsAtom: getFeaturesOptionsAtom({}),
  },
};
Default.args!.setFeatureAttributesAtom = getSetFeatureAttributesAtom({
  featureAttributesIndexAtom: Default.args!.featureAttributesIndexAtom!,
  featuresDirtyAtom: defaultDirtyAtom,
});
Default.args!.timeFeatureAtom = getTimeFeatureAtom({
  featureAttributesIndexAtom: Default.args!.featureAttributesIndexAtom!,
  featuresDirtyAtom: defaultDirtyAtom,
});

const noFeaturesDirtyAtom = getFeaturesDirtyAtom();
export const NoFeatures: Story = {
  args: {
    activeFeatureAtom: getActiveFeatureAtom(),
    featureAttributesIndexAtom: getFeaturesAttributesIndexAtom({}),
    optionsAtom: getFeaturesOptionsAtom({}),
  },
};
NoFeatures.args!.setFeatureAttributesAtom = getSetFeatureAttributesAtom({
  featureAttributesIndexAtom: NoFeatures.args!.featureAttributesIndexAtom!,
  featuresDirtyAtom: noFeaturesDirtyAtom,
});
NoFeatures.args!.timeFeatureAtom = getTimeFeatureAtom({
  featureAttributesIndexAtom: NoFeatures.args!.featureAttributesIndexAtom!,
  featuresDirtyAtom: noFeaturesDirtyAtom,
});

const configurationDirtyAtom = getFeaturesDirtyAtom();
export const Configuration: Story = {
  args: {
    activeFeatureAtom: getActiveFeatureAtom(
      Object.keys(sampleFeaturesAttributes).shift(),
    ),
    featureAttributesIndexAtom: getFeaturesAttributesIndexAtom(
      sampleFeaturesAttributes,
    ),
    optionsAtom: getFeaturesOptionsAtom({}),
  },
};
Configuration.args!.setFeatureAttributesAtom = getSetFeatureAttributesAtom({
  featureAttributesIndexAtom: Configuration.args!.featureAttributesIndexAtom!,
  featuresDirtyAtom: configurationDirtyAtom,
});
Configuration.args!.timeFeatureAtom = getTimeFeatureAtom({
  featureAttributesIndexAtom: Configuration.args!.featureAttributesIndexAtom!,
  featuresDirtyAtom: configurationDirtyAtom,
});

const configurationLastItemDirtyAtom = getFeaturesDirtyAtom();
export const ConfigurationLastItem: Story = {
  args: {
    activeFeatureAtom: getActiveFeatureAtom(
      Object.keys(sampleFeaturesAttributes).pop(),
    ),
    featureAttributesIndexAtom: getFeaturesAttributesIndexAtom(
      sampleFeaturesAttributes,
    ),
    optionsAtom: getFeaturesOptionsAtom({}),
  },
};
ConfigurationLastItem.args!.setFeatureAttributesAtom =
  getSetFeatureAttributesAtom({
    featureAttributesIndexAtom:
      ConfigurationLastItem.args!.featureAttributesIndexAtom!,
    featuresDirtyAtom: configurationLastItemDirtyAtom,
  });
ConfigurationLastItem.args!.timeFeatureAtom = getTimeFeatureAtom({
  featureAttributesIndexAtom:
    ConfigurationLastItem.args!.featureAttributesIndexAtom!,
  featuresDirtyAtom: configurationLastItemDirtyAtom,
});

const timeSeriesDirtyAtom = getFeaturesDirtyAtom();
export const TimeSeries: Story = {
  args: {
    activeFeatureAtom: getActiveFeatureAtom(),
    featureAttributesIndexAtom: getFeaturesAttributesIndexAtom({
      timeFeature,
      ...sampleFeaturesAttributes,
    }),
    optionsAtom: getFeaturesOptionsAtom({ time_series: true }),
  },
};
TimeSeries.args!.setFeatureAttributesAtom = getSetFeatureAttributesAtom({
  featureAttributesIndexAtom: TimeSeries.args!.featureAttributesIndexAtom!,
  featuresDirtyAtom: timeSeriesDirtyAtom,
});
TimeSeries.args!.timeFeatureAtom = getTimeFeatureAtom({
  featureAttributesIndexAtom: TimeSeries.args!.featureAttributesIndexAtom!,
  featuresDirtyAtom: timeSeriesDirtyAtom,
});
