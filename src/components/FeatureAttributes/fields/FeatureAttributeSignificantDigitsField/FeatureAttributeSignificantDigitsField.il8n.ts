import {
  getStringsForIl8nBundleFromResource,
  type Il8nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeSignificantDigitsField";

const en = {
  help: "Round to the specified significant digits. An empty value will result in no rounding.",
  label: "Significant Digits",
};

type Resource = typeof en;

export const FeatureAttributeSignificantDigitsFieldIl8nBundle: Il8nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForIl8nBundleFromResource<Resource>(en),
};
