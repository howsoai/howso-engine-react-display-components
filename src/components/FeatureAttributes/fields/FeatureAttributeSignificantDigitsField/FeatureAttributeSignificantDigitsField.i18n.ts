import {
  getStringsForI18nBundleFromResource,
  type I18nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "../../../../constants";

const namespace = "FeatureAttributeSignificantDigitsField";

const en = {
  help: "Round to the specified significant digits. An empty value will result in no rounding.",
  label: "Significant Digits",
};

type Resource = typeof en;

export const FeatureAttributeSignificantDigitsFieldI18nBundle: I18nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForI18nBundleFromResource<Resource>(en),
};
