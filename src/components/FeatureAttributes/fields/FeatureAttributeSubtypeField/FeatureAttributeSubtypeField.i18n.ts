import {
  getStringsForI18nBundleFromResource,
  type I18nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "../../../../constants";

const namespace = "FeatureAttributeSubtypeField";

const en = {
  help: "Your platform supports a default list of options. Refer to documentation for creation of a custom subtype.",
  label: "Subtype",
};

type Resource = typeof en;

export const FeatureAttributeSubtypeFieldI18nBundle: I18nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForI18nBundleFromResource<Resource>(en),
};
