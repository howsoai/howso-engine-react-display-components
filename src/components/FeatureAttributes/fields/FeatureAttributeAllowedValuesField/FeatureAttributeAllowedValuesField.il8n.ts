import {
  getStringsForIl8nBundleFromResource,
  type Il8nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeAllowedValuesField";

const en = {
  help: {
    nominal: "Use a new line for each value.",
    ordinal: "Use a new line for each value. Order matters.",
  },
  label: {
    nominal: "Allowed Values in Order",
    ordinal: "Allowed Values",
  },
};

type Resource = typeof en;

export const FeatureAttributeAllowedValuesFieldIl8nBundle: Il8nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForIl8nBundleFromResource<Resource>(en),
};
