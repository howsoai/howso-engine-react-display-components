import {
  getStringsForI18nBundleFromResource,
  type I18nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeTimeSeriesLagsField";

const en = {
  help: "If specified, generates lag features containing previous values using the enumerated lag offsets. Takes precedence over Number of Lags. If neither Number of Lags nor Lags is specified for a feature, then a single lag feature is generated.",
  label: "Lags",
};

type Resource = typeof en;

export const FeatureAttributeTimeSeriesLagsFieldI18nBundle: I18nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForI18nBundleFromResource<Resource>(en),
};
