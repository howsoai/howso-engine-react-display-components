import {
  getStringsForI18nBundleFromResource,
  type I18nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeLocaleField";

const en = {
  help: "The <1>ISO-639 Language Code</1> with optional <3>ISO-3166 Country Code</3>. Locales are used during synthesis. Defaults for the data set will be used if not explicitly defined for this feature. Additional locale options may be specified during synthesis configuration.",
  label: "Locale",
};

type Resource = typeof en;

export const FeatureAttributeLocaleFieldI18nBundle: I18nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForI18nBundleFromResource<Resource>(en),
};
