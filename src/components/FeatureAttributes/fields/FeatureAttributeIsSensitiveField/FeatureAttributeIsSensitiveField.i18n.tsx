import {
  getStringsForI18nBundleFromResource,
  type I18nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeIsSensitiveField";

const en = {
  help: "By default, all data is treated as sensitive, you can change data to be non-sensitive, allowing the values to be re-used in the generation of synthetic data.",
  label: "Sensitive",
};

type Resource = typeof en;

export const FeatureAttributeIsSensitiveFieldI18nBundle: I18nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForI18nBundleFromResource<Resource>(en),
};
