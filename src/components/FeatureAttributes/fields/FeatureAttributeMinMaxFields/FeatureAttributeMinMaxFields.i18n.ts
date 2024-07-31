import {
  getStringsForI18nBundleFromResource,
  type I18nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeMinMaxFields";

const en = {
  label: {
    max: "Max",
    min: "Min",
  },
};

type Resource = typeof en;

export const FeatureAttributeMinMaxFieldsI18nBundle: I18nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForI18nBundleFromResource<Resource>(en),
};
