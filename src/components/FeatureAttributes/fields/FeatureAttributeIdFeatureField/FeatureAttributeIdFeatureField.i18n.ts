import {
  getStringsForI18nBundleFromResource,
  type I18nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeIdFeatureField";

const en = {
  help: "Set to true for nominal features containing nominal IDs, specifying that this feature should be used to compute case weights for id based privacy. For time series, this feature will be used as the id for each time series generation.",
  label: "ID Feature",
};

type Resource = typeof en;

export const FeatureAttributeIdFeatureFieldI18nBundle: I18nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForI18nBundleFromResource<Resource>(en),
};
