import {
  getStringsForIl8nBundleFromResource,
  type Il8nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

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
    unselected: "Please select a feature to configure its attributes",
  },
};

type Resource = typeof en;

export const FeaturesAttributesCompactIl8nBundle: Il8nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForIl8nBundleFromResource<Resource>(en),
};
