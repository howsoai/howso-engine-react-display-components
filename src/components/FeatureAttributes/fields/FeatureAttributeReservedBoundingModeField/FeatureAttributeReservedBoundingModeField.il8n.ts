import {
  getStringsForIl8nBundleFromResource,
  type Il8nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeReservedBoundingModeField";

const en = {
  help: {
    auto: "Extend the bounds of the feature for synthesis. Best for Privacy.",
    tightBounds:
      "Use the exact min and max found in the data. Best for Utility.",
    userDefined: "Specify min and max manually (not recommended).",
  },
  label: "Bounding mode",
  options: {
    auto: "Auto",
    tightBounds: "Tight bounds",
    userDefined: "User defined",
  },
};

type Resource = typeof en;

export const FeatureAttributeReservedBoundingModeFieldIl8nBundle: Il8nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForIl8nBundleFromResource<Resource>(en),
};
