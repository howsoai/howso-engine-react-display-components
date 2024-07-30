import {
  getStringsForI18nBundleFromResource,
  type I18nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeTimeSeriesDerivedOrdersField";

const en = {
  help: "The number of orders of derivatives that should be derived instead of synthesized. Ignored if Order is not provided.",
  label: "Derived Orders",
};

type Resource = typeof en;

export const FeatureAttributeTimeSeriesDerivedOrdersFieldI18nBundle: I18nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForI18nBundleFromResource<Resource>(en),
};
