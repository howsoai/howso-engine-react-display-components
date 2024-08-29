import {
  getStringsForI18nBundleFromResource,
  type I18nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "../../../constants";

const namespace = "FeaturesAttributesCompact";

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
  header: {
    fields: {
      feature: {
        label: "Feature",
      },
      timeFeature: {
        label: "Time Feature",
      },
    },
  },
  labels: {
    density: {
      comfortable: "Comfortable",
      compact: "Compact",
    },
    sample: "Sample",
  },
  state: {
    empty: "No features were found in the dataset.",
    unselected: "Please select a feature to configure its attributes.",
  },
};

type Resource = typeof en;

export const FeaturesAttributesCompactI18nBundle: I18nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForI18nBundleFromResource<Resource>(en),
};
