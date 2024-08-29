import {
  getStringsForI18nBundleFromResource,
  type I18nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "../../../../constants";

const namespace = "FeatureAttributeTimeSeriesTypeField";

const en = {
  help: "When `rate` is specified, uses the difference of the current value from its previous value divided by the change in time since the previous value. When `delta` is specified, uses the difference of the current value from its previous value regardless of the elapsed time.",
  label: "Type",
  options: {
    delta: "Delta",
    rate: "Rate",
  },
};

type Resource = typeof en;

export const FeatureAttributeTimeSeriesTypeFieldI18nBundle: I18nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForI18nBundleFromResource<Resource>(en),
};
