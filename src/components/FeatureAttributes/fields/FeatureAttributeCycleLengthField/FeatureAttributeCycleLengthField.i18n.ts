import {
  getStringsForI18nBundleFromResource,
  type I18nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "../../../../constants";

const namespace = "FeatureAttributeCycleLengthField";

const en = {
  help: "Only required if your feature is cyclical, such as days of the week.",
  label: "Cycle Length",
};

type Resource = typeof en;

export const FeatureAttributeCycleLengthFieldI18nBundle: I18nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForI18nBundleFromResource<Resource>(en),
};
