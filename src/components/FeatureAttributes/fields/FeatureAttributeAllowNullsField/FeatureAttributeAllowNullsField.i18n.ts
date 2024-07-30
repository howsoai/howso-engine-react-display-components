import {
  getStringsForI18nBundleFromResource,
  type I18nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeAllowNullsField";

const en = {
  label: "Allow Nulls",
};

type Resource = typeof en;

export const FeatureAttributeAllowNullsFieldI18nBundle: I18nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForI18nBundleFromResource<Resource>(en),
};
