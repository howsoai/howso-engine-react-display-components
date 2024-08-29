import {
  getStringsForI18nBundleFromResource,
  type I18nBundle,
} from "@howso/ui-internationalization-utils";
import { Languages } from "../../../../constants";

const namespace = "FeatureAttributeTimeSeriesOrderField";

const en = {
  help: "If provided, will generate the specified number of derivatives and boundary values.",
  label: "Order",
};

type Resource = typeof en;

export const FeatureAttributeTimeSeriesOrderFieldI18nBundle: I18nBundle<
  Languages,
  Resource
> = {
  namespace,
  resources: { en },
  strings: getStringsForI18nBundleFromResource<Resource>(en),
};
