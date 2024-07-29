import {
  getStringsForIl8nBundleFromResource,
  type Il8nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeObservationalErrorField";

const en = {
  help: {
    default: "Specify the mean absolute error for this feature. Defaults to 0.",
    nominal:
      "Specify known probability (0-1) of misclassification. Defaults to 0.",
    ordinal:
      "Specify known probability of misclassification through one or more adjacent values. Defaults to 0.",
    string:
      "Specify known probability (0-1) of misclassification. Defaults to 0.",
  },
  label: "Observational Error",
};

type Resource = typeof en;

export const FeatureAttributeObservationalErrorFieldIl8nBundle: Il8nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForIl8nBundleFromResource<Resource>(en),
};
