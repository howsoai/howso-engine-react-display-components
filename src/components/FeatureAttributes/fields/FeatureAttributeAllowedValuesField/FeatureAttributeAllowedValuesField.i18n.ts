import {
  getStringsForI18nBundleFromResource,
  type I18nBundle,
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

export const FeatureAttributeAllowedValuesFieldI18nBundle: I18nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForI18nBundleFromResource<Resource>(en),
};
