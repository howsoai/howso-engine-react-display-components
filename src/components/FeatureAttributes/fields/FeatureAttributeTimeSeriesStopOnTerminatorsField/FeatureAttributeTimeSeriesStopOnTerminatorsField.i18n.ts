import {
  getStringsForI18nBundleFromResource,
  type I18nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "@/constants";

const namespace = "FeatureAttributeTimeSeriesStopOnTerminatorsField";

const en = {
  help: "Require that a series ends on a terminator value.",
  label: "Stop on Terminator",
};

type Resource = typeof en;

export const FeatureAttributeTimeSeriesStopOnTerminatorsFieldI18nBundle: I18nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForI18nBundleFromResource<Resource>(en),
};
