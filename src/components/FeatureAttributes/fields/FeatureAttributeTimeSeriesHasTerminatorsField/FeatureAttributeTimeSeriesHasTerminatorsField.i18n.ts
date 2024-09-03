import {
  getStringsForI18nBundleFromResource,
  type I18nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "../../../../constants";

const namespace = "FeatureAttributeTimeSeriesHasTerminatorsField";

const en = {
  help: "Require the model identify and learn values that explicitly denote the end of a series.",
  label: "Series has Terminators",
};

type Resource = typeof en;

export const FeatureAttributeTimeSeriesHasTerminatorsFieldI18nBundle: I18nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForI18nBundleFromResource<Resource>(en),
};
