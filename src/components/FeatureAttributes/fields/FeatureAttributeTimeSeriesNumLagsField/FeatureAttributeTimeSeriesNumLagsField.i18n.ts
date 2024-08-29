import {
  getStringsForI18nBundleFromResource,
  type I18nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "../../../../constants";

const namespace = "FeatureAttributeTimeSeriesNumLagsField";

const en = {
  help: "If provided, will generate the specified number of derivatives and boundary values.",
  label: "Number of Lags",
};

type Resource = typeof en;

export const FeatureAttributeTimeSeriesNumLagsFieldI18nBundle: I18nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForI18nBundleFromResource<Resource>(en),
};
