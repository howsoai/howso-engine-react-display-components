import {
  getStringsForI18nBundleFromResource,
  type I18nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "../../../../constants";

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

export const FeatureAttributeReservedBoundingModeFieldI18nBundle: I18nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForI18nBundleFromResource<Resource>(en),
};
