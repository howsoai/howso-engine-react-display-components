import {
  getStringsForI18nBundleFromResource,
  type I18nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeDateTimeFormatField";

const en = {
  help: "Any valid <1>standard format specification</1> format.",
  label: "Date Time Format",
};

type Resource = typeof en;

export const FeatureAttributeDateTimeFormatFieldI18nBundle: I18nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForI18nBundleFromResource<Resource>(en),
};
