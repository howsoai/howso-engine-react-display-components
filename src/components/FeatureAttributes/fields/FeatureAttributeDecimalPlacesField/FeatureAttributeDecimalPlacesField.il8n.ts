import {
  getStringsForIl8nBundleFromResource,
  type Il8nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeDecimalPlacesField";

const en = {
  help: "Round to the specified decimal places. An empty value will result in no rounding. If Significant Digits is also specified, the number will be rounded to the specified number of significant digits first, then rounded to the number of decimal points as specified by this parameter.",
  label: "Decimal Places",
};

type Resource = typeof en;

export const FeatureAttributeDecimalPlacesFieldIl8nBundle: Il8nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForIl8nBundleFromResource<Resource>(en),
};
