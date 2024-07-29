import {
  getStringsForIl8nBundleFromResource,
  type Il8nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

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
  state: {
    empty: "No features were found in the dataset.",
  },
};

type Resource = typeof en;

export const FeaturesAttributesRowsIl8nBundle: Il8nBundle<Languages, Resource> =
  {
    namespace,
    resources: { en },
    strings: getStringsForIl8nBundleFromResource<Resource>(en),
  };
