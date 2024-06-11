import type { Meta, StoryObj } from "@storybook/react";
import { FeaturesAttributesForms } from "./FeaturesAttributesForms";
import { FeatureAttributes } from "@howso/openapi-client";
import {
  type FeatureAttributesIndex,
  getFeatureAttributesAreDirtyAtom,
  getFeatureAttributesActiveFeatureAtom,
  getFeatureAttributesIndexAtom,
  getFeatureAttributesOptionsAtom,
  getFeatureAttributesSetAttributesAtom,
  getFeatureAttributesTimeFeatureAtom,
} from "../hooks";

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

const sampleFeatureAttributesIndex: FeatureAttributesIndex = {
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
const defaultAreDirtyAtom = getFeatureAttributesAreDirtyAtom();
export const Default: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    activeFeatureAtom: getFeatureAttributesActiveFeatureAtom(),
    featureAttributesIndexAtom: getFeatureAttributesIndexAtom(
      sampleFeatureAttributesIndex,
    ),
    optionsAtom: getFeatureAttributesOptionsAtom({}),
  },
};
Default.args!.setFeatureAttributesAtom = getFeatureAttributesSetAttributesAtom({
  featureAttributesIndexAtom: Default.args!.featureAttributesIndexAtom!,
  featuresDirtyAtom: defaultAreDirtyAtom,
});
Default.args!.timeFeatureAtom = getFeatureAttributesTimeFeatureAtom({
  featureAttributesIndexAtom: Default.args!.featureAttributesIndexAtom!,
  featuresDirtyAtom: defaultAreDirtyAtom,
});

const noFeaturesAreDirtyAtom = getFeatureAttributesAreDirtyAtom();
export const NoFeatures: Story = {
  args: {
    activeFeatureAtom: getFeatureAttributesActiveFeatureAtom(),
    featureAttributesIndexAtom: getFeatureAttributesIndexAtom({}),
    optionsAtom: getFeatureAttributesOptionsAtom({}),
  },
};
NoFeatures.args!.setFeatureAttributesAtom =
  getFeatureAttributesSetAttributesAtom({
    featureAttributesIndexAtom: NoFeatures.args!.featureAttributesIndexAtom!,
    featuresDirtyAtom: noFeaturesAreDirtyAtom,
  });
NoFeatures.args!.timeFeatureAtom = getFeatureAttributesTimeFeatureAtom({
  featureAttributesIndexAtom: NoFeatures.args!.featureAttributesIndexAtom!,
  featuresDirtyAtom: noFeaturesAreDirtyAtom,
});

const configurationAreDirtyAtom = getFeatureAttributesAreDirtyAtom();
export const Configuration: Story = {
  args: {
    activeFeatureAtom: getFeatureAttributesActiveFeatureAtom(
      Object.keys(sampleFeatureAttributesIndex).shift(),
    ),
    featureAttributesIndexAtom: getFeatureAttributesIndexAtom(
      sampleFeatureAttributesIndex,
    ),
    optionsAtom: getFeatureAttributesOptionsAtom({}),
  },
};
Configuration.args!.setFeatureAttributesAtom =
  getFeatureAttributesSetAttributesAtom({
    featureAttributesIndexAtom: Configuration.args!.featureAttributesIndexAtom!,
    featuresDirtyAtom: configurationAreDirtyAtom,
  });
Configuration.args!.timeFeatureAtom = getFeatureAttributesTimeFeatureAtom({
  featureAttributesIndexAtom: Configuration.args!.featureAttributesIndexAtom!,
  featuresDirtyAtom: configurationAreDirtyAtom,
});

const configurationLastItemAreDirtyAtom = getFeatureAttributesAreDirtyAtom();
export const ConfigurationLastItem: Story = {
  args: {
    activeFeatureAtom: getFeatureAttributesActiveFeatureAtom(
      Object.keys(sampleFeatureAttributesIndex).pop(),
    ),
    featureAttributesIndexAtom: getFeatureAttributesIndexAtom(
      sampleFeatureAttributesIndex,
    ),
    optionsAtom: getFeatureAttributesOptionsAtom({}),
  },
};
ConfigurationLastItem.args!.setFeatureAttributesAtom =
  getFeatureAttributesSetAttributesAtom({
    featureAttributesIndexAtom:
      ConfigurationLastItem.args!.featureAttributesIndexAtom!,
    featuresDirtyAtom: configurationLastItemAreDirtyAtom,
  });
ConfigurationLastItem.args!.timeFeatureAtom =
  getFeatureAttributesTimeFeatureAtom({
    featureAttributesIndexAtom:
      ConfigurationLastItem.args!.featureAttributesIndexAtom!,
    featuresDirtyAtom: configurationLastItemAreDirtyAtom,
  });

const timeSeriesAreDirtyAtom = getFeatureAttributesAreDirtyAtom();
export const TimeSeries: Story = {
  args: {
    activeFeatureAtom: getFeatureAttributesActiveFeatureAtom(),
    featureAttributesIndexAtom: getFeatureAttributesIndexAtom({
      timeFeature,
      ...sampleFeatureAttributesIndex,
    }),
    optionsAtom: getFeatureAttributesOptionsAtom({ time_series: true }),
  },
};
TimeSeries.args!.setFeatureAttributesAtom =
  getFeatureAttributesSetAttributesAtom({
    featureAttributesIndexAtom: TimeSeries.args!.featureAttributesIndexAtom!,
    featuresDirtyAtom: timeSeriesAreDirtyAtom,
  });
TimeSeries.args!.timeFeatureAtom = getFeatureAttributesTimeFeatureAtom({
  featureAttributesIndexAtom: TimeSeries.args!.featureAttributesIndexAtom!,
  featuresDirtyAtom: timeSeriesAreDirtyAtom,
});
