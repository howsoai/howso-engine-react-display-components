import type { Meta, StoryObj } from "@storybook/react";
import { FeaturesAttributesRows } from "./FeaturesAttributesRows";
import { FeatureAttributes } from "@howso/openapi-client";
import {
  getFeatureAttributesAreDirtyAtom,
  getFeatureAttributesActiveFeatureAtom,
  getInferFeatureAttributesParamsAtom,
  getFeatureAttributesOptionsAtom,
  getInferFeatureAttributesParamsSetFeatureAttributesAtom,
  getInferFeatureAttributesParamsTimeFeatureAtom,
} from "../hooks";
import { withPadding } from "@/storybook";
import type { FeatureAttributesIndex } from "../types/api";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FeaturesAttributesRows> = {
  component: FeaturesAttributesRows,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  // tags: ["autodocs"],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  decorators: [withPadding],
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
type Story = StoryObj<typeof FeaturesAttributesRows>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const defaultAreDirtyAtom = getFeatureAttributesAreDirtyAtom();
export const Default: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    activeFeatureAtom: getFeatureAttributesActiveFeatureAtom(),
    inferFeatureAttributesParamsAtom: getInferFeatureAttributesParamsAtom({
      features: sampleFeatureAttributesIndex,
    }),
    optionsAtom: getFeatureAttributesOptionsAtom({}),
  },
};
Default.args!.setFeatureAttributesAtom =
  getInferFeatureAttributesParamsSetFeatureAttributesAtom({
    inferFeatureAttributesParamsAtom:
      Default.args!.inferFeatureAttributesParamsAtom!,
    featuresDirtyAtom: defaultAreDirtyAtom,
  });
Default.args!.timeFeatureAtom = getInferFeatureAttributesParamsTimeFeatureAtom({
  inferFeatureAttributesParamsAtom:
    Default.args!.inferFeatureAttributesParamsAtom!,
  featuresDirtyAtom: defaultAreDirtyAtom,
});

const noFeaturesAreDirtyAtom = getFeatureAttributesAreDirtyAtom();
export const NoFeatures: Story = {
  args: {
    activeFeatureAtom: getFeatureAttributesActiveFeatureAtom(),
    inferFeatureAttributesParamsAtom: getInferFeatureAttributesParamsAtom({}),
    optionsAtom: getFeatureAttributesOptionsAtom({}),
  },
};
NoFeatures.args!.setFeatureAttributesAtom =
  getInferFeatureAttributesParamsSetFeatureAttributesAtom({
    inferFeatureAttributesParamsAtom:
      NoFeatures.args!.inferFeatureAttributesParamsAtom!,
    featuresDirtyAtom: noFeaturesAreDirtyAtom,
  });
NoFeatures.args!.timeFeatureAtom =
  getInferFeatureAttributesParamsTimeFeatureAtom({
    inferFeatureAttributesParamsAtom:
      NoFeatures.args!.inferFeatureAttributesParamsAtom!,
    featuresDirtyAtom: noFeaturesAreDirtyAtom,
  });

const configurationAreDirtyAtom = getFeatureAttributesAreDirtyAtom();
export const Configuration: Story = {
  args: {
    activeFeatureAtom: getFeatureAttributesActiveFeatureAtom(
      Object.keys(sampleFeatureAttributesIndex).shift(),
    ),
    inferFeatureAttributesParamsAtom: getInferFeatureAttributesParamsAtom({
      features: sampleFeatureAttributesIndex,
    }),
    optionsAtom: getFeatureAttributesOptionsAtom({}),
  },
};
Configuration.args!.setFeatureAttributesAtom =
  getInferFeatureAttributesParamsSetFeatureAttributesAtom({
    inferFeatureAttributesParamsAtom:
      Configuration.args!.inferFeatureAttributesParamsAtom!,
    featuresDirtyAtom: configurationAreDirtyAtom,
  });
Configuration.args!.timeFeatureAtom =
  getInferFeatureAttributesParamsTimeFeatureAtom({
    inferFeatureAttributesParamsAtom:
      Configuration.args!.inferFeatureAttributesParamsAtom!,
    featuresDirtyAtom: configurationAreDirtyAtom,
  });

const configurationLastItemAreDirtyAtom = getFeatureAttributesAreDirtyAtom();
export const ConfigurationLastItem: Story = {
  args: {
    activeFeatureAtom: getFeatureAttributesActiveFeatureAtom(
      Object.keys(sampleFeatureAttributesIndex).pop(),
    ),
    inferFeatureAttributesParamsAtom: getInferFeatureAttributesParamsAtom({
      features: sampleFeatureAttributesIndex,
    }),
    optionsAtom: getFeatureAttributesOptionsAtom({}),
  },
};
ConfigurationLastItem.args!.setFeatureAttributesAtom =
  getInferFeatureAttributesParamsSetFeatureAttributesAtom({
    inferFeatureAttributesParamsAtom:
      ConfigurationLastItem.args!.inferFeatureAttributesParamsAtom!,
    featuresDirtyAtom: configurationLastItemAreDirtyAtom,
  });
ConfigurationLastItem.args!.timeFeatureAtom =
  getInferFeatureAttributesParamsTimeFeatureAtom({
    inferFeatureAttributesParamsAtom:
      ConfigurationLastItem.args!.inferFeatureAttributesParamsAtom!,
    featuresDirtyAtom: configurationLastItemAreDirtyAtom,
  });

const timeSeriesAreDirtyAtom = getFeatureAttributesAreDirtyAtom();
export const TimeSeries: Story = {
  args: {
    activeFeatureAtom: getFeatureAttributesActiveFeatureAtom(),
    inferFeatureAttributesParamsAtom: getInferFeatureAttributesParamsAtom({
      features: { timeFeature, ...sampleFeatureAttributesIndex },
    }),
    optionsAtom: getFeatureAttributesOptionsAtom({ time_series: true }),
  },
};
TimeSeries.args!.setFeatureAttributesAtom =
  getInferFeatureAttributesParamsSetFeatureAttributesAtom({
    inferFeatureAttributesParamsAtom:
      TimeSeries.args!.inferFeatureAttributesParamsAtom!,
    featuresDirtyAtom: timeSeriesAreDirtyAtom,
  });
TimeSeries.args!.timeFeatureAtom =
  getInferFeatureAttributesParamsTimeFeatureAtom({
    inferFeatureAttributesParamsAtom:
      TimeSeries.args!.inferFeatureAttributesParamsAtom!,
    featuresDirtyAtom: timeSeriesAreDirtyAtom,
  });
