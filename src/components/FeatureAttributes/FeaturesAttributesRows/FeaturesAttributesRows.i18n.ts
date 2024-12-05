import {
  getStringsForI18nBundleFromResource,
  type I18nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "../../../constants";

const namespace = "FeaturesAttributesRows";

const en = {
  actions: {
    configure: "Configure",
    "configure_{{name}}": "Configure {{name}}",
    mapDependents: "Map dependents",
    update: "Update",
    "updateAndGoTo_{{target}}": "Update & go to: {{target}}",
  },
  form: {
    label: "Configure feature",
  },
  headings: {
    configuration: "Configuration",
    feature: "Feature",
    sample: "Sample",
    timeFeature: "Time feature",
    timeSeries: "Time series",
    type: "Type",
  },
};

type Resource = typeof en;

export const FeaturesAttributesRowsI18nBundle: I18nBundle<Languages, Resource> =
  {
    namespace,
    resources: { en },
    strings: getStringsForI18nBundleFromResource<Resource>(en),
  };
