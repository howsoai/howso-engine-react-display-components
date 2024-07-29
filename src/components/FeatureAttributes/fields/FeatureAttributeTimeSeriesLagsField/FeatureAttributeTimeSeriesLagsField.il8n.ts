import {
  getStringsForIl8nBundleFromResource,
  type Il8nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeTimeSeriesLagsField";

const en = {
  help: "If specified, generates lag features containing previous values using the enumerated lag offsets. Takes precedence over Number of Lags. If neither Number of Lags nor Lags is specified for a feature, then a single lag feature is generated.",
  label: "Lags",
};

type Resource = typeof en;

export const FeatureAttributeTimeSeriesLagsFieldIl8nBundle: Il8nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForIl8nBundleFromResource<Resource>(en),
};
